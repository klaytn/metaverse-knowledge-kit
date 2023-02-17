---
title: 🌉 Celer
sidebar_label: Celer
---

# 🌉 Celer
Celer Bridge (cBridge) is a cryptocurrency cross-chain bridge that facilitates the transfer of assets from one chain to another at a reduced cost. Please refer to [Celer Bridge Documentation](https://cbridge-docs.celer.network) for more info.
<br/>
This module contains scripts to help you interact / integrate cBridge into your applications robustly without explicitly digging into cBridge technical documentation.

## Installation
`npm install @klaytn-developer-sdk/bridges-celer --save`

## Quick Start
BridgeSDK is the package containing the readymade use-cases.
CoreBridgeSDK exposes methods of `celer` core functions to write custom snippets.

```typescript
import BridgeSDK from '@klaytn-developer-sdk/bridges-celer';
import CoreBridgeSDK from '@klaytn-developer-sdk/bridges-celer/core';

or

const BridgeSDK = require('@klaytn-developer-sdk/bridges-celer');
const CoreBridgeSDK = require('@klaytn-developer-sdk/bridges-celer/core');
```

You can run following ready-made use-cases to test

> **_NOTE:_** Please make sure the wallet provided has enough balance in source/destination to perform the transactions.

### 1. PoolBased Transfer
You will be able to transfer your assets using cBridge's `pool based transfer`
method. It's a liquidity based transfer in which your assets are locked at source_chain (sending chain) and released on
destination_chain (receiving chain) from a pool of liquidity available on the destination chain.

```typescript
BridgeSDK.poolTransfer(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` public key of your wallet / account
  * `PRIVATE_KEY` - `string` private key of your wallet / account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `DST_CHAIN_ID` - `number` chain ID of destination-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to other chain)
  * `TOKEN_SYMBOL` - `string` SYMBOL of your token, which you want to move from source chain to destination.
You can get SYMBOLS of supported tokens with the pair of chains you've mentioned above at [cBridge](https://test-cbridge-v2.celer.network/5/71401/USDC) web interface
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 1 USDC
  * `SLIPPAGE_TOLERANCE` - `number` slippage amount you can tolerate while transferring your tokens from source to destination chain. Please go through [celer slippage_tolerance](https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt) for more info.
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.

#### Result
Promise `transferId` - `string` Transfer ID for tracking the transaction. To track the status or refund transaction if stuck

#### Example
```typescript
const BridgeSDK = require('@klaytn-developer-sdk/bridges-celer')

let CBRIDGE_GATEWAY_URL = "https://cbridge-v2-test.celer.network"
let WALLET_ADDRESS = "0x5Bc0635a264B94A8662e0F2887d76F8E5925F837"
let PRIVATE_KEY= "private key here" // Account should contain enough USDC tokens. Get Test USDC from https://test-cbridge-v2.celer.network/5/80001/USDC.
let SRC_CHAIN_ID= 5
let DST_CHAIN_ID= 80001
let SRC_CHAIN_RPC= "https://ethereum-goerli-rpc.allthatnode.com"
let TOKEN_SYMBOL= "USDC"
let AMOUNT= "1"
let SLIPPAGE_TOLERANCE= 550000 // 
let CONFIRMATIONS= 6

// Can also view the transaction in the Celer UI (https://test-cbridge-v2.celer.network/5/80001/USDC)
BridgeSDK.poolTransfer(
        CBRIDGE_GATEWAY_URL,
        WALLET_ADDRESS,
        PRIVATE_KEY,
        SRC_CHAIN_ID,
        DST_CHAIN_ID,
        SRC_CHAIN_RPC,
        TOKEN_SYMBOL,
        AMOUNT,
        SLIPPAGE_TOLERANCE,
        CONFIRMATIONS
).then(transferId => {
    console.log("TransferId =", transferId);
});
/*
  0. get transfer config for transaction
  1. Checking Allowance of tokens to cBridge contract
  Allowance: 115792089237316195423570985008687907853269984665640564039457584007913069639935
  Amount   : 1000000
  TransferId: 0xcfb407a74a3cf621777a8948ce1e26ee4e6dd5766a3ab26041f599e8ab40184b
  2. make an estimation for this transfer
  3. submit an on-chain send transaction
  poolTransferTx hash: 0x6c5476adb94cd0f55f23b75c625af7ffe09e534db28265483f3b1cdbf53ba586
  Waiting for the confirmations of poolTransferTx
  poolTransferTx confirmed upto 6 confirmations
  4. getTransferStatus for this transaction until the transfer is complete or needs a refund
  TransferId = 0xcfb407a74a3cf621777a8948ce1e26ee4e6dd5766a3ab26041f599e8ab40184b
  cBRIDGE => TRANSFER_WAITING_FOR_SGN_CONFIRMATION
  cBRIDGE => TRANSFER_WAITING_FOR_FUND_RELEASE
  cBRIDGE => TRANSFER_COMPLETED
  Tx Details:  {
    err: undefined,
    status: 5,
    wdOnchain: '',
    sortedSigsList: [],
    signersList: [],
    powersList: [],
    refundReason: 2,
    blockDelay: 5,
    srcBlockTxLink: 'https://goerli.etherscan.io/tx/0x6c5476adb94cd0f55f23b75c625af7ffe09e534db28265483f3b1cdbf53ba586',
    dstBlockTxLink: ''
  }
*/
```

### 1.1. PoolBased Refund Transfer
Due to any reason if your funds / assets were not released on destination_chain, don't worry you can get them back on
source_chain by submitting refund request.

```typescript
BridgeSDK.poolTransferRefund(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` public key of your wallet / account
  * `PRIVATE_KEY` - `string` private key of your wallet / account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to other chain)
  * `TOKEN_SYMBOL` - `string` SYMBOL of your token, which you want to move from source chain to destination.
You can get SYMBOLS of supported tokens with the pair of chains you've mentioned above at [cBridge](https://test-cbridge-v2.celer.network/5/71401/USDC) web interface
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 1 USDC
  * `SLIPPAGE_TOLERANCE` - `number` slippage amount you can tolerate while transferring your tokens from source to destination chain. Please go through [celer slippage_tolerance](https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt) for more info.
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.
  * `TRANSFER_ID` - `string` Transfer ID received while performing the transfer.

#### Result
Promise `transactionReceipt` - `object` blockchain transaction receipt

#### Example
```typescript
let BridgeSDK = require("@klaytn-developer-sdk/bridges-celer");

let CBRIDGE_GATEWAY_URL = "https://cbridge-v2-test.celer.network"
let WALLET_ADDRESS = "0x5Bc0635a264B94A8662e0F2887d76F8E5925F837"
let PRIVATE_KEY= "private key here"
let SRC_CHAIN_ID= 5
let SRC_CHAIN_RPC= "https://ethereum-goerli-rpc.allthatnode.com"
let TOKEN_SYMBOL= "USDC"
let AMOUNT= "1"
let SLIPPAGE_TOLERANCE= 550000
let CONFIRMATIONS= 6
let TRANSFER_ID = "0x64e0c583b60dc68390119dcc968cd27b4c2f1c92bdeec22fbab145235e7d0e01" // Transfer ID received while performing the transfer

BridgeSDK.poolTransferRefund(
        CBRIDGE_GATEWAY_URL,
        WALLET_ADDRESS,
        PRIVATE_KEY,
        SRC_CHAIN_ID,
        SRC_CHAIN_RPC,
        TOKEN_SYMBOL,
        AMOUNT,
        SLIPPAGE_TOLERANCE,
        TRANSFER_ID,
        CONFIRMATIONS
).then(contractReceipt => {
    console.log("Transaction Hash: "+contractReceipt.transactionHash)
});
```

### 2. mintCanonicalToken
You will be able to transfer your assets using cBridge's `Mint Canonical Token`
method. It's a traditional method in which your assets are locked at source_chain (sending chain) and minted on
destination_chain (receiving chain).
    
```typescript
BridgeSDK.mintCanonicalToken(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` public key of your wallet / account
  * `PRIVATE_KEY` - `string` private key of your wallet / account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `DST_CHAIN_ID` - `number` chain ID of destination-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to other chain)
  * `TOKEN_SYMBOL` - `string` Pegged token address on the pegged chain
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 1 USDC
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.

#### Result
Promise `depositId` - `string` deposit id

