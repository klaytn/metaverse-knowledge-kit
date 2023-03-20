---
title: 🔮 Oracle Starter Kit
sidebar_label: Oracle Starter Kit
---

# 🔮Oracle Starter Kit

:::tip

Check this out to learn some basics about [Decentralized Oracle](../decentralized-storage/overview.md).

:::

## Overview

Oracle Starter Kit is integrated with `Witnet` services. This is a hardhat project containing oracle contracts and scripts implementing 3 features :

- Price Feeds
- VRF
- External API Calls

It also has a command line interface to initialize a sample project and interact with the deployed contract. Follow the below steps to use Oracle starter kit and get off-chain data to your dapp.

## Installation

```typescript
npm install -g @klaytn/kss-cli --force
```

The above command installs the cli package for Klaytn service sdk globally, so that we can use oracle-starter-kit

## Quick Usage

For a default set of contracts and tests, run the following within the required project directory:

```typescript
> kss-cli oracle init
> cd oracle-starter-kit
> npm install --force
```

Above commands downloads the `oracle-starter-kit` folder structure in the current project directory. Enter inside the generated folder and install the packages as mentioned

Next, follow the below steps to compile and deploy contracts to the Klaytn network and run their associated unit tests.

## Setup hardhat configurations

### 1. Connect to Klaytn Test Network (Baobab)

The default hardhat configurations can be modified in `helper-hardhat-config.json`. By default it connects to Klaytn test network (Boabab)

