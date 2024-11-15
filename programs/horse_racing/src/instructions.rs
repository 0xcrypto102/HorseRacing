use anchor_lang::prelude::*;

use crate::errors::*;
use crate::state::{GlobalState, Race,UserRaceInfo};
use crate::constants::{ GLOBAL_STATE_SEED, VAULT_SEED, USER_RACE_INFO_SEED, RACE_SEED };
use anchor_spl::token::{ Token, Mint,  TokenAccount, Burn, burn, Transfer, transfer };

use solana_program::{program::{invoke,invoke_signed}, system_instruction};

use orao_solana_vrf::program::OraoVrf;
use orao_solana_vrf::state::NetworkState;
use orao_solana_vrf::CONFIG_ACCOUNT_SEED;
use orao_solana_vrf::RANDOMNESS_ACCOUNT_SEED;
use orao_solana_vrf::state::Randomness;

use std::mem::size_of;
use orao_solana_vrf::cpi::accounts::{ Request };

pub fn initialize(ctx: Context<Initialize>, fee: u64) -> Result<()> {
    let accts = ctx.accounts;

    accts.global_state.fee = fee;
    accts.global_state.owner = accts.owner.key();
    accts.global_state.vault = accts.token_vault_account.key();
    accts.global_state.token_mint = accts.token_mint.key();
    accts.global_state.total_race = 0;

    Ok(())
}

pub fn create_race(ctx: Context<CreateRace>,race_index: u32, horse1_chance: u32, horse2_chance: u32, horse3_chance: u32, horse4_chance: u32, horse5_chance: u32) -> Result<()> {
    let accts = ctx.accounts;

    if accts.global_state.owner != accts.owner.key() {
        return Err(HorseRaceError::NotAllowedOwner.into());
    }

    if accts.global_state.total_race +1 != race_index {
        return Err(HorseRaceError::NotValidRaceIndex.into());
    }

    if horse1_chance + horse2_chance + horse3_chance + horse4_chance + horse5_chance !=100 {
        return Err(HorseRaceError::WinnerChangeNotValid.into());
    }


    // update the total race in the global state 
    accts.global_state.total_race = race_index;

    // init the race when create
    accts.race.race_id = accts.global_state.total_race;

    accts.race.players = 0;
    accts.race.bet_amount = 0;

    accts.race.horse1_chance = horse1_chance;
    accts.race.horse1_players = 0;
    accts.race.horse1_bet_amount = 0;

    accts.race.horse2_chance = horse2_chance;
    accts.race.horse2_players = 0;
    accts.race.horse2_bet_amount = 0;

    accts.race.horse3_chance = horse3_chance;
    accts.race.horse3_players = 0;
    accts.race.horse3_bet_amount = 0;

    accts.race.horse4_chance = horse4_chance;
    accts.race.horse4_players = 0;
    accts.race.horse4_bet_amount = 0;

    accts.race.horse5_chance = horse5_chance;
    accts.race.horse5_players = 0;
    accts.race.horse5_bet_amount = 0;

    accts.race.start_time = accts.clock.unix_timestamp;
    accts.race.status = 0; // 0 : created, 1: started, 2: finished 3: closed

    Ok(())
}

pub fn bet_race(ctx: Context<BetRace>, race_index: u32, player_index: u16, horse_id: u8,amount: u64) -> Result<()> {
    let accts =  ctx.accounts;

    if accts.user_race_info.deposited {
        return Err(HorseRaceError::AlreadyDeposited.into());
    }

    if accts.race.status == 1 {
        return Err(HorseRaceError::DepositFinished.into());
    }

    if accts.race.status == 2 {
        return Err(HorseRaceError::RaceFinished.into());
    }

    if horse_id != 1 && horse_id != 2 && horse_id != 3 && horse_id != 4 && horse_id != 5 {
        return Err(HorseRaceError::InvalidHorseIndex.into());
    }

    // bet amout to horse
    let cpi_ctx = CpiContext::new(
        accts.token_program.to_account_info(),
        Transfer {
            from: accts.token_owner_account.to_account_info().clone(),
            to: accts.token_vault_account.to_account_info().clone(),
            authority: accts.user.to_account_info().clone(),
        },
    );
    transfer(cpi_ctx, amount * (100 - accts.global_state.fee) / 100)?;

    // burn token as fee
    let cpi_context = CpiContext::new(
        accts.token_program.to_account_info(),
        Burn {
            mint: accts.token_mint.to_account_info(),
            from: accts.token_owner_account.to_account_info(),
            authority: accts.user.to_account_info(),
        },
    );
    burn(cpi_context, amount * accts.global_state.fee / 200)?;


    // update the user race info
    let transfer_amount = amount * (100 - accts.global_state.fee) / 100;
    accts.user_race_info.race_id = race_index;
    accts.user_race_info.player_index = player_index;
    accts.user_race_info.owner = accts.user.key();
    accts.user_race_info.horse_id = horse_id;
    accts.user_race_info.bet_amount = transfer_amount;
    accts.user_race_info.deposited = true;
    accts.user_race_info.claimed = false;

    //  update the race info
    match horse_id {
        1_u8 => {
            accts.race.horse1_players += 1;
            accts.race.horse1_bet_amount += transfer_amount;
        },
        2_u8 => {
            accts.race.horse2_players += 1;
            accts.race.horse2_bet_amount += transfer_amount;
        },
        3_u8 => {
            accts.race.horse3_players += 1;
            accts.race.horse3_bet_amount += transfer_amount;
        },
        4_u8 => {
            accts.race.horse4_players += 1;
            accts.race.horse4_bet_amount += transfer_amount;
        },
        5_u8 => {
            accts.race.horse5_players += 1;
            accts.race.horse5_bet_amount += transfer_amount;
        },
        _ => {
            
        }
    }
    accts.race.bet_amount += transfer_amount;
    accts.race.players += 1;
    accts.race.swapped_amount +=  amount * accts.global_state.fee / 200;

    Ok(())
}

pub fn start_race(ctx: Context<StartRace>, race_index: u32, force: [u8; 32],) -> Result<()> {
    let accts = ctx.accounts;

    if accts.global_state.owner != accts.owner.key() {
        return Err(HorseRaceError::NotAllowedOwner.into());
    }

    if accts.race.status != 0 {
        return Err(HorseRaceError::AlreadyStarted.into());
    }

    accts.race.status = 1;
    accts.race.force = force;

    // Request randomness.
    let cpi_program = accts.vrf.to_account_info();
    let cpi_accounts = Request {
        payer: accts.owner.to_account_info(),
        network_state: accts.config.to_account_info(),
        treasury: accts.treasury.to_account_info(),
        request: accts.random.to_account_info(),
        system_program: accts.system_program.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    orao_solana_vrf::cpi::request(cpi_ctx, force)?;

    Ok(())
}

pub fn finish_race(ctx: Context<FinishRace>, race_index: u32) -> Result<()> {
    let accts = ctx.accounts;

    if accts.random.data_is_empty() {
        return Err(HorseRaceError::UninitializedAccount.into());
    }

    if accts.global_state.owner != accts.owner.key() {
        return Err(HorseRaceError::NotAllowedOwner.into());
    }

    if accts.race.status != 1 {
        return Err(HorseRaceError::NotRaceInProgress.into());
    }

    accts.race.status = 2;

    let account = Randomness::try_deserialize(&mut &accts.random.data.borrow()[..])?;

    if let Some(randomness) = account.fulfilled() {
        let rand: u32 = (randomness[0] as u32 * 100 / 255 ) % 100;

        let chance1 = accts.race.horse1_chance;
        let chance2 = chance1.clone() + accts.race.horse2_chance;
        let chance3 = chance2.clone() + accts.race.horse3_chance;
        let chance4 = chance3.clone() + accts.race.horse4_chance;
        let chance5 = chance4.clone() + accts.race.horse5_chance;

        if rand <= chance1 {
            accts.race.reward_amount = accts.race.bet_amount - accts.race.horse1_bet_amount;
            accts.race.winner = 1;
        } else if rand <= chance2 {
            accts.race.reward_amount = accts.race.bet_amount - accts.race.horse2_bet_amount;
            accts.race.winner = 2;
        } else if rand <= chance3 {
            accts.race.reward_amount = accts.race.bet_amount - accts.race.horse3_bet_amount;
            accts.race.winner = 3;
        } else if rand <= chance4 {
            accts.race.reward_amount = accts.race.bet_amount - accts.race.horse4_bet_amount;
            accts.race.winner = 4;
        } else if rand <= chance5 {
            accts.race.reward_amount = accts.race.bet_amount - accts.race.horse5_bet_amount;
            accts.race.winner = 5;
        }
    }

    let (_, bump) = Pubkey::find_program_address(&[GLOBAL_STATE_SEED], ctx.program_id);
    let vault_seeds = &[GLOBAL_STATE_SEED, &[bump]];
    let signer = &[&vault_seeds[..]];

    let cpi_ctx = CpiContext::new(
        accts.token_program.to_account_info(),
        Transfer {
            from: accts.token_vault_account.to_account_info().clone(),
            to: accts.token_owner_account.to_account_info().clone(),
            authority: accts.global_state.to_account_info().clone(),
        },
    );

    let amount = accts.race.swapped_amount;

    transfer(
        cpi_ctx.with_signer(signer),
        amount,
    )?;
    
    Ok(())
}


pub fn claim_reward(ctx: Context<ClaimReward>, race_index: u32, player_index: u16) -> Result<()> {
    let accts = ctx.accounts;

    if accts.global_state.owner != accts.owner.key() {
        return Err(HorseRaceError::NotAllowedOwner.into());
    }

    if accts.race.status != 2 {
        return Err(HorseRaceError::NotRaceFinished.into());
    }

    if accts.race.race_id != accts.user_race_info.race_id {
        return Err(HorseRaceError::InvalidRaceIndex.into());
    }

    if u16::from(accts.race.winner)  != accts.user_race_info.horse_id.into() {
        return Err(HorseRaceError::NotWinner.into());
    }

    
    let (_, bump) = Pubkey::find_program_address(&[GLOBAL_STATE_SEED], ctx.program_id);
    let vault_seeds = &[GLOBAL_STATE_SEED, &[bump]];
    let signer = &[&vault_seeds[..]];

    let cpi_ctx = CpiContext::new(
        accts.token_program.to_account_info(),
        Transfer {
            from: accts.token_vault_account.to_account_info().clone(),
            to: accts.token_owner_account.to_account_info().clone(),
            authority: accts.global_state.to_account_info().clone(),
        },
    );

    match accts.race.winner {
        1_u8 => {
            let amount = accts.user_race_info.bet_amount + accts.race.reward_amount / accts.race.horse1_players as u64;

            transfer(
                cpi_ctx.with_signer(signer),
                amount,
            )?;
        },
        2_u8 => {
            let amount = accts.user_race_info.bet_amount + accts.race.reward_amount / accts.race.horse2_players as u64;

            transfer(
                cpi_ctx.with_signer(signer),
                amount,
            )?;
        },
        3_u8 => {
            let amount = accts.user_race_info.bet_amount + accts.race.reward_amount / accts.race.horse3_players as u64;

            transfer(
                cpi_ctx.with_signer(signer),
                amount,
            )?;
        },
        4_u8 => {
            let amount = accts.user_race_info.bet_amount + accts.race.reward_amount / accts.race.horse4_players as u64;

            transfer(
                cpi_ctx.with_signer(signer),
                amount,
            )?;
        },
        5_u8 => {
            let amount = accts.user_race_info.bet_amount + accts.race.reward_amount / accts.race.horse5_players as u64;

            transfer(
                cpi_ctx.with_signer(signer),
                amount,
            )?;
        },
        _ => {

        }
    }

    accts.race.status = 3;
    accts.user_race_info.claimed = true;

    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        init,
        payer = owner,
        seeds = [GLOBAL_STATE_SEED],
        bump,
        space = 8 + size_of::<GlobalState>()
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,
    #[account(
        init_if_needed,
        payer = owner,
        seeds = [VAULT_SEED, token_mint.key().as_ref()],
        bump,
        token::mint = token_mint,
        token::authority = global_state,
    )]
    pub token_vault_account: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(race_index: u32)]
pub struct CreateRace<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    
    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        init,
        payer = owner,
        seeds = [RACE_SEED, &race_index.to_le_bytes()],
        bump,
        space = 8 + size_of::<Race>()
    )]
    pub race: Account<'info, Race>,

    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
#[instruction(race_index: u32, player_index: u16)]
pub struct BetRace<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [RACE_SEED, &race_index.to_le_bytes()],
        bump,
    )]
    pub race: Account<'info, Race>,

    #[account(
        init_if_needed,
        payer = user,
        seeds = [USER_RACE_INFO_SEED,  &race_index.to_le_bytes(), &player_index.to_le_bytes()],
        bump,
        space = 8 + size_of::<UserRaceInfo>()
    )]
    pub user_race_info: Account<'info, UserRaceInfo>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,        
        token::mint = token_mint,
        token::authority = global_state,
    )]
    token_vault_account: Account<'info, TokenAccount>,

    #[account(mut)]
    token_owner_account: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(race_index: u32, force: [u8; 32])]
pub struct StartRace<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [RACE_SEED, &race_index.to_le_bytes()],
        bump,
    )]
    pub race: Account<'info, Race>,

     /// This account is the current VRF request account, it'll be the `request` account in the CPI call.
    /// CHECK:
    #[account(
        mut,
        seeds = [RANDOMNESS_ACCOUNT_SEED.as_ref(), &force],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]
    pub random: AccountInfo<'info>,

    /// CHECK:` doc comment explaining why no checks through types are necessary.
    #[account(mut)]
    pub treasury: AccountInfo<'info>,

    #[account(
        mut,
        seeds = [CONFIG_ACCOUNT_SEED.as_ref()],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]
    pub config: Box<Account<'info, NetworkState>>,
    pub vrf: Program<'info, OraoVrf>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(race_index: u32)]
pub struct FinishRace<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [RACE_SEED, &race_index.to_le_bytes()],
        bump,
    )]
    pub race: Account<'info, Race>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,

    #[account(mut)]
    pub token_owner_account: Account<'info, TokenAccount>,

    #[account(
        mut,        
        token::mint = token_mint,
        token::authority = global_state,
    )]
    pub token_vault_account: Account<'info, TokenAccount>,

    /// CHECK:` doc comment explaining why no checks through types are necessary.
    #[account(
        seeds = [RANDOMNESS_ACCOUNT_SEED.as_ref(), race.force.as_ref()],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]
    pub random: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(race_index: u32, player_index: u16)]
pub struct ClaimReward<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,

    #[account(
        mut,
        seeds = [GLOBAL_STATE_SEED],
        bump,
    )]
    pub global_state: Account<'info, GlobalState>,

    #[account(
        mut,
        seeds = [RACE_SEED, &race_index.to_le_bytes()],
        bump,
    )]
    pub race: Account<'info, Race>,

    #[account(
        mut,
        seeds = [USER_RACE_INFO_SEED,  &race_index.to_le_bytes(), &player_index.to_le_bytes()],
        bump,
    )]
    pub user_race_info: Account<'info, UserRaceInfo>,

    #[account(mut)]
    pub token_mint: Account<'info, Mint>,

    #[account(mut)]
    pub token_owner_account: Account<'info, TokenAccount>,

    #[account(
        mut,        
        token::mint = token_mint,
        token::authority = global_state,
    )]
    pub token_vault_account: Account<'info, TokenAccount>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}