#### Example
```typescript
let BridgeSDK = require("@klaytn-developer-sdk/bridges-celer");

let CBRIDGE_GATEWAY_URL = "https://cbridge-v2-test.celer.network"
let WALLET_ADDRESS = "0x5Bc0635a264B94A8662e0F2887d76F8E5925F837"
let PRIVATE_KEY= "private key here"
let SRC_CHAIN_ID= 5
let DST_CHAIN_ID= 71401
let SRC_CHAIN_RPC= "https://ethereum-goerli-rpc.allthatnode.com"
let TOKEN_SYMBOL= "USDC"
let AMOUNT= "1"
let CONFIRMATIONS= 6

BridgeSDK.mintCanonicalToken(
        CBRIDGE_GATEWAY_URL,
        WALLET_ADDRESS,
        PRIVATE_KEY,
        SRC_CHAIN_ID,
        DST_CHAIN_ID,
        SRC_CHAIN_RPC,
        TOKEN_SYMBOL,
        AMOUNT,
        CONFIRMATIONS
).then(depositId => {
    console.log("DepositId =", depositId);
});
/*
  0. get transfer config for transaction
  1. Checking Allowance of tokens to OriginalToken contract
  Approving the tokens
  approveTx hash: 0x550191f044d181e3db17736b59f4b238dd8a8db2c903ccba4f869e610021402e
  Waiting for the confirmations of approveTx
  approveTx confirmed upto 6 confirmations
  depositId: 0xff1a7d4b1153cdf97259070bd2e81515b1b6ed12f38aeb8b44cbebbf96389fc1
  3. submit an on-chain send transaction
  depositTx hash: 0xd89cae2e1b2b76d6c80ad59f5991800f8477bdeb169848f8d568ec38916c4abd
  Waiting for the confirmations of depositTx
  depositTx confirmed upto 6 confirmations
  4. getTransferStatus for this transaction until the transfer is complete or needs a refund
  DepositId = 0xff1a7d4b1153cdf97259070bd2e81515b1b6ed12f38aeb8b44cbebbf96389fc1
  cBRIDGE => TRANSFER_WAITING_FOR_SGN_CONFIRMATION
  cBRIDGE => TRANSFER_WAITING_FOR_FUND_RELEASE
  cBRIDGE => TRANSFER_COMPLETED
  Tx Details:  {
    err: undefined,
    status: 5,
    wdOnchain: '',
    sortedSigsList: [],
    signersList: [],
    powersList: [],
    refundReason: 0,
    blockDelay: 5,
    srcBlockTxLink: 'https://goerli.etherscan.io/tx/0xd89cae2e1b2b76d6c80ad59f5991800f8477bdeb169848f8d568ec38916c4abd',
    dstBlockTxLink: 'https://gw-explorer.nervosdao.community/tx/0xda9fe9e9bc7b907226ce1f85fe338a1c163de2f2ceb31ee8d8249fe1a83ce633'
  }
*/
```

### 2.1. Refund mintCanonicalToken
Due to any reason if your funds / assets were not minted on destination_chain, don't worry you can get them back on
source_chain by submitting refund request.

```typescript
BridgeSDK.mintCanonicalTokenRefund(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` public key of your wallet / account
  * `PRIVATE_KEY` - `string` private key of your wallet / account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `DST_CHAIN_ID` - `number` chain ID of destination-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to other chain)
  * `SLIPPAGE_TOLERANCE` - `number` slippage amount you can tolerate while transferring your tokens from source to destination chain. Please go through [celer slippage_tolerance](https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt) for more info.
  * `TOKEN_SYMBOL` - `string` SYMBOL of your token, which you want to move from source chain to destination.
You can get SYMBOLS of supported tokens with the pair of chains you've mentioned above at [cBridge](https://test-cbridge-v2.celer.network/5/71401/USDC) web interface
  * `SLIPPAGE_TOLERANCE` - `number` slippage amount you can tolerate while transferring your tokens from source to destination chain. Please go through [celer slippage_tolerance](https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt) for more info.
  * `DEPOSIT_ID` - `string` Deposit ID received while performing the mint transfer.
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 1 USDC
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.

#### Result
Promise `transactionReceipt` - `object` blockchain transaction receipt

#### Example
```typescript
let BridgeSDK = require("@klaytn-developer-sdk/bridges-celer");

let CBRIDGE_GATEWAY_URL = "https://cbridge-v2-test.celer.network"
let WALLET_ADDRESS = "0x5Bc0635a264B94A8662e0F2887d76F8E5925F837"
let PRIVATE_KEY= "private key here"
let SRC_CHAIN_ID= 5
let DST_CHAIN_ID= 71401
let SRC_CHAIN_RPC= "https://ethereum-goerli-rpc.allthatnode.com"
let SLIPPAGE_TOLERANCE = 550000
let TOKEN_SYMBOL= "USDC"
let DEPOSIT_ID = "deposit Id of a mint transaction to be reverted if stuck"
let AMOUNT= "1"
let CONFIRMATIONS= 6

BridgeSDK.mintCanonicalTokenRefund(
        CBRIDGE_GATEWAY_URL,
        WALLET_ADDRESS,
        PRIVATE_KEY,
        SRC_CHAIN_ID,
        DST_CHAIN_ID,
        SRC_CHAIN_RPC,
        SLIPPAGE_TOLERANCE,
        TOKEN_SYMBOL,
        DEPOSIT_ID,
        AMOUNT,
        CONFIRMATIONS
).then(contractReceipt => {
    console.log("Transaction Hash: "+contractReceipt.transactionHash)
});
```

## 3. burnCanonicalToken
You will also be able to withdraw your assets from destination chain to source chain (the chain from where you sent tokens earlier) using cBridge's `Burn Canonical Token`
method. It's a method in which your assets get burnt at source_chain ( the chain from where you're withdrawing your assets) and released on
destination_chain (the chain on which you want to receive you withdrawn assets).


```typescript
BridgeSDK.burnCanonicalToken(transferObj)
```
> **_NOTE:_** Amount for burn should always be between min and max burn values of pegged burn contract
  - you can get min & max burn amount of given pegged token cBridge contract
  - for example at Godwoken testnet for the token of `USDC: 0x4Ea08DCA142F103ac2D5FF95F1d376712C5EF5a9`
  - you can get maxBurn & minBurn amount from [this Godwoken cBridge contract](https://gw-explorer.nervosdao.community/address/0x70D4814e111Ad66B90B90D54a44797BC696BcdAF/read-contract#address-tabs).
  - you need to provide `USDC` address as a parameter in above-mentioned functions (same for other chains & pegged tokens)

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to other chain)
  * `WALLET_ADDRESS` - `string` public key of your wallet / account
  * `PRIVATE_KEY` - `string` private key of your wallet / account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `DST_CHAIN_ID` - `number` chain ID of destination-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `TOKEN_SYMBOL` - `string` Pegged token address on the pegged chain
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 1 USDC
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.

#### Result
Promise `burnId` - `string` burn id to track the status or refund transaction if stuck

