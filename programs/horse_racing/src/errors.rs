use anchor_lang::error_code;

#[error_code]
pub enum HorseRaceError {
    #[msg("HorseRaceError: Not allowed owner")]
    NotAllowedOwner,

    #[msg("HorseRaceError: Not valid race index")]
    NotValidRaceIndex,

    #[msg("HorseRaceError: already started")]
    AlreadyStarted,

    #[msg("HorseRaceError: already deposited")]
    AlreadyDeposited,

    #[msg("HorseRaceError: deposit finished")]
    DepositFinished,

    #[msg("HorseRaceError: race finished")]
    RaceFinished,

    #[msg("HorseRaceError: race not finished")]
    NotRaceFinished,

    #[msg("HorseRaceError: Invalid player index")]
    InvalidPlayerIndex,

    #[msg("HorseRaceError: Invalid race index")]
    InvalidRaceIndex,

    #[msg("HorseRaceError: Uninitialzied account")]
    UninitializedAccount,

    #[msg("HorseRaceError: Not race in progress")]
    NotRaceInProgress,

    #[msg("HorseRaceError: Not winner")]
    NotWinner
}