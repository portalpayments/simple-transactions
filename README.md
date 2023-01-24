# Portal Simple Transactions 

[Portal](https://getportal.app)'s Simple Transactions convert  `@solana/web3.js` transactions - the  `ParsedTransactionWithMeta` objects you get from `getTransactionsForAddress()` into human-readable transactions suitable for consumption by front end apps.

The library is in TypeScript with minimal dependencies.

This is our production transaction parsing code used in [Portal Wallet](https://getportal.app), we're releasing it for the first time here, so bear with us as we get it established as a standalone library!

## Example

### Before

A Solana `ParsedTransactionWithMeta`:

```typescript
{
  blockTime: 1669052844,
  meta: {
    err: null,
    fee: 5000,
    innerInstructions: [
      {
        index: 0,
        instructions: [
          {
            parsed: {
              info: {
                extensionTypes: ["immutableOwner"],
                mint: USDC_MAINNET_MINT_ACCOUNT,
              },
              type: "getAccountDataSize",
            },
            program: "spl-token",
            programId: new PublicKey(new PublicKey(SPL_TOKEN_PROGRAM)),
          },
          {
            parsed: {
              info: {
                lamports: 2039280,
                newAccount: new PublicKey(
                  "45hv5bBaXX9vK2zbdsZq526iHjhEPgsF3mascJDFoSuS"
                ),
                owner: SPL_TOKEN_PROGRAM,
                source: new PublicKey(MIKES_WALLET),
                space: 165,
              },
              type: "createAccount",
            },
            program: "system",
            programId: new PublicKey(new PublicKey(SOLANA_SYSTEM_PROGRAM)),
          },
          {
            parsed: {
              info: {
                account: "45hv5bBaXX9vK2zbdsZq526iHjhEPgsF3mascJDFoSuS",
              },
              type: "initializeImmutableOwner",
            },
            program: "spl-token",
            programId: new PublicKey(new PublicKey(SPL_TOKEN_PROGRAM)),
          },
          {
            parsed: {
              info: {
                account: "45hv5bBaXX9vK2zbdsZq526iHjhEPgsF3mascJDFoSuS",
                mint: USDC_MAINNET_MINT_ACCOUNT,
                owner: GREGS_WALLET,
              },
              type: "initializeAccount3",
            },
            program: "spl-token",
            programId: new PublicKey(new PublicKey(SPL_TOKEN_PROGRAM)),
          },
        ],
      },
    ],
    logMessages: [
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
      "Program log: Create",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: GetAccountDataSize",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 594408 compute units",
      "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program 11111111111111111111111111111111 invoke [2]",
      "Program 11111111111111111111111111111111 success",
      "Program log: Initialize the associated token account",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeImmutableOwner",
      "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 587918 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
      "Program log: Instruction: InitializeAccount3",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 584034 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20545 of 600000 compute units",
      "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
      "Program log: Instruction: TransferChecked",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6199 of 579455 compute units",
      "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
      "Program noteD9tEFTDH1Jn9B1HbpoC7Zu8L9QXRo7FjZj3PT93 invoke [1]",
      "Program noteD9tEFTDH1Jn9B1HbpoC7Zu8L9QXRo7FjZj3PT93 consumed 737 of 573256 compute units",
      "Program noteD9tEFTDH1Jn9B1HbpoC7Zu8L9QXRo7FjZj3PT93 success",
    ],
    postBalances: [
      446898195424, 2039280, 2039280, 1, 731913600, 0, 179719266068, 1009200,
      934087680, 1141440,
    ],
    postTokenBalances: [
      {
        accountIndex: 1,
        mint: USDC_MAINNET_MINT_ACCOUNT,
        owner: GREGS_WALLET,
        programId: new PublicKey(SPL_TOKEN_PROGRAM),
        uiTokenAmount: {
          amount: "5000000",
          decimals: 6,
          uiAmount: 5,
          uiAmountString: "5",
        },
      },
      {
        accountIndex: 2,
        mint: USDC_MAINNET_MINT_ACCOUNT,
        owner: MIKES_WALLET,
        programId: new PublicKey(SPL_TOKEN_PROGRAM),
        uiTokenAmount: {
          amount: "35933485",
          decimals: 6,
          uiAmount: 35.933485,
          uiAmountString: "35.933485",
        },
      },
    ],
    preBalances: [
      446900239704, 0, 2039280, 1, 731913600, 0, 179719266068, 1009200,
      934087680, 1141440,
    ],
    preTokenBalances: [
      {
        accountIndex: 2,
        mint: USDC_MAINNET_MINT_ACCOUNT,
        owner: MIKES_WALLET,
        programId: new PublicKey(SPL_TOKEN_PROGRAM),
        uiTokenAmount: {
          amount: "40933485",
          decimals: 6,
          uiAmount: 40.933485,
          uiAmountString: "40.933485",
        },
      },
    ],
    rewards: [],
    status: {
      Ok: null,
    },
  },
  slot: 162363388,
  transaction: {
    message: {
      accountKeys: [
        {
          pubkey: new PublicKey(MIKES_WALLET),
          signer: true,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: new PublicKey("45hv5bBaXX9vK2zbdsZq526iHjhEPgsF3mascJDFoSuS"),
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: new PublicKey(MIKES_USDC_ACCOUNT),
          signer: false,
          source: "transaction",
          writable: true,
        },
        {
          pubkey: new PublicKey(SOLANA_SYSTEM_PROGRAM),
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: new PublicKey(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM),
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: new PublicKey(GREGS_WALLET),
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: new PublicKey(USDC_MAINNET_MINT_ACCOUNT),
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: new PublicKey("SysvarRent111111111111111111111111111111111"),
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: new PublicKey(SPL_TOKEN_PROGRAM),
          signer: false,
          source: "transaction",
          writable: false,
        },
        {
          pubkey: new PublicKey(NOTE_PROGRAM),
          signer: false,
          source: "transaction",
          writable: false,
        },
      ],
      addressTableLookups: null,
      instructions: [
        {
          parsed: {
            info: {
              account: "45hv5bBaXX9vK2zbdsZq526iHjhEPgsF3mascJDFoSuS",
              mint: USDC_MAINNET_MINT_ACCOUNT,
              source: MIKES_WALLET,
              systemProgram: SOLANA_SYSTEM_PROGRAM,
              tokenProgram: SPL_TOKEN_PROGRAM,
              wallet: GREGS_WALLET,
            },
            type: "create",
          },
          program: "spl-associated-token-account",
          programId: new PublicKey(
            new PublicKey(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM)
          ),
        },
        {
          parsed: {
            info: {
              authority: MIKES_WALLET,
              destination: "45hv5bBaXX9vK2zbdsZq526iHjhEPgsF3mascJDFoSuS",
              mint: USDC_MAINNET_MINT_ACCOUNT,
              source: MIKES_USDC_ACCOUNT,
              tokenAmount: {
                amount: "5000000",
                decimals: 6,
                uiAmount: 5,
                uiAmountString: "5",
              },
            },
            type: "transferChecked",
          },
          program: "spl-token",
          programId: new PublicKey(new PublicKey(SPL_TOKEN_PROGRAM)),
        },
        {
          accounts: [new PublicKey(MIKES_WALLET), new PublicKey(GREGS_WALLET)],
          data: "AnWnJTR4tkAQv6QU6qhaVST1ddQ6CKYjbGFcr",
          programId: new PublicKey(NOTE_PROGRAM),
        },
      ],
      recentBlockhash: "CjNQgjXsnJx77HHUk9QjPYZgz1J9jyUs8paaMAuQ2pVj",
    },
    signatures: [
      "5e9xViaBigEX6G17PvHt9AizyJwRBHPdxCEkz2eLRYsanr53567SHzULhYT6zk63vbsZ4puN3WY7i5774HS7CneZ",
    ],
  },
}
```

### After 

```typescript
{
  id: "5e9xViaBigEX6G17PvHt9AizyJwRBHPdxCEkz2eLRYsanr53567SHzULhYT6zk63vbsZ4puN3WY7i5774HS7CneZ",
  date: 1669052844000,
  status: true,
  networkFee: 5000,
  direction: 0,
  amount: 5000000,
  currency: getCurrencyBySymbol("USDC").mintAddress,
  from: MIKES_WALLET,
  to: GREGS_WALLET,
  counterParty: GREGS_WALLET,
  memo: "Hey Greg! 🙋🏻‍♂️",
  receipt: null,
  swapAmount: null,
  swapCurrency: null,
}

```

## Features
[Portal](https://getportal.app)'s wallet is aimed principally at payments and spending, rather than exotic options trading, digital art, or other popular activities. 

If you want to inspect transactions from on-chain programs that don't have their IDLs published or that aren't open-source, you should investigate [Helius' Enhanced Transactions API](https://docs.helius.xyz/api-reference/enhanced-transactions-api)

Portal Simple Transactions features include:

### Summarizes a wide array of common payment transactions

Portal Simple Transactions handles and includes test transactions for Solana and SPL tokens, transactions that create wallets and transfer, transactions that just create wallets, transactions that just transfer, swaps, transfers with memos and notes, cyclical transfers that end up where they started, and more. You're welcome to add more! See the `test-data` directory.

### `direction` - whether the user sent or recieved funds
'wallet A sent money to wallet B' isn't useful to end users. Users want to know whether they're getting or receiving money (or swapping their own tokens). When producing simple transactions, we take both a transaction and a user's wallet address to provide a `direction` from that wallet's point of view.   
  - `0` Send
  - `1` Recieved
  - `2` Swapped

### `counterParty` - who you're dealing with.

So wallet A sent money to wallet B. Or wallet B sent money to wallet A. Either way, if you're wallet A, the person you're dealing with is wallet B. There's a `counterParty` field for this. 

### Details for swaps `swapCurrency` and `swapAmount`

Swap transactions include the source amount and currency.

### `memo` - decoded note and memos
Solana transactions can have notes and **note** or **memos** - attached  - little messages like 'thanks for the beer'. These are public, and you can use them like Venmo (as a public statement of what the transaction was for) or as a pointer to something private (like a receipt sent via wallet-to-wallet messaging).

### Proper handling of money in `amount`, `networkFee`, `swapAmount` etc.
Our background is making trading apps. Because humans work in decimal, and computers work in binary, and because it's really hard to represent 0.1 in binary, money should *always* handled in **minor units** (like cents for USD, pence for GBP, wei for Ethereum, lamports for Solana). Portal Simple Transactions always uses whole `number`s. We looked at other transaction summary tools and they send figures using decimal point `number`s - these  won't because other tools inevitably try and do maths with them and fail due to decimal / binary issues!
Simple Transactions always uses whole numbers.

### Experimental: itemised receipts for physical items

Portal Simple Transactions can show users what they purchased at retail, using Decaf point of sale:

This uses the Dialect SDK for wallet-to-wallet messaging. As walled-to-wallet messages are encrypted, you'll need user's the private key. This is considered experimental as:
 - The message recieved in the users account doesn't actually have the Solana transaction included in it - so we have to use some fuzzy timestamp logic.
 - You'll also need a CORS proxy to request the receipt from Decaf. 
   
### Tools to display crypto consistently with fiat

USDC has 9 decimal places. USD has two. In many cases, particularly when dealing with amounts more than 1 cent, it's useful to be able to display USDC in a manner consistent with USD.

Using `getMajorAndMinor()`,  `2000000000` USDC is properly displayed as `"2.00"`. `200000000` USDC is properly displayed as `"0.20"`. You may even want to format it as something like `0.20`

## Usage

### Get a simple transaction for a `ParsedTransactionWithMeta`

```
const portalSimpleTransaction = await summarizeTransaction(
  rawTransaction,
  new PublicKey('aWalletAddress')
);
```

### Get simple transactions for multiple `ParsedTransactionWithMeta`s

`secretkey` is only needed to read the users purchased items.

```
let transactionSummaries = await asyncMap(
  rawTransactions,
  (rawTransaction) => {
    return summarizeTransaction(
      rawTransaction,
      walletAddress,
      null,
      true,
      secretKey
    );
  }
);
```
