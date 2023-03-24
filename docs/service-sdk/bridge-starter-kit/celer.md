---
title: 🌉 Celer
sidebar_label: Celer
---

# 🌉 Celer
Celer Bridge (cBridge) is a cross-chain bridge that helps in moving assets from one chain to the other with lower costs. Please refer to the [Official Documentation](https://cbridge-docs.celer.network) for detailed information on Celer.

This module provides scripts to help you interact/integrate cBridge into your applications robustly without explicitly digging into cBridge technical documentation. Basic features included in the package are: 

**Pool Based Transfer (Liquidity)**
1. **PoolTransfer** : Liquidity transfer from one chain to another by locking funds in source chain and releasing funds in destination chain.
2. **PoolTransfer Refund** : Request refund for any failed pool transfer transactions.

**Canonical Mapping Transfer (Asset)**
1. **MintCanonical Token** : Mint or Deposit tokens on the source chain 
2. **MintCanonical Token Refund** : Request refund for any failed mint transactions
3. **BurnCanonical Token** : Burn or withdraw tokens on pegged chain
4. **BurnCanonical Token Refund** : Request refund for any failed burn transactions
 
Follow the below steps to try out the above features using the sdk. 

## Installation
```sh
npm install @klaytn/kss-bridges-celer --save
```

## Quick Start
There are two modules in the celer bridge starter kit.
  1. BridgeSDK provides the implementation and examples of bridge use-cases.
  2. CoreBridgeSDK exposes methods of `celer` core functions to write custom snippets.

```typescript
import BridgeSDK from '@klaytn/kss-bridges-celer';
import CoreBridgeSDK from '@klaytn/kss-bridges-celer/core';

or

const BridgeSDK = require('@klaytn/kss-bridges-celer');
const CoreBridgeSDK = require('@klaytn/kss-bridges-celer/core');
```

> **_NOTE:_** Please make sure the wallet provided has enough balance in source/destination to perform the transactions.

### 1. PoolBased Transfer
You will be able to transfer your funds using cBridge's `pool based transfer` method. It's a liquidity based transfer in which your funds are locked at source_chain (sending chain) and released on destination_chain (receiving chain) from a pool of liquidity available on the destination chain.

```typescript
BridgeSDK.poolTransfer(transferObj)
```

#### Parameters
`transferObj` - `Object`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` address of your account.
  * `PRIVATE_KEY` - `string` private key of your account.
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain.
  * `DST_CHAIN_ID` - `number` chain ID of destination-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain.
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to).
  * `TOKEN_SYMBOL` - `string` SYMBOL of your token, which you want to move from source chain to destination.
You can get SYMBOLS of supported tokens with the pair of chains you've mentioned above at [cBridge](https://test-cbridge-v2.celer.network/5/71401/USDC) web interface
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 1 USDC
  * `SLIPPAGE_TOLERANCE` - `number` slippage amount you can tolerate while transferring your tokens from source to destination chain. Please go through [celer slippage_tolerance](https://cbridge-docs.celer.network/developer/api-reference/gateway-estimateamt) for more info.
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.

#### Result
Promise `transferId` - `string` Transfer ID for tracking the transaction. To track the status or refund transaction if stuck

#### Example
```typescript
const BridgeSDK = require('@klaytn/kss-bridges-celer')

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

// View the transaction in the Celer UI (https://test-cbridge-v2.celer.network/5/80001/USDC)
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
```

### 1.1. Refund PoolBased Transfer 
Due to any reason if your funds / assets were not released on destination_chain, don't worry you can get them back on
source_chain by submitting refund request.

```typescript
BridgeSDK.poolTransferRefund(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` address of your account.
  * `PRIVATE_KEY` - `string` private key of your account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `SRC_CHAIN_RPC` - `string` RPC endpoint of your source-chain (the chain from where you want to send your tokens to )
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
let BridgeSDK = require("@klaytn/kss-bridges-celer");

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

### 2. MintCanonicalToken
You will be able to transfer your assets using cBridge's `Mint Canonical Token` method. It's a traditional method in which your assets are locked at source_chain (sending chain) and minted on destination_chain (receiving chain).
    
```typescript
BridgeSDK.mintCanonicalToken(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` address of your account.
  * `PRIVATE_KEY` - `string` private key of your account
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
let BridgeSDK = require("@klaytn/kss-bridges-celer");

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
```

### 2.1. Refund mintCanonicalToken
Due to any reason if your funds / assets were not minted on destination_chain, don't worry you can get them back on source_chain by submitting refund request.

```typescript
BridgeSDK.mintCanonicalTokenRefund(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` address key of your account
  * `PRIVATE_KEY` - `string` private key of your  account
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
let BridgeSDK = require("@klaytn/kss-bridges-celer");

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

### 3. BurnCanonicalToken
You will also be able to withdraw your assets from destination chain to source chain (the chain from where you sent tokens earlier) using cBridge's `Burn Canonical Token` method. It's a method in which your assets get burnt at source_chain ( the chain from where you're withdrawing your assets) and released on destination_chain (the chain on which you want to receive you withdrawn assets).


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
  * `WALLET_ADDRESS` - `string` address key of your account
  * `PRIVATE_KEY` - `string` private key of your account
  * `SRC_CHAIN_ID` - `number` chain ID of source-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `DST_CHAIN_ID` - `number` chain ID of destination-chain. From [here](https://chainlist.org) you can get the chain ID of your source-chain
  * `TOKEN_SYMBOL` - `string` Pegged token address on the pegged chain
  * `AMOUNT` - `string` `amount` of token, you want to move from source to destination chain Ex: 1 USDC
  * `CONFIRMATIONS` - `number` set the number of Blocks confirmations you want a transaction should achieve before considering it mined. Provie Max value of source and destination chain confirmations.

#### Result
Promise `burnId` - `string` burn id to track the status or refund transaction if stuck

#### Example
```typescript
let BridgeSDK = require("@klaytn/kss-bridges-celer");

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
```

### 3.1. Refund burnCanonicalToken
Due to any reason if your funds / assets were not released on destination_chain, don't worry you can get them back on source_chain by submitting refund request.

```typescript
BridgeSDK.burnCanonicalTokenRefund(transferObj)
```

#### Parameters
`Object` - `transferObj`
  * `CBRIDGE_GATEWAY_URL` - `string` From [here](https://cbridge-docs.celer.network/developer/cbridge-sdk#cbridge-testnet-endpoint) you can get Testnet & Mainnet cBridge's Gateway URLs.
  * `WALLET_ADDRESS` - `string` address key of your wallet account
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
let BridgeSDK = require("@klaytn/kss-bridges-celer");

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
