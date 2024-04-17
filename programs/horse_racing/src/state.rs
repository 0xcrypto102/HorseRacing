use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct GlobalState {
    pub total_race: u32,
    pub fee: u64,
    pub token_mint: Pubkey,
    pub vault: Pubkey,
    pub owner: Pubkey,
}

#[account]
#[derive(Default)]
pub struct Race {
    pub race_id: u32, // index of race
    pub players: u16, // total players take part in race
    pub bet_amount: u64, // total bet amount in race
    pub horse1_players: u16, // players to bet in first horse
    pub horse1_bet_amount: u64, // total bet amount of first horse
    pub horse2_players: u16, // players to bet in second horse
    pub horse2_bet_amount: u64, // total bet amount of second horse
    pub horse3_players: u16, // players to bet in third horse
    pub horse3_bet_amount: u64, // total bet amount of third horse
    pub horse4_players: u16, // players to bet in fourth horse
    pub horse4_bet_amount: u64, // total bet amount of fourth horse
    pub horse5_players: u16, // players to bet in fiveth horse
    pub horse5_bet_amount: u64, // total bet amount of fiveth horse
    pub force: [u8; 32],
    pub start_time: i64,
    pub status: u8,
    pub winner: u8,
    pub reward_amount: u64,
    pub swapped_amount: u64,
}

#[account]
#[derive(Default)]
pub struct UserRaceInfo {
    pub race_id: u32,
    pub player_index: u16,
    pub owner: Pubkey,
    pub horse_id: u8,
    pub bet_amount: u64,
    pub deposited: bool,
    pub claimed: bool,
}