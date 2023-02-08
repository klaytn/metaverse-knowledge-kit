---
title: Oracle Starter Kit
sidebar_label: Oracle Starter Kit
---

# Oracle Starter Kit
- [Oracle Starter Kit](#oracle-starter-kit)
  - [Install](#install)
  - [Quick Usage](#quick-usage)
  - [Setup Hardhat configurations Baobab Klaytn network and variables](#setup-hardhat-configurations-baobab-klaytn-network-and-variables)
    - [1. Hardhat configurations](#1-hardhat-configurations)
    - [2. Environment Variables](#2-environment-variables)
  - [Deploy contracts](#deploy-contracts)
  - [Interacting with Deployed Contracts](#interacting-with-deployed-contracts)
    - [Chainlink Price Feeds](#chainlink-price-feeds)
      - [Parameters](#parameters)
      - [Returns](#returns)
      - [Example](#example)
    - [Change Chainlink price feed address](#change-chainlink-price-feed-address)
      - [Parameters](#parameters-1)
      - [Returns](#returns-1)
      - [Example](#example-1)
    - [Chainlink Request \& Receive Data](#chainlink-request--receive-data)
      - [Fund ChainLinkAPI contract](#fund-chainlinkapi-contract)
      - [Parameters](#parameters-2)
        - [Returns](#returns-2)
      - [Request ChainLinkAPI Data](#request-chainlinkapi-data)
        - [Parameters](#parameters-3)
        - [Returns](#returns-3)
        - [Example](#example-2)
      - [Request ChainLinkAPI Data](#request-chainlinkapi-data-1)
        - [Parameters](#parameters-4)
        - [Returns](#returns-4)
        - [Example](#example-3)
    - [Chainlink VRF Get a random number](#chainlink-vrf-get-a-random-number)
      - [Prerequisite](#prerequisite)
      - [Request Chainlink Random number](#request-chainlink-random-number)
        - [Parameters](#parameters-5)
        - [Returns](#returns-5)
        - [Example](#example-4)
      - [Read Chainlink Random number](#read-chainlink-random-number)
        - [Parameters](#parameters-6)
        - [Returns](#returns-6)
        - [Example](#example-5)
    - [Chainlink Keepers](#chainlink-keepers)
    - [Witnet Price Feeds](#witnet-price-feeds)
      - [Parameters](#parameters-7)
      - [Returns](#returns-7)
      - [Example](#example-6)
    - [Witnet Randomness](#witnet-randomness)
      - [1. Request new randomness](#1-request-new-randomness)
      - [Parameters](#parameters-8)
        - [Returns](#returns-8)
        - [Example](#example-7)
      - [2. Fetch Witnet random number](#2-fetch-witnet-random-number)
      - [Parameters](#parameters-9)
        - [Returns](#returns-9)
        - [Example](#example-8)
      - [3. Get the latest randomizing block](#3-get-the-latest-randomizing-block)
      - [Parameters](#parameters-10)
        - [Returns](#returns-10)
        - [Example](#example-9)
      - [4. Get the generated random number](#4-get-the-generated-random-number)
      - [Parameters](#parameters-11)
        - [Returns](#returns-11)
        - [Example](#example-10)
    - [Witnet Web Oracle Request](#witnet-web-oracle-request)
      - [Compile the Witnet queries into Solidity contracts](#compile-the-witnet-queries-into-solidity-contracts)
        - [Example](#example-11)
      - [Execute Witnet Queries](#execute-witnet-queries)
        - [Parameters](#parameters-12)
        - [Returns](#returns-12)
        - [Example 1 - Fetch Coinprice](#example-1---fetch-coinprice)
        - [Example 2 - Post Request](#example-2---post-request)
  - [Resources](#resources)

<br/>

Oracles take data from the outside world and put it into the blockchain for other smart contracts to consume.
This is a hardhat project containing contracts and scripts for `Chainlink` and `Witnet` integrations.

## Install

```typescript
npm install -g @klaytn-developer-sdk/kds-cli --force
```

## Quick Usage
For a default set of contracts and tests, run the following within the required project directory:

```typescript
> kds-cli oracle init

> cd oracle-starter-kit
> npm install --force
```

Above commands downloads the `oracle-starter-kit` folder structure in the current project directory. 
Enter inside the generated folder and install the packages as mentioned

From there you can run hardhat commands to compile your contracts, deploy those contracts to 
the network and run their associated unit tests.

## Setup Hardhat configurations Baobab Klaytn network and variables
The default hardhat configurations can be modified in `helper-hardhat-config.json`
Default configurations of baobab network `1001` are already using [Klaytn vrf configurations](https://docs.chain.link/vrf/v2/subscription/supported-networks/).

### 1. Hardhat configurations
Hardhat configuration variables can be found in `helper-hardhat-config.json` in the root directory. Below is the configuration explaination for `1001` network.

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

> IMPORTANT: MAKE SURE YOU DON'T EXPOSE THE KEYS YOU PUT IN THIS `.env` FILE saved in the package node_modules. By that, I mean don't push them to a public repo, and please try to keep them keys you use in development not associated with any real funds. 

Don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

> Get some Baobab Testnet KLAY and LINK 
Go to the [Klaytn faucets](https://baobab.wallet.klaytn.foundation/faucet) to get some KLAY to configured private key account.
Head over to the [Chainlink faucets](https://faucets.chain.link/) and get some LINK to configured private key account. Please follow [the chainlink documentation](https://docs.chain.link/docs/acquire-link/) if unfamiliar. 

## Deploy contracts

You should now be all setup! You can run any method now! Since we configured the environment variables and hardhat configurations so you don't really need to pass any configurations.

To comple contracts
```
npx hardhat compile
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

  // By default it returns LINK/KLAY price feed value. 1 LINK = 32.9 KLAY
  /*
    Price is: 32915338976573950000
  */
```

### Change Chainlink price feed address
The price feed address used while deployment can be changed using below method. 

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
  // Change pricefeedaddress to WEMIX/USD 0x76Aa17dCda9E8529149E76e9ffaE4aD1C4AD701B price feed contract. 1 WEMIX = 0.8 USD
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
#### Request ChainLinkAPI Data
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

### Chainlink VRF Get a random number
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

### Chainlink Keepers
<!-- The KeepersCounter contract is a simple Chainlink Keepers enabled contract that simply maintains a counter variable that gets incremented each time the performUpkeep task is performed by a Chainlink Keeper. Once the contract is deployed, you should head to [https://keepers.chain.link/](https://keepers.chain.link/) to register it for upkeeps, then you can use the task below to view the counter variable that gets incremented by Chainlink Keepers


```bash
  npx hardhat read-keepers-counter --contract <deployedContractAddress>
``` 

##### Parameters
`deployedContractAddress` - Deployed KeepersCounter contract address

-->
> **WARNING**:
The Baobab network is not supported by Chainlink Automation (aka Chainlink Keepers) yet. Because of that, the response of the Keeper will always be 0. You can ignore this feature in the current version.

<br/>

### Witnet Price Feeds
The Witnet Price Feeds consumer contract has one task, to read the latest price of a specified price feed contract

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
![WitnetToolkitBinary](data:image/png;base64,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)

## Resources

- [Chainlink Documentation](https://docs.chain.link/)
- [Witnet Documentation](https://docs.witnet.io/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)