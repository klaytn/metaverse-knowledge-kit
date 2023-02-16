---
title: 💱 Dex Starter Kit
sidebar_label: Dex Starter Kit
---

# 💱 Dex starter kit
A decentralized exchange (or DEX) is a peer-to-peer marketplace where transactions occur directly between crypto traders.
Klaytn has an opensource Dex infrastructure containing features like fungible token swapping, staking and liquidity provision, token-based governance, and token minting.

This module of Klaytn-SDK includes the integration of [@klaytn/dex-contracts](https://github.com/klaytn/klaytn-dex-contracts).

## Installation
  `npm install @klaytn-developer-sdk/dexs --save`

## Prerequisites

In order to execute the given use-cases or the core modules of this package, make sure you
fulfill the following prerequisites
1. You must have enough supply of KLAY & other utility tokens being explained below
2. Following DEX contracts should be already deployed on Klaytn Mainnet OR Testnet
   - DexFactory
   - DexRouter
   - MultiSigWallet
   - PlatformToken
   - Farming
   - StakingFactory
   - Some `KIP7` utility tokens e.g. atleast 3,4 Token contracts
3. if you don't have already deployed the contracts, please deploy them using [this](https://github.com/klaytn/klaytn-dex-contracts/blob/dev/README.md) documentation
4. if you need more details about flow of each above-mentioned DEX contracts please refer to `@klaytn/dex-contracts` repository [here](https://github.com/klaytn/klaytn-dex-contracts/blob/dev/docs/dex-specification.md)
5. if you just want to get already deployed DEX & util contracts, please check it out [here](https://github.com/klaytn/klaytn-dex-frontend/blob/dev/dex-config.example.json).

## Usage

### How to import the core
You can simply import the desired `core` modules into your script & run it, for more details on how to import each `core` module please refer to the relevant
**core**'s section below

> **_NOTE:_** Make sure you've read the `Prerequisites` section to ensure that you've all the required information for each **core**'s module. To understand what information particular **core**'s module requires.

#### Liquidity
```js
import { addLiquidity } from '@klaytn-developer-sdk/dexs/core'
```
#### Swap
```js
import { Swap } from '@klaytn-developer-sdk/dexs/core'
```
#### Farming
```js
import { Farming } from '@klaytn-developer-sdk/dexs/core'
```
#### Staking
```js
import { Staking } from '@klaytn-developer-sdk/dexs/core'
```
#### Multisig
```js
import { Multisig } from '@klaytn-developer-sdk/dexs/core'
```
#### Config
```js
import { Config } from '@klaytn-developer-sdk/dexs/core'
```

### How to import the use-cases
You can simply import the desired use-case into your script & run it, for more details on how to import the use-case please refer to the relevant use-case's section below

> **_NOTE:_** Make sure you've read the `Prerequisites` section to ensure that you've all the required information for each use-case. To understand what information particular use-case requires, please refer to its code-level documentation.

#### Liquidity
##### 1. addLiquidity
```js
import { addLiquidity } from '@klaytn-developer-sdk/dexs'
```
##### 2. addLiquidityWithKlay
```js
import { addLiquidityWithKlay } from '@klaytn-developer-sdk/dexs'
```
##### 3. removeLiquidity
```js
import { removeLiquidity } from '@klaytn-developer-sdk/dexs'
```
##### 4. removeLiquidityWithKlay
```js
import { removeLiquidityWithKlay } from '@klaytn-developer-sdk/dexs'
```

#### Swap
##### 1. swapExactTokensForTokens
```js
import { swapExactTokensForTokens } from '@klaytn-developer-sdk/dexs'
```
##### 2. swapTokensForExactTokens
```js
import { swapTokensForExactTokens } from '@klaytn-developer-sdk/dexs'
```
##### 3. swapExactKlayForTokens
```js
import { swapExactKlayForTokens } from '@klaytn-developer-sdk/dexs'
```
##### 4. swapTokensForExactKlay
```js
import { swapTokensForExactKlay } from '@klaytn-developer-sdk/dexs'
```
##### 5. swapExactTokensForKlay
```js
import { swapExactTokensForKlay } from '@klaytn-developer-sdk/dexs'
```
##### 6. swapKlayForExactTokens
```js
import { swapKlayForExactTokens } from '@klaytn-developer-sdk/dexs'
```

#### Farming
##### 1. addPool
```js
import { addPool } from '@klaytn-developer-sdk/dexs'
```
##### 2. minterRole
```js
import { minterRole } from '@klaytn-developer-sdk/dexs'
```
##### 3. setPool
```js
import { setPool } from '@klaytn-developer-sdk/dexs'
```
##### 4. updateRewardPerBlock
```js
import { updateRewardPerBlock } from '@klaytn-developer-sdk/dexs'
```
##### 5. updateMultiplier
```js
import { updateMultiplier } from '@klaytn-developer-sdk/dexs'
```
##### 6. deposit
```js
import { deposit } from '@klaytn-developer-sdk/dexs'
```
##### 7. withdraw
```js
import { withdraw } from '@klaytn-developer-sdk/dexs'
```
##### 8. emergencyWithdraw
```js
import { emergencyWithdraw } from '@klaytn-developer-sdk/dexs'
```

#### Multisig
##### 1. submitTransaction
```js
import { submitTransaction } from '@klaytn-developer-sdk/dexs'
```
##### 2. confirmAndExecuteTransaction
```js
import { confirmAndExecuteTransaction } from '@klaytn-developer-sdk/dexs'
```
##### 3. executeTransaction
```js
import { executeTransaction } from '@klaytn-developer-sdk/dexs'
```
##### 4. revokeConfirmation
```js
import { revokeConfirmation } from '@klaytn-developer-sdk/dexs'
```

#### Staking
#### 1. deployPool
```js
import { deployPool } from '@klaytn-developer-sdk/dexs'
```
##### 2. updatePoolLimit
```js
import { updatePoolLimit } from '@klaytn-developer-sdk/dexs'
```
##### 3. stopReward
```js
import { stopReward } from '@klaytn-developer-sdk/dexs'
```
##### 4. updateReward
```js
import { updateReward } from '@klaytn-developer-sdk/dexs'
```
##### 5. updateStartAndEndBlocks
```js
import { updateStartAndEndBlocks } from '@klaytn-developer-sdk/dexs'
```
##### 6. recoverToken
```js
import { recoverToken } from '@klaytn-developer-sdk/dexs'
```
##### 7. emergencyRewardWithdraw
```js
import { emergencyRewardWithdraw } from '@klaytn-developer-sdk/dexs'
```
##### 8. deposit
```js
import { deposit } from '@klaytn-developer-sdk/dexs'
```
##### 9. withdraw
```js
import { withdraw } from '@klaytn-developer-sdk/dexs'
```
##### 10. emergencyWithdraw
```js
import { emergencyWithdraw } from '@klaytn-developer-sdk/dexs'
```

> **_NOTE:_** Make sure you've read the `Prerequisite` section to ensure that you've all the required information for each use-case.


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::