#### Example
```typescript
let BridgeSDK = require("@klaytn-developer-sdk/bridges-celer");

let CBRIDGE_GATEWAY_URL = "https://cbridge-v2-test.celer.network"
let SRC_CHAIN_RPC= "https://godwoken-testnet-v1.ckbapp.dev"
let WALLET_ADDRESS = "0x5Bc0635a264B94A8662e0F2887d76F8E5925F837"
let PRIVATE_KEY= "private key here"
let SRC_CHAIN_ID= 71401
let DST_CHAIN_ID= 5
let TOKEN_SYMBOL= "USDC"
let AMOUNT= "21" // Amount must be between min, max burn configuration and have enough balance. Please refer to the Note section above for more details.
let CONFIRMATIONS= 6

BridgeSDK.burnCanonicalToken(
        CBRIDGE_GATEWAY_URL,
        SRC_CHAIN_RPC,
        WALLET_ADDRESS,
        PRIVATE_KEY,
        SRC_CHAIN_ID,
        DST_CHAIN_ID,
        TOKEN_SYMBOL,
        AMOUNT,
        CONFIRMATIONS
).then(burnId => {
    console.log("BurnId =", burnId);
});
/*
  0. get transfer config for transaction
  1. Checking Allowance of tokens to PeggedToken contract
  Approving the tokens
  approveTx hash: 0x89c92a0162b854df1c0b65944d77aecce20ea40cfbabf9bf17d8082d039091d7
  Waiting for the confirmations of approveTx
  approveTx confirmed upto 6 confirmations
  burnId: 0x42f176213beff1ac6ebd94e0dcaa050adc1cc28b9ee6ba97e02082de9864698e
  3. submit an on-chain send transaction
  burnTx hash: 0x7388ac7124dff28892391ce2870d4c55c160e02395b650ccf24674b0452865a8
  Waiting for the confirmations of burnTx
  burnTx confirmed upto 6 confirmations
  4. getTransferStatus for this transaction until the transfer is complete or needs a refund
  BurnId = 0x42f176213beff1ac6ebd94e0dcaa050adc1cc28b9ee6ba97e02082de9864698e
  cBRIDGE => TRANSFER_WAITING_FOR_FUND_RELEASE
  cBRIDGE => TRANSFER_COMPLETED
  Tx Details:  {
    err: undefined,
    status: 5,
    wdOnchain: '',
    sortedSigsList: [],
    signersList: [],
    powersList: [],
    refundReason: 0,
    blockDelay: 1,
    srcBlockTxLink: 'https://gw-explorer.nervosdao.community/tx/0x7388ac7124dff28892391ce2870d4c55c160e02395b650ccf24674b0452865a8',
    dstBlockTxLink: 'https://goerli.etherscan.io/tx/0x1e5a684afeaa5c4fee2141cbb1489da2a3f1bcf4fbfe6ccb7c9cf58555e0ab93'
  }
*/
```

### 3.1. Refund mintCanonicalToken
Due to any reason if your funds / assets were not released on destination_chain, don't worry you can get them back on
source_chain by submitting refund request.

```typescript
BridgeSDK.burnCanonicalTokenRefund(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` public key of your wallet / account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `DST_CHAIN_ID` - `number` chain ID of destination-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to other chain)
  * `PRIVATE_KEY` - `string` private key of your wallet / account
  * `SLIPPAGE_TOLERANCE` - `number` slippage amount you can tolerate while transferring your tokens from source to destination chain. Please go through [celer slippage_tolerance](https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt) for more info.
  * `TOKEN_SYMBOL` - `string` SYMBOL of your token, which you want to move from source chain to destination.
You can get SYMBOLS of supported tokens with the pair of chains you've mentioned above at [cBridge](https://test-cbridge-v2.celer.network/5/71401/USDC) web interface
  * `BURN_ID` - `string` Burn ID received while performing the burn transfer.
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 21 USDC
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.

#### Result
Promise `transactionReceipt` - `object` blockchain transaction receipt

#### Example
```typescript
let BridgeSDK = require("@klaytn-developer-sdk/bridges-celer");

let CBRIDGE_GATEWAY_URL = "https://cbridge-v2-test.celer.network"
let WALLET_ADDRESS = "0x5Bc0635a264B94A8662e0F2887d76F8E5925F837"
let SRC_CHAIN_ID= 71401
let DST_CHAIN_ID= 5
let SRC_CHAIN_RPC= "https://godwoken-testnet-v1.ckbapp.dev"
let PRIVATE_KEY= "private key here"
let SLIPPAGE_TOLERANCE = 550000
let TOKEN_SYMBOL= "USDC"
let BURN_ID = "burnId of a previous burn transaction to be reverted if stuck"
let AMOUNT= "21"
let CONFIRMATIONS= 6

BridgeSDK.burnCanonicalTokenRefund(
        CBRIDGE_GATEWAY_URL,
        WALLET_ADDRESS,
        SRC_CHAIN_ID,
        DST_CHAIN_ID,
        SRC_CHAIN_RPC,
        PRIVATE_KEY,
        SLIPPAGE_TOLERANCE,
        TOKEN_SYMBOL,
        BURN_ID,
        AMOUNT,
        CONFIRMATIONS
).then(contractReceipt => {
    console.log("Transaction Hash: "+contractReceipt.transactionHash)
});
```

## Reference Docs

- https://cbridge-docs.celer.network/developer/cbridge-sdk
- https://github.com/celer-network/cBridge-typescript-client
- https://test-cbridge-v2.celer.network/ (Testnet Website URL)
- https://cbridge.celer.network (Mainnet Website URL)
