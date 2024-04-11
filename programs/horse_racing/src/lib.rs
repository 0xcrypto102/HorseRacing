use anchor_lang::prelude::*;

declare_id!("HNHJincv6PXfKGu6itbsbPnPgeEDPxCfa82otQ6iyifk");

#[program]
pub mod horse_racing {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
