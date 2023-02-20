---
title: 💱 Dex Starter Kit
sidebar_label: Dex Starter Kit
---

## Overview
A decentralized exchange (or DEX) is a peer-to-peer marketplace where transactions occur directly between crypto traders. Klaytn has an opensource code for the Dex infrastructure containing features like fungible token swapping, staking and liquidity provision, token-based governance, and token minting.

This sdk includes the integration of [@klaytn/dex-contracts](https://github.com/klaytn/klaytn-dex-contracts/blob/dev/docs/dex-specification.md) in the starter kit to execute all the admin functionalities and basic user operations via the sdk. 

Below are the features available for DEX admin and user as part of this sdk. 

**Admin Functionalities**
* Once the dex is deployed the ownership is transferred to a multisig contract. All the admin related smart contract functions can only be called by the multisig contract. 

**User Functionalities**
* Swap
* Stake 
* Add Liquidity 
* Remove Liquidity 

### Installation
To install the `kds-dex` package, run the following command in your terminal.

  `npm install @klaytn/kds-dexs --save`

Follow the below steps to try out the above features using the sdk.

### Prerequisites
In order to execute the functions, the dex-contracts needs to be deployed either in Cypress or Baobab network. You can either deploy the contracts [here](https://github.com/klaytn/klaytn-dex-contracts) or use the deployed contracts in [Baobab](https://github.com/klaytn/klaytn-dex-contracts/tree/dev/deployments). 

Also, make sure to fulfill the following prerequisites
1. You must have enough supply of KLAY & other utility tokens to execute all the functions
2. Deployment of the following DEX contracts on Klaytn Mainnet OR Testnet is required. ([Ref](https://github.com/klaytn/klaytn-dex-contracts/blob/dev/README.md))
   - DexFactory
   - DexRouter
   - DexToken
   - MultiSigWallet
   - Farming
   - StakingFactory
   - WKLAY
   - Some [KIP7](https://kips.klaytn.foundation/KIPs/kip-7) and [ERC20](https://eips.ethereum.org/EIPS/eip-20) utility tokens.
4. if you just want to get already deployed DEX & util contracts, please check it out [here](https://github.com/klaytn/klaytn-dex-frontend/blob/dev/dex-config.example.json).

Here is a [list](./dex_contracts.json) of addresses which is already deployed in Baobab with MultiSig contract as owner. Its recommended to deploy your own contracts in Baobab for testing to execute all the functions as the privateKey used to deploy the contracts is different. 

### Usage
You can simply import the desired modules into your script & run it, for more details on how to import each module please refer to the relevant section below. 

#### 1. Config Module
Config module can be used to initalize contracts and get contract instances to interact with dex contracts. You can initilize the below contracts using Config module. 
* initDex - returns the router and factory contract instance. 
* initFarming - returns the Farming contract instance. Using this instance you can interact with Farming contract functions.
* initStaking - returns the Staking contract instance. Using this instance you can interact with Staking contract functions.
* initMultiSig - returns the MultiSig contract instance. Using this instance you can execute functions in  MultiSig contract. 

##### Example
In the below example, we are going to initDex and get the router and factory contract instances. Similary you can use other functions defined in the module

```js
import {Config} from '@klaytn/kds-dexs';

let routerAddress = "0x5867c40175a45b080abad03f19131cfa9569287b";
let factoryAddress = "0x6b9b434e6e6a381304b0eace93894f1b649637bf";
let privKey = "your private key";
let rpcURL = "https://public-node-api.klaytnapi.com/v1/baobab";

let tokenA = "0xbb3273dc4cac595afb93559c3aa07e9e6a554fc0";
let tokenB = "0xae33ac5c631b80757a0cf1395d1ce18f3eaa46c9";

async function main() {
    // Create a new instance of Config class
    const config = new Config();
    // Initialize the router and factory objects
    const [factory, router] = config.initDex(routerAddress, factoryAddress, privKey, rpcURL);
    // Call the getPair function to get the pair object
    const pair = await config.getPair(factory, tokenA, tokenB, privKey, rpcURL);
    // Use the pair object as required
    console.log(pair.address);
}

main();
```

#### 2. Farming
Farming module can be used to manage the farming operations with LP tokens.You can execute the below functions using the farming module 

* deposit - Deposit the specified amount of LP tokens to the specified pool.
* withdraw - Withdraw the specified amount of LP tokens from the specified pool
* emergencyWithdraw - 	Withdraw LP tokens from the specified pool without receiving the reward

##### Example
In the below example, we are going to deposit tokens to a pool based on the PoolId. Similary you can use other functions defined in the module

```js
import {Farming} from '@klaytn/kds-dexs';

let farmingAddress = "0xf68b8d3fae7feb747cb4dce0a4c91a100b140245";
let privKey = "your private key";
let rpcURL = "https://public-node-api.klaytnapi.com/v1/baobab";

async function main() {
    // Create a new instance of Farming 
    const farming = new Farming(farmingAddress, privKey, rpcURL);
    // deposit to the pool using poolId
    const tx = await farming.deposit("1", "100000000000000000000")
    console.log(tx);
}

main();
```
#### 3. Staking
Staking module can be used for long-term staking which allows users to stake the Dex token and earn other tokens as rewards.You can execute the below functions using the Staking module 

* deposit - Deposit given amount of Staked Token in given Staking Pool contract
* withdraw - Withdraw Staked tokens from given Staking pool contract
* emergencyWithdraw - Emergency withdraw funds from given Staking Pool contract.

##### Example
In the below example, we are going to stake a KIP7 token using Staking module. Similary you can use other functions defined in the module

```js
import {Staking} from '@klaytn/kds-dexs';

let routerAddress = "0x5867c40175a45b080abad03f19131cfa9569287b";
let privKey = "your private key";
let rpcURL = "https://public-node-api.klaytnapi.com/v1/baobab";

async function main() {
    // Create a new instance of Staking 
    const staking = new Staking(routerAddress, privKey, rpcURL);
    // deposit the amount of the KIP7 token (stakedToken) going to be staked. 
    // Make sure the address has enough KIP7 token to stake
    const txReceipt = await staking.deposit("100000000000000000000")
    console.log(txReceipt);
}

main();
```

#### 4. Swap
Swap module can be used to trade one ERC-20 or KIP7 token for another. Each pair of tokens on Dex is underpinned by a liquidity pool. There are multiple functions for swapping tokens for different kinds of swap operations. You can swap tokens using the below functions in the Swap module 

* exactTokensForTokens - function to swap exact amount of Tokens for a given amount of Tokens.
* tokensForExactTokens - function to swap given amount of Tokens for exact amount of KLAYs.
* exactKlayForTokens - function to swap exact amount of KLAY for a given amount of Tokens.
* tokensForExactKlay - function to swap given amount of Tokens for exact amount of KLAYs.
* exactTokensForKlay - function to swap exact amount of Tokens for a given amount of KLAY.
* klayForExactTokens - function to swap KLAYs for a given exact amount of Tokens.

##### Example
In the below example, we are going to Swap exactKlayForTokens using Swap module. Similary you can use other functions defined in the module

```js
import {Swap} from '@klaytn/kds-dexs';

let routerAddress = "0x5867c40175a45b080abad03f19131cfa9569287b";
let factoryAddress = "0x6b9b434e6e6a381304b0eace93894f1b649637bf";
let privKey = "your private key";
let rpcURL = "https://public-node-api.klaytnapi.com/v1/baobab";

async function main() {
    const path = ['0x1234567890123456789012345678901234567890', '0x2345678901234567890123456789012345678901'];
    const amountIn = '100';
    const amountDesiredOut = '200';
    const deadline = '1500000000000';

    // Create a new instance of Swapping 
    const swap = new Swap(routerAddress, factoryAddress, privKey, rpcURL);

    // **swap exact amount of KLAY for a given amount of Tokens.**
    // amountIn - amount of WKLAY tokens to be swapped
    // amountOut - min amount of out Token expexting to be received. 
    // path - a pair of tokens address, path[0] should be the address of WKLAY & path[1] should be the address of out Token.
    // deadline - UTC timestamp as deadline of this transaction, once deadline passed on-chain transaction should be reverted.
    const txReceipt = await swap.exactKlayForTokens(amountIn, amountOut, path, deadline.toString())
    console.log(txReceipt);
}

main();
```

#### 5. Multisig
Multisig module can be used to submit and confirm proposals. After a certain number of signers confirmed an operation, it can be executed. After the specified condition is met, i.e. the number of signers that confirmed an operation is greater than min_required, the proposal is executed automatically during confirmTransaction function call. In case of a fail, the proposal could also be executed manually.

You can follow the below steps to execute or call any method using multisig contract using MultiSig module. 

##### Example
In the below example, lets create a new LP farming pool using multisig contract. In order to do that, 
1. First, you need to get the encoded raw transaction data of the add method in Farming contract along with the parameters. [Ref](https://github.com/klaytn/klaytn-developer-sdk/blob/main/packages/dexs-starter-kit/core/Farming.ts#L88)
2. Call submitTransaction method from multisig contract to add pool. 
3. Get confirmation from other owners to execute the transaction.
4. Call confirmAndExecuteTransaction from multisig contract with TxnId. 

```js
let farmingAddress = "0xf68b8d3fae7feb747cb4dce0a4c91a100b140245";
let multisigAddress = "0x3ffc81a526f44f79ed1b5634c3e3e694494dbd68";
let privKey = "your private key";
let rpcURL = "https://public-node-api.klaytnapi.com/v1/baobab";

async function main() {
    let allocPoint = 1000; //Number of allocation points for the new pool.
    let lpToken = "0x0e306ae748969fd982fa2e29c3a20cbc9e6a6131"; //Address of the LP KIP7 token.
    let bonusMultiplier = 1; //The pool reward multipler.
    let bonusEndBlock = 107086447; //The block number after which the pool doesn't get any reward bonus from `bonusMultiplier`.
    let value = 0; //KLAY amount to send in wei (if no value to send pass 0).

    // Create a new instance of Farming 
    const farming = new Farming(farmingAddress, privKey, rpcURL);
    // Create a new instance of Multisig contract 
    const multisig = new Multisig(multisigAddress, privKey, rpcURL);
    //Get the encoded raw txn for to create a new farming pool
    const data = await farming.add(allocPoint, lpToken, bonusMultiplier, bonusEndBlock)

    //call submitTransaction to add pool - This can be executed by mulitple owners to vote for the transaction 
    const txn = await multisig.submitTransaction(farmingAddress, value, data);

    //Call confirmAndExecuteTransaction with the txnId to vote & execute the transaction (if it has received enough votes).
    const txReceipt = await multisig.confirmAndExecuteTransaction(2);
    console.log(txReceipt);
}

main();
```

Similary you can use other functions defined in the module.

:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::


