---
title: 🔮 Oracle Starter Kit
sidebar_label: Oracle Starter Kit
---

# 🔮Oracle Starter Kit
:::tip

Check this out to learn some basics about [Decentralized Oracle](../../decentralized-storage/overview.md).

:::

## Overview

Oracle Starter Kit is integrated with `Chainlink` and `Witnet` services. This is a hardhat project containing oracle contracts and scripts implementing 3 features : 
- Price Feeds
- VRF
- External API Calls

It also has a command line interface to initialize a sample project and interact with the deployed contract. Follow the below steps to use Oracle starter kit and get off-chain data to your dapp. 

## Installation

```typescript
npm install -g @klaytn/kds-cli --force
```
The above command installs the cli package for Klaytn developer sdk globally, so that we can use oracle-starter-kit 

## Quick Usage
For a default set of contracts and tests, run the following within the required project directory:

```typescript
> kds-cli oracle init
> cd oracle-starter-kit
> npm install --force
```

Above commands downloads the `oracle-starter-kit` folder structure in the current project directory. Enter inside the generated folder and install the packages as mentioned

Next, follow the below steps to compile and deploy contracts to the Klaytn network and run their associated unit tests.

## Setup hardhat configurations
### 1. Connect to Klaytn Test Network (Baobab)
The default hardhat configurations can be modified in `helper-hardhat-config.json`. By default it connects to Klaytn test network (Boabab)

Hardhat configuration variables can be found in [`helper-hardhat-config.json`](https://github.com/klaytn/klaytn-developer-sdk/blob/main/packages/oracles-starter-kit/helper-hardhat-config.js) in the root directory. Below is the configuration explaination for `1001` network.

  * `name` - hardhat network name Ex: `baobab`
  * `linkToken` - chainlink linktoken address. see [Link Token Address](https://docs.chain.link/vrf/v2/subscription/supported-networks/) for reference.
  * `keyHash` - chainlink keyHash. see [KeyHash Configurations](https://docs.chain.link/vrf/v2/subscription/supported-networks/) for reference.
  * `chainLinkPriceFeed` - chainlink pricefeed address for contract deployment. Ex: `0xf49f81b3d2F2a79b706621FA2D5934136352140c`. see [Chainlink Pricefeed Addresses](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=klaytn) for reference.
  * `oracle` - chainlink oracle contract address. see [Klaytn Operator Contracts](https://docs.chain.link/any-api/testnet-oracles/#examples) for reference.
  * `jobId` - chainlink jobId. Ex: `ca98366cc7314957b8c012c72f05aeeb`. see [Chainlink JobID's](https://docs.chain.link/any-api/testnet-oracles/#jobs) for reference.
  * `vrfCoordinator` - vrfCoordinator. see [VRF Coordinator](https://docs.chain.link/vrf/v2/subscription/supported-networks/) for reference.
  * `witnetPriceRouter` - witnetPriceRouter Address Ex: `0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0` for Klaytn Testnet. See [WitnetPriceRouter](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds#klaytn-baobab) for reference.
  * `witnetRandomness` - witnetRandomness Address. Ex: `0xb4b2e2e00e9d6e5490d55623e4f403ec84c6d33f` for Klaytn Testnet. See [WitnetRandomness Contract Addresses](https://docs.witnet.io/smart-contracts/witnet-randomness-oracle/contract-addresses#klaytn) for reference.
  * `fee` - fee
  * `fundAmount` - fundAmount
  
### 2. Environment Variables
We will need to set environment variables by following below steps 
1. copy `.env.example` file and rename to `.env`
2. Modify environment variables. Below is the explaination of each variable
  * `BAOBAB_RPC_URL` - `string` https://api.baobab.klaytn.net:8651/ can be used. its the rpc url of blockchain.
  * `PRIVATE_KEY` - `string` This is private key from wallet, ie [MetaMask](https://metamask.io/). This is required for deploying contracts to public networks. 
  * `AUTO_FUND` - `boolean` provide true, if needs to autofund
  * `VRF_SUBSCRIPTION_ID` - `number` VRF Subscription id. Head over to [VRF Subscription Page](https://vrf.chain.link/klaytn-testnet) and create the new subscription.

:::caution

MAKE SURE YOU DON'T EXPOSE THE KEYS YOU PUT IN THIS `.env` FILE

:::

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

Get some Baobab Testnet KLAY and LINK 
> Go to the [Klaytn faucets](https://baobab.wallet.klaytn.foundation/faucet) to get some KLAY to configured account.
Head over to the [Chainlink faucets](https://faucets.chain.link/) and get some LINK to configured private key account. Please follow [the chainlink documentation](https://docs.chain.link/docs/acquire-link/) if unfamiliar. 

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

### Chainlink Price Feeds
The Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract

```bash
npx hardhat read-price-feed --contract <deployedContractAddress> --network baobab
```

#### Parameters
`deployedContractAddress` - `string` Deployed Price feed consumer contract.

#### Returns
  * `price` - price

#### Example
```
  npx hardhat read-price-feed --contract 0x6883956A235f8b823d547575812B08F4a720D76A --network baobab

  // By default it returns LINK/KLAY price feed value. At the time of writing this document, 1 LINK = 32.9 KLAY
  /*
    Price is: 32915338976573950000
  */
```

### Change Chainlink price feed address
The price feed address used while deployment can be changed using below method. You can also change the price feed directly in the smart contracts, compile and deploy it for a different pair. Check [here](https://docs.chain.link/data-feeds/price-feeds/addresses?network=klaytn#Klaytn%20Baobab%20testnet) to see the available price feed pairs in chainlink. 

```bash
npx hardhat change-price-feed --contract <deployedContractAddress> --pricefeedaddress <pricefeedAddress> --network baobab
```

#### Parameters
`deployedContractAddress` - `string` Deployed Price feed consumer contract.
`pricefeedAddress` - `string` pricefeed address. see [Klaytn Pricefeed Addresses](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=klaytn) for reference.

#### Returns
  * `transaction hash` - `string` transaction hash

#### Example
```typescript
  // Change pricefeedaddress to WEMIX/USD 0x76Aa17dCda9E8529149E76e9ffaE4aD1C4AD701B price feed contract. 1 WEMIX = 0.8 USD at the time of writing this document.
  npx hardhat change-price-feed --contract 0x6883956A235f8b823d547575812B08F4a720D76A --pricefeedaddress 0x76Aa17dCda9E8529149E76e9ffaE4aD1C4AD701B --network baobab
  /*
    Transaction Hash: 0x0741df94b257a29f73ff4b94d2f0d5cd91dae20f2bc9946dd00a954905d85936
  */

  npx hardhat read-price-feed --contract 0x6883956A235f8b823d547575812B08F4a720D76A --network baobab
  /*
    Price is: 800625678041836600
  */
```

### Chainlink Request & Receive Data
The APIConsumer contract has two tasks, one to request external data based on a set of parameters, and one to check to see what the result of the data request is. 
Currently fetches the volume24hour data from https://min-api.cryptocompare.com/data/pricemultifull?fsyms=KLAY&tsyms=USD.

#### Fund ChainLinkAPI contract
This chainLinkApiData contract needs to be funded with `link` tokens first.

```bash
npx hardhat fund-link --contract <deployedContractAddress> --network baobab
```

#### Parameters
`deployedContractAddress` - `string` Deployed API consumer contract.

##### Returns
  * `transaction hash` - `string` transaction hash

> **WARNING**: `chainlink-plugin-fund-link` have not supported `baobab network`. You have to fund `link` tokens manually to the deployed chainLinkApiData contract. Get deployed contracts list using `console.log(OracleSDK.readDeployedContracts())` method.

#### Request ChainLinkAPI Data
Once the deployed chainlinkAPI contract it's funded with `link` tokens, you can request external data by passing in a number of parameters to the request-data task. 

```bash
npx hardhat request-data --contract <deployedContractAddress> --coinsymbol <coinsymbol> --coindecimals <coindecimals> --network baobab
```
##### Parameters
1. `deployedContractAddress` - `string` Deployed API consumer contract.
2. `coinsymbol` - `string` coinsymbol. see [Coin Symbols](https://min-api.cryptocompare.com) for reference.
3. `coindecimals` - `number` coin supported decimals. Ex: 18 for KLAY

##### Returns
  * `transaction hash` - `string` transaction hash

##### Example
```typescript
  npx hardhat request-data --contract 0xddDC43f1ae46757C94Ec6dCDAa7E9b6738e0db0b --coinsymbol KLAY --coindecimals 18 --network baobab

  /*
    Transaction Hash: 0xe8f3d600a4789d16b0a0a9a739d67bbefcb088aebbc038687c4c9e7b1d56373a
  */
```
#### Receive ChainLinkAPI Data
Once you have successfully made a request for external data, you can see the result via the read-data task. it retrives VOLUME24 from https://min-api.cryptocompare.com/data/pricemultifull?fsyms=KLAY&tsyms=USD from the contract

```bash
npx hardhat read-data --contract <deployedContractAddress> --network baobab
```

##### Parameters
1. `deployedContractAddress` - `string` Deployed API consumer contract.

##### Returns
  * `data` - `string` Receives `volume24` data without decimals

##### Example
```typescript
  // Receives volume24 from RAW.KLAY.USD.VOLUME24HOUR in "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=KLAY&tsyms=USD" result without decimals
  npx hardhat read-data --contract 0xddDC43f1ae46757C94Ec6dCDAa7E9b6738e0db0b  --network baobab

  /*
    Data is: 76993244391264860000000000
  */
```

You can configure any API by replacing the default API in the smart contracts and parse the output to receive the required result. 

### Chainlink Generate random number
The VRFConsumer contract has two tasks, one to request a random number, and one to read the result of the random number request.

#### Prerequisite
To start, go to [VRF Subscription Page](https://vrf.chain.link/klaytn-testnet) and create the new subscription. Save your subscription ID and put it in  `.env` file as `VRF_SUBSCRIPTION_ID`:

```bash
  VRF_SUBSCRIPTION_ID=subscription_id
```

Then, deploy your VRF V2 contract consumer(if its not deployed already with the subscription id) to the network with your recent subscription using subscription id as constructor argument.

```bash
npx hardhat deploy --network baobab
```

Finally, you need to go to your subscription page one more time and add the address of deployed contract as a new consumer (https://vrf.chain.link/klaytn-testnet/{subscriptionid}). Once that's done, you can perform a VRF request with the request-random-number task.
> **_NOTE:_**  Make sure to add LINK funds to the subscription from the chainlink UI screen:

#### Request Chainlink Random number

```bash
npx hardhat request-random-number --contract <deployedContractAddress> --numwords <randomNumbersCount> --network baobab
```

##### Parameters
`deployedContractAddress` - `string` Deployed RandomNumberConsumer contract address
`randomNumbersCount` - `number` No of random numbers to be generated

##### Returns
  * `transaction hash` - `string` Transaction hash

##### Example
```typescript
  npx hardhat request-random-number --contract 0x3AFb1Ce6B16EcB1e367cCC23d99Ea4D9Ef497BE3 --numwords 3 --network baobab
  /*
    Transaction Hash: 0x770892fb09f00fbc25aa4118c4e59bae8f106e550d9295ddab62db79d708821a
  */
```

#### Read Chainlink Random number
Once you have successfully made a request for a random number, you can see the result via the read-random-number task:

```bash
  npx hardhat read-random-number --contract <deployedContactAddress> --network baobab
```

##### Parameters
`deployedContractAddress` - `string` Deployed RandomNumberConsumer contract address

##### Returns
  * `randomNumbers` - random numbers

##### Example
```typescript
  npx hardhat read-random-number --contract 0x3AFb1Ce6B16EcB1e367cCC23d99Ea4D9Ef497BE3 --network baobab
  /*
    Random Numbers are: 25039093979060057973217505519617231457599792522931877947740225763662111327605,66221833599132925893563674221180186695699650058371972286077266023247996014608,62169596737219453842215058746401741770368274717351892705020984286494216685598
  */
```

### Witnet Price Feeds
The Witnet Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract.

```bash
  npx hardhat read-witnet-price-feed --contract <deployedContractAddress> --id <id> --network baobab
```

#### Parameters
`deployedContractAddress` - `string` Deployed WitnetPriceFeed contract address
`id` - `string` id4 is the witnet pricefeed ID. Ex: `0x6cc828d1` for Price-KLAY/USD-6. See [Klaytn Witnet PriceFeeds](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds#klaytn-baobab) for reference.

#### Returns
  * `price` - price of KLAY/USD. 

#### Example
```typescript
  // 1 KLAY = 0.20 USD
  npx hardhat read-witnet-price-feed --contract 0x37291E5036db32DFe714823dE7A96253676e6487 --id 0x6cc828d1 --network baobab

  /*
    Last price is: 209744
  */
```
Check out [witnet documentation](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds#klaytn-baobab) for other available price feeds for Klaytn Network.

### Witnet Randomness
The Witnet Randomness has 4 tasks. 
Make sure the deployWitnetRandomNumber method successful execution.

> This 2-step process preserves unpredictability of the random numbers that you get because it guarantees that the number is derived from a seed that was generated only after the request was sent.

> **_NOTE:_**  Initially 1 and 2nd step has to be completed sequentially. Only after that 3rd or 4th can be executed for fetching a random number.

#### 1. Request new randomness
Requesting the new randomness.
Once the the request to new randomness is performed successfully. The other tasks can be performed after transaction submission.

```bash
  npx hardhat request-witnet-randomness --contract <deployedContractAddress> --network baobab
```

#### Parameters
`deployedContractAddress` - `string` Deployed Deployed Witnet RandomNumber contract address

##### Returns
  * `transaction hash` - Transaction hash

##### Example
```typescript
  npx hardhat request-witnet-randomness --contract 0x8937C127F3060fF8a23E9a0fb5AEA10bc30e28be --network baobab
  /*
    Transaction Hash: 0x809addb235dc953c90a563c396c11978a359b574336564c7ec890514c961e050
  */
```

#### 2. Fetch Witnet random number
Initiate fetch witnet random number transaction.

> **WARNING**:
Calling `fetch-witnet-random-number` right after `request-witnet-randomness` will most likely cause the transaction to revert. Please allow 5-10 minutes for the randomization request to complete

```bash
  npx hardhat fetch-witnet-random-number --contract <deployedContractAddress> --network baobab
```

#### Parameters
`deployedContractAddress` - `string` Deployed Witnet RandomNumber contract address

##### Returns
  * `transaction hash` - Transaction hash

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
  * `randomizingBlock` - randomized block value

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
  * `randomNumber` - generated random number

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
  * `Result` - `string`

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

> **_NOTE:_**  If above tryWitnetQueries is stuck, please try to run command shown in below snapshot `npx witnet-toolkit`, install the binary once in the machine and retry above method
![WitnetToolkitBinary](/images/witnet/witnet.png)

## Reference Docs

- [Chainlink Documentation](https://docs.chain.link/)
- [Witnet Documentation](https://docs.witnet.io/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)
