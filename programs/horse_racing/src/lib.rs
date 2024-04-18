mod errors;
mod events;
mod instructions;
mod state;
mod constants;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("3rM2gVWd4WbK9m8Vyy4SYMKLvxfFbcaU2yCUNfNCwY2r");

#[program]
pub mod horse_racing {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, fee: u64) -> Result<()> {
        instructions::initialize(ctx, fee)
    }

    pub fn create_race(ctx: Context<CreateRace>, race_index: u32, horse1_chance: u32, horse2_chance: u32, horse3_chance: u32, horse4_chance: u32, horse5_chance: u32) -> Result<()> {
        instructions::create_race(ctx, race_index, horse1_chance, horse2_chance, horse3_chance, horse4_chance, horse5_chance)
    }

    pub fn bet_race(ctx: Context<BetRace>, race_index: u32, player_index: u16, horse_id: u8, amount: u64) -> Result<()> {
        instructions::bet_race(ctx, race_index, player_index, horse_id, amount)
    } 

    pub fn start_race(ctx: Context<StartRace>, race_index: u32, force: [u8; 32] ) -> Result<()>{
        instructions::start_race(ctx, race_index, force)
    }

    pub fn finish_race(ctx: Context<FinishRace>, race_index: u32) -> Result<()>{
        instructions::finish_race(ctx, race_index)
    }

    pub fn claim_reward(ctx: Context<ClaimReward>, race_index: u32, player_index: u16) -> Result<()> {
        instructions::claim_reward(ctx, race_index, player_index)
    }
}

