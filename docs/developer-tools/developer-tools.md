---
title: 🔧 Developer Tools
sidebar_label: Developer Tools and SDKs
---

## Overview <a id="Developer Tools"></a>

There are many SDKs and developer tools supported on Klaytn that will be useful in building your metaverse applications. For individuals looking to build metaverse smart contracts for hackathon projects, or for enterprises trying to lead ways in the digital world to stir up new opportunities around branding, global reach, and revenue generation. The following list of tools is a core list of tools to choose from.


## Wallets <a id="Wallets"> </a>
A wallet is a digital software which stores private and public keys as well as monitors and keeps track of digital assets. They are mostly useful for sending assets and interacting with smart contracts and dApps. To interact in the metaverse, a wallet is required for metaverse exploration. Wallets are used in the metaverse to

* **Manage Ownership**: It serves as means to store the assets you own
* **Control over assets**: Users can control, manage, buy, sell, or even trade digital assets
* **Execute transactions**: With wallets, users can initiate any transactions in Metaverse by integrating with the dapps.

### Mobile Wallets <a id="Mobile Wallets"></a>
* [Klip](https://klipwallet.com/) - [Documentation](https://docs.klipwallet.com/)
* [D'CENT](https://dcentwallet.com/)
* [nBlocks](https://nblocks.io/)
* [Klaytn Wallet](https://wallet.klaytn.com/)
* [Huobi Wallet](https://www.huobiwallet.com/en/)
* [Token Pocket](https://www.tokenpocket.pro/)
* [Biport](https://biport.io/)
* [Alphawallet](https://alphawallet.com/)
* [BitKeep](https://bitkeep.com/)
* [Trustkeys](https://trustkeys.network/)
* [Nest](https://nes.tech/)
* [Math Wallet](https://mathwallet.org/ko-kr/)


### Browser Extension Wallets <a id="Browser Extension Wallets"></a>

* [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi) - [Documentation](https://docs.kaikas.io/)
* [Metamask](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-metamask)
* [Dekey](https://chrome.google.com/webstore/detail/dekey/cekclnkpicopjiagjphfoahcinhmgbjp)
* [COIN98](https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg)
* [web3auth](https://web3auth.io/) - [Documentation](https://web3auth.io/docs/connect-blockchain/klaytn)
* [web3Modal](https://github.com/WalletConnect/web3modal/tree/V1/example)


### Hardware Wallets <a id="Hardware Wallets"></a>
* [D'CENT](https://dcentwallet.com/)

### Multisig Wallet <a id="MultiSig Wallet"></a>
* [Klaytn Safe](https://safe.klaytn.foundation/)

### Open Source Wallet <a id="Open Source Wallets"></a>

Klaytn ecosystem has open source wallets where developers can integrate with their dApp and also add additional features according to their needs.

* [Oko Wallet](https://github.com/madfish-solutions/oko-wallet) - is a non-custodial EVM multi-chain wallet available browser extension, iOS and Android applications available for Klaytn network.

## Explorer <a id="Explorer"></a>

Explorers are web applications that scan Klaytn and make it easier for users to search for blocks, transactions, addresses, and contracts.

Klaytn supports the following explorers:

* [Klaytnscope](https://scope.klaytn.com/)
* [KlaytnFinder](https://www.klaytnfinder.io/)

### Open-Source Explorer

There are open-source explorers in the Klaytn ecosystem, which serve as an alternative to several closed-system explorers.An open source blockchain explorer can be integrated more easily with other tools and platforms, creating a more seamless experience for users. This type of explorer is community-driven and available for anyone to use, explore, and improve. This means, it is likely to evolve and improve more quickly than a proprietary solution.

* [Blockscout](https://github.com/blockscout/blockscout)

## SDKs and API Libraries <a id="SDKs and API Libraries"></a>
For your metaverse application to interact with the Klaytn blockchain (i.e., read on-chain data or send transactions on-chain), it must connect to a Klaytn node.  To connect with a Klaytn node, Klaytn provides several convenient libraries that make interacting with a node much easier.

* [Caver-js](https://github.com/klaytn/caver-js)
* [Web3 js](https://web3js.readthedocs.io/en/v1.8.1/)
* [Tatum-js](https://github.com/tatumio/tatum-js)
* [web3.unity](https://github.com/ChainSafe/web3.unity)

## Integrated Development Environment <a id="Integrated Development Environment"></a>

* [Remix IDE](https://remix.ethereum.org/): is a browser-based IDE and powerful opensource tool that lets you test, deploy and execute smart contracts.
* [Visual Studio](https://code.visualstudio.com/download): Is one of the leading IDE used by developers

## Local Web3 Development <a id="Local Web3 Development"> </a>
To deploy, test, and write smart contracts locally, Klaytn supports the following smart contract development environments:

* [Hardhat](https://hardhat.org/)
* [Truffle](https://github.com/trufflesuite/truffle)

## Decentralized Exchanges <a href="Decentralized Exchanges"></a>

Klaytn ecosystem has built a full stack open source DEX infrastructure for public use.  DEX allows users to swap tokens, stake and provide liquidity, mint tokens, participate in decentralized governance, and monitor the exchange’s activities through dashboards, with all these functionalities being open-source and decentralized. It also has the flexibility to customize new features and visualizations based on their users’ specific needs.

Deployment is automated using Dockers and Kubernetes in the open source DEX to easily spin up DEX. Below are the different components of DEX: 

 * [Open Source Dex](https://dex.baobab.klaytn.net/)
    * [Dex Frontend](https://github.com/klaytn/klaytn-dex-frontend)
    * [Dex Dashboard](https://github.com/klaytn/klaytn-dex-dashboard)
    * [Dex Contracts](https://github.com/klaytn/klaytn-dex-contracts)
    * [Dex Subgraph](https://github.com/klaytn/klaytn-dex-subgraphs)

DEX testnet is available for testing in Baobab without installing anything. Feel free to play around [here](https://dex.baobab.klaytn.net/swap)

## Other Tools <a id="Other Tools"></a>

* [Klaytn Online Toolkit](https://toolkit.klaytn.foundation/): This provides code samples and pages to help you utilize the Klaytn SDK(caver-js). With the Online Toolkit, you can derive the code to deploy your Klaytn contracts using caver-js. This contract includes [KIP7](https://toolkit.klaytn.foundation/kct/KIP7Deploy), [KIP17](https://toolkit.klaytn.foundation/kct/KIP17Deploy), [KIP37](https://toolkit.klaytn.foundation/kct/KIP37Deploy) and other [KCT](https://toolkit.klaytn.foundation/kct/KCTDetection). The online toolkit also gives users the functionality of interacting with deployed contracts given its ABI, contract address.
  
* [Klay-Spray](https://github.com/klaytn/klayspray): Want to quickly deploy a layer 1 network? Klayspray helps you easily deploy a private layer1 network.
  
* [Sidechain](https://docs.klaytn.foundation/content/installation-guide/deployment/service-chain): This enables developers who wants to build a local private network with high TPS, minimal transaction fees or data privacy.
   
* [Klaytn Wizard](https://wizard.klaytn.foundation/): This is an interactive generator to bootstrap your smart contract and learn about [Klaytn Contracts](https://github.com/klaytn/klaytn-contracts). This is based on [OpenZeppelin Wizard](https://wizard.openzeppelin.com/).


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::


