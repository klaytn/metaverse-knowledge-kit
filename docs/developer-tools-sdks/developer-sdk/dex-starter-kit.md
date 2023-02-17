---
title: 💱 Dex Starter Kit
sidebar_label: Dex Starter Kit
---

# 💱 Dex starter kit
A decentralized exchange (or DEX) is a peer-to-peer marketplace where transactions occur directly between crypto traders.
Klaytn has an opensource Dex infrastructure containing features like fungible token swapping, staking and liquidity provision, token-based governance, and token minting.

This module of Klaytn-SDK includes the integration of [@klaytn/dex-contracts](https://github.com/klaytn/klaytn-dex-contracts).

## Installation
  `npm install @klaytn/kds-dexs --save`

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
import { addLiquidity } from '@klaytn/kds-dexs/core'
```
#### Swap
```js
import { Swap } from '@klaytn/kds-dexs/core'
```
#### Farming
```js
import { Farming } from '@klaytn/kds-dexs/core'
```
#### Staking
```js
import { Staking } from '@klaytn/kds-dexs/core'
```
#### Multisig
```js
import { Multisig } from '@klaytn/kds-dexs/core'
```
#### Config
```js
import { Config } from '@klaytn/kds-dexs/core'
```
> **_NOTE:_** Make sure you've read the `Prerequisite` section to ensure that you've all the required information for each use-case.


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::