Hardhat configuration variables can be found in [`helper-hardhat-config.json`](https://github.com/klaytn/klaytn-service-sdk/blob/main/packages/oracles-starter-kit/helper-hardhat-config.js) in the root directory. Below is the configuration explaination for `1001` network.

- `name` - hardhat network name Ex: `baobab`
- `witnetPriceRouter` - witnetPriceRouter Address Ex: `0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0` for Klaytn Testnet. See [WitnetPriceRouter](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds#klaytn-baobab) for reference.
- `witnetRandomness` - witnetRandomness Address. Ex: `0xb4b2e2e00e9d6e5490d55623e4f403ec84c6d33f` for Klaytn Testnet. See [WitnetRandomness Contract Addresses](https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/contract-addresses#klaytn) for reference.

### 2. Environment Variables

We will need to set environment variables by following below steps

1. copy `.env.example` file and rename to `.env`
2. Modify environment variables. Below is the explaination of each variable

- `BAOBAB_RPC_URL` - `string` https://api.baobab.klaytn.net:8651/ can be used. its the rpc url of blockchain.
- `PRIVATE_KEY` - `string` This is private key from wallet, ie [MetaMask](https://metamask.io/). This is required for deploying contracts to public networks.

:::caution

MAKE SURE YOU DON'T EXPOSE THE KEYS YOU PUT IN THIS `.env` FILE

:::

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

Get some Baobab Testnet KLAY and LINK

> Go to the [Klaytn faucets](https://baobab.wallet.klaytn.foundation/faucet) to get some KLAY to configured account.

## Deploy contracts

You should now be all setup! You can run any method now! Since we configured the environment variables and hardhat configurations so you don't really need to pass any configurations.

To compile contracts

```
npx hardhat compile
```

To deploy a specific contracts

```
npx hardhat deploy 01_Deploy_PriceConsumerV3.js --network baobab
```

To deploy all contracts

```
npx hardhat deploy --network baobab
```

To run tests

```
npm run test
```

## Interacting with Deployed Contracts

After deploying your contracts, the deployment output will give you the contract addresses as they are deployed.You can then use these contract addresses in conjunction with Hardhat tasks to perform operations on each contract.

### Witnet Price Feeds

The Witnet Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract.

```bash
  npx hardhat read-witnet-price-feed --contract <deployedContractAddress> --id <id> --network baobab
```

#### Parameters

`deployedContractAddress` - `string` Deployed WitnetPriceFeed contract address
`id` - `string` id4 is the witnet pricefeed ID. Ex: `0x6cc828d1` for Price-KLAY/USD-6. See [Klaytn Witnet PriceFeeds](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds#klaytn-baobab) for reference.

#### Returns

- `price` - price of KLAY/USD.

#### Example

```typescript
  // As at the time of writing this document, 1 KLAY = 0.23 USD
  npx hardhat read-witnet-price-feed --contract 0x573AAAdF4Cf117586e74AE3845473fc65cd59C4c --id 0x6cc828d1 --network baobab

  /*
    Last price is: 237467
  */
```

Check out [witnet documentation](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds#klaytn-baobab) for other available price feeds for Klaytn Network.

### Witnet Randomness

The Witnet Randomness has 4 tasks.
Make sure the deployWitnetRandomNumber method successful execution.

> This 2-step process preserves unpredictability of the random numbers that you get because it guarantees that the number is derived from a seed that was generated only after the request was sent.

> **_NOTE:_** Initially 1 and 2nd step has to be completed sequentially. Only after that 3rd or 4th can be executed for fetching a random number.

#### 1. Request new randomness

Requesting the new randomness.
Once the the request to new randomness is performed successfully. The other tasks can be performed after transaction submission.

```bash
  npx hardhat request-witnet-randomness --contract <deployedContractAddress> --value <value> --network baobab
```

#### Parameters

`deployedContractAddress` - `string` Deployed Deployed Witnet RandomNumber contract address
`value` - `number` Value for transaction cost when requesting random numbers. Ex: 500000000000000000 i.e, 0.5 KLAY

##### Returns

- `transaction hash` - Transaction hash

##### Example

```typescript
npx hardhat request-witnet-randomness --contract 0x8937C127F3060fF8a23E9a0fb5AEA10bc30e28be --value 500000000000000000 --network baobab
  /*
    Transaction Hash: 0x809addb235dc953c90a563c396c11978a359b574336564c7ec890514c961e050
  */
```

#### 2. Fetch Witnet random number

Initiate fetch witnet random number transaction.

> **WARNING**:
> Calling `fetch-witnet-random-number` right after `request-witnet-randomness` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete

```bash
  npx hardhat fetch-witnet-random-number --contract <deployedContractAddress> --network baobab
```

#### Parameters

`deployedContractAddress` - `string` Deployed Witnet RandomNumber contract address

##### Returns

- `transaction hash` - Transaction hash

##### Example

```typescript
  npx hardhat fetch-witnet-random-number --contract 0x8937C127F3060fF8a23E9a0fb5AEA10bc30e28be --network baobab
  /*
    Transaction Hash: 0x0eb8fe1217ecdc3860009bc49f5319cab6ffdedd80877c39df02899a3542db24'
  */
```

#### 3. Get the latest randomizing block

```bash
  npx hardhat read-latest-randomizing-block --contract <deployedContractAddress> --network baobab
```

#### Parameters

`deployedContractAddress` - `string` Deployed Witnet RandomNumber contract address

##### Returns

- `randomizingBlock` - randomized block value

##### Example

```typescript
  npx hardhat read-latest-randomizing-block --contract 0x8937C127F3060fF8a23E9a0fb5AEA10bc30e28be --network baobab
  /*
    The latest randomizing block is: 113690138
  */
```

#### 4. Get the generated random number

fetches the generated random number

> **_NOTE:_** Make sure first 2 steps are executed sequentially.

```bash
  npx hardhat read-witnet-random-number --contract <deployedContractAddress> --network baobab
```

#### Parameters

`deployedContractAddress` - `string` Deployed Witnet RandomNumber contract address

##### Returns

- `randomNumber` - generated random number

##### Example

```typescript
  npx hardhat read-witnet-random-number --contract 0x8937C127F3060fF8a23E9a0fb5AEA10bc30e28be --network baobab
  /*
    Random Number is: 1392104028
  */
```

### Witnet Web Oracle Request

We have 2 examples for Witnet HTTP Request:

- KlayPrice: a GET request example to get Klay token price in USD
- postRequestExample: a POST request example echoes back any data and headers that you send in your POST requests (based on this [tutorial](https://docs.witnet.io/smart-contracts/witnet-web-oracle/make-a-post-request))

Inside `witnet-queries` folder you will find predefined Witnet oracle queries.

You can follow this [link](https://docs.witnet.io/smart-contracts/witnet-web-oracle/make-a-get-request) to learn how to create other queries.

#### Compile the Witnet queries into Solidity contracts

```
npx rad2sol --target ./witnet-queries --write-contracts ./contracts/witnet-requests
```

##### Example

```
  npx rad2sol --target ./witnet-queries --write-contracts ./contracts/witnet-requests
```

#### Execute Witnet Queries

After the contracts have been created, you can query locally to preview the result by running:

```
npx witnet-toolkit try-query --from-solidity ./contracts/witnet-requests/<contractFileName>
```

##### Parameters

`contractFileName` - `string` generatedSolFileName

##### Returns

- `Result` - `string`

##### Example 1 - Fetch Coinprice

```typescript
  // 1 KLAY = 0.19 USD. Divide the return value by 10^6 to get actual coin price result.
  npx witnet-toolkit try-query --from-solidity ./contracts/witnet-requests/coinPrice.sol
  /*
    Result: 195467
  */
```

##### Example 2 - Post Request

```typescript
  // Gets parsed data of headers.Header-Name from the post api
  npx witnet-toolkit try-query --from-solidity ./contracts/witnet-requests/postAPI.sol
  /*
    Result: "Header-Value"
  */
```

> **_NOTE:_** If above tryWitnetQueries is stuck, please try to run command shown in below snapshot `npx witnet-toolkit`, install the binary once in the machine and retry above method
> ![WitnetToolkitBinary](/images/witnet/witnet.png)

## Reference Docs

- [Witnet Documentation](https://docs.witnet.io/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
