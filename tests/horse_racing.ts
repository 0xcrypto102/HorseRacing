import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HorseRacing } from "../target/types/horse_racing";

import { SystemProgram, Keypair, PublicKey, Transaction, SYSVAR_RENT_PUBKEY, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createAccount, createAssociatedTokenAccount, getAssociatedTokenAddress , ASSOCIATED_TOKEN_PROGRAM_ID,createMint, mintTo, mintToChecked, getAccount, getMint, getAssociatedTokenAddressSync,  } from "@solana/spl-token";
import {
  Orao,
  networkStateAccountAddress,
  randomnessAccountAddress,
  FulfillBuilder,
  InitBuilder,
} from "@orao-network/solana-vrf";

describe("horse_racing", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HorseRacing as Program<HorseRacing>;

  let globalState, tokenVaultAccount, userInfo, tokenOwnerAccount: PublicKey;
  let globalStateBump,tokenVaultAccountBump,userInfoBump: number;
  

  const GLOBAL_STATE_SEED = "GLOBAL-STATE-SEED";
  const USER_RACE_INFO_SEED = "USER-RACE-INFO-SEED"; 
  const VAULT_SEED = "VAULT-SEED";
  const RACE_SEED = "RACE-SEED";

  const tokenMint = new PublicKey("8NtheYSKWDkCgWoc8HScQFkcCTF1FiFEbbriosZLNmtE");

  let owner = Keypair.fromSecretKey(Uint8Array.from([40,99,26,70,105,80,7,101,254,157,6,15,246,207,151,29,5,142,33,154,246,128,6,190,239,191,147,115,241,217,13,169,63,7,158,42,242,198,39,230,40,85,41,68,22,57,86,10,229,14,159,81,159,159,3,218,116,30,3,106,54,57,221,134]));

  let user = Keypair.fromSecretKey(
    Uint8Array.from([66,206,49,111,232,143,171,223,90,21,174,154,103,27,177,123,67,40,52,33,37,167,75,76,167,195,34,48,203,118,95,213,160,4,246,134,216,28,38,1,182,255,216,123,146,224,96,81,175,128,250,34,55,16,243,170,237,66,212,214,200,255,225,131])
  );
  const provider = program.provider;
  const vrf = new Orao(provider);

  it("is initialized accounts", async() => {
    [globalState, globalStateBump] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(GLOBAL_STATE_SEED)
      ],
      program.programId
    );

    [tokenVaultAccount, tokenVaultAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(VAULT_SEED),
        tokenMint.toBuffer()
      ],
      program.programId
    );

    tokenOwnerAccount = await getAssociatedTokenAddress(
      tokenMint,
      user.publicKey
    );
  });

  it("Is initialized!", async () => {
    // Add your test here.
    const fee = 2;
    const tx = await program.rpc.initialize(
      new anchor.BN(fee),
      {
        accounts: {
          owner: owner.publicKey,
          globalState,
          tokenMint,
          tokenVaultAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID
        },
        signers: [owner]
      }
    );

    const globalStateData = await program.account.globalState.fetch(globalState);
    console.log("globalStateData->",globalStateData);
  });
  

  it("create race", async() => {
    const globalStateData = await program.account.globalState.fetch(globalState);
    const raceIndex = globalStateData.totalRace + 1;

    const [race, _] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(RACE_SEED),
        new anchor.BN(raceIndex).toBuffer('le', 4)
      ],
      program.programId
    );
    const tx = await program.rpc.createRace(
      raceIndex,
      {
        accounts: {
          owner: owner.publicKey,
          globalState,
          race,
          systemProgram: SystemProgram.programId,
          clock: SYSVAR_CLOCK_PUBKEY
        },
        signers: [owner]
      }
    );

    const raceData = await program.account.race.fetch(race);
    console.log("raceData -> ", raceData);
 });

 it("bet race", async() => {
    let globalStateData = await program.account.globalState.fetch(globalState);
    const raceIndex = globalStateData.totalRace;
    const horseId = 3;
    const betAmount = 5000000;

    const [race, _] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(RACE_SEED),
        new anchor.BN(raceIndex).toBuffer('le', 4)
      ],
      program.programId
    );

    let raceData = await program.account.race.fetch(race);
    const playerIndex = raceData.players + 1;


    const [userRaceInfo, _2] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(USER_RACE_INFO_SEED),
        new anchor.BN(raceIndex).toBuffer('le',4),
        new anchor.BN(playerIndex).toBuffer('le',2)
      ],
      program.programId
    );
    console.log(raceIndex,
      playerIndex,
      horseId,
      betAmount)

    try {
      const tx = await program.rpc.betRace(
        raceIndex,
        playerIndex,
        horseId,
        new anchor.BN(betAmount),
        {
          accounts: {
            user: user.publicKey,
            globalState,
            race,
            userRaceInfo,
            tokenMint,
            tokenVaultAccount,
            tokenOwnerAccount,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID
          },
          signers: [user]
        }
      );
  
      globalStateData = await program.account.globalState.fetch(globalState);
      console.log("globalStateData->", globalStateData);
  
      raceData = await program.account.race.fetch(race);
      console.log("raceData->", raceData);
  
      const userRaceInfoData = await program.account.userRaceInfo.fetch(userRaceInfo);
      console.log("userRaceInfoData->", userRaceInfoData);
    } catch (error) {
      console.log(error);
    }

    
 });

 it("start race", async() => {
    const force = Keypair.generate().publicKey;
    const random = randomnessAccountAddress(force.toBuffer());
    const networkState = await vrf.getNetworkState();
    const treasury = networkState.config.treasury;
    let globalStateData = await program.account.globalState.fetch(globalState);
    const raceIndex = globalStateData.totalRace;
    const [race, _] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(RACE_SEED),
        new anchor.BN(raceIndex).toBuffer('le', 4)
      ],
      program.programId
    );

    console.log([...force.toBuffer()]);

    try {
      const tx = await program.rpc.startRace(
        raceIndex,
        [...force.toBuffer()],
        {
          accounts: {
            owner: owner.publicKey,
            globalState,
            race,
            random,
            treasury,
            config: networkStateAccountAddress(),
            vrf: vrf.programId,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
          },
          signers: [owner]
        }
      );

      const randomness = await vrf.waitFulfilled(force.toBuffer());
      const rand =  randomness.fulfilled();
      console.log("rand->", rand);

    } catch (error) {
      console.log(error);
    }
 }); 
 
  it("finish race", async() => {
    const raceIndex =3;
    let tokenOwnerAccountForFee = await getAssociatedTokenAddress(
      tokenMint,
      owner.publicKey
    );
    const playerIndex = 1;

    const [race, _] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(RACE_SEED),
        new anchor.BN(raceIndex).toBuffer('le', 4)
      ],
      program.programId
    );

    let raceData = await program.account.race.fetch(race);
    const random = randomnessAccountAddress(raceData.force);

    try {
      const tx = await program.rpc.finishRace(
        raceIndex,
        {
          accounts: {
            owner: owner.publicKey,
            globalState,
            race,
            tokenMint,
            tokenOwnerAccount: tokenOwnerAccountForFee,
            tokenVaultAccount,
            random,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID
          },
          signers: [owner]
        }
      );
      raceData = await program.account.race.fetch(race);
      console.log("raceData->", raceData);
    } catch (error) {
      console.log(error);
    }
  });
  
  
  it("claim reward", async() => {
    const raceIndex = 3;
    const playerIndex = 1;

    const [race, _] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(RACE_SEED),
        new anchor.BN(raceIndex).toBuffer('le', 4)
      ],
      program.programId
    );

    const [userRaceInfo, _2] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(USER_RACE_INFO_SEED),
        new anchor.BN(raceIndex).toBuffer('le',4),
        new anchor.BN(playerIndex).toBuffer('le',2)
      ],
      program.programId
    );

  
    let raceData = await program.account.race.fetch(race);
    console.log("raceData->", raceData);

    const randomness = await vrf.waitFulfilled(raceData.force);
    const rand =  randomness.fulfilled();
    console.log("random->", rand);

    const userRaceInfoData = await program.account.userRaceInfo.fetch(userRaceInfo);
    console.log("userRaceInfoData->", userRaceInfoData);
    try {
      const tx = await program.rpc.claimReward(
        raceIndex,
        playerIndex,
        {
          accounts: {
            owner: owner.publicKey,
            globalState,
            race,
            userRaceInfo,
            tokenMint,
            tokenOwnerAccount,
            tokenVaultAccount,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID
          },
          signers: [owner]
        }
      );
      raceData = await program.account.race.fetch(race);
      console.log("raceData->", raceData);
    } catch (error) {
      console.log(error);
    }
  });
 
});
