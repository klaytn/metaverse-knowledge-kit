---
title: 	🎪 Klaytn Developer SDK
sidebar_label: Overview
---

## Overview <a id="overview"></a>
The Klaytn Developer SDK (KDS) is a monorepo for all the ecosystem tools in Klaytn. Its a collection of npm packages which wrap functionality of various tools into an easy to use SDK (per tool) to build on Klaytn. 

It includes some starter kits with default combinations of tools and configurations. It also has a Command Line Interface(CLI) that allow developers to manage services from thier local terminal. Developers can use the SDK by easily importing a npm package to access third party tools like Oracles, Bridges etc.  

The SDK provides a number of features and benefits, including:

* **Faster development** KDS provides pre-built code and libraries that can speed up the development process. It allows developers to focus on business implementation rather reinventing the wheel
* **Easier integration** KDS is designed to work with all EVM compatible chains, which makes integrating with Layer1's more effecient. As a result, integration takes less time and effort for developers. 
* **Consistency** KDS provide a standardized set of tools and interfaces, which can help ensure that applications are consistent and compatible with the platform or service being used.
* **Sample code** KDS includes the ready-made snippets that developers can use or customize for their own dApps. This can help to speed up the development process and reduce the learning curve for new developers.
* **Better documentation and Community support**: : KDS provides a elaborate documentation and support resources that can help developers run quickly, troubleshoot issues, and stay up to date with changes and updates to the platform or service.

## Use Cases <a id="usecases"></a>
The following are some of the use-cases of Klaytn Developer SDK (KDS) in Metaverse: 

* **Interoperability** If you are building a decentralized app (dapp) in Metaverse and you dont want to restrict the users only to Klaytn network. Then you can use Bridge-starter kit in the KDS to bridge assets to other networks. This provide more flexibilits to users and brings user retention.

* **Increased functionality** Similarly, if you are developing a gaming app in Metaverse that requires real-world data, you can use the Oracle-starter-kit in the KDS to integrate off-chain data into your dapp. This provides increased functionality to your dapp. 

* **Access to diversity** If you are building a marketplace or a wallet in the Metaverse, the Dex-starter-kit in the Klaytn-developer-sdk can be used to exchange assets. This provides users with greater flexibility to access a diverse range of assets. This sdk can be integrated to communicate with existing decentralized exchanges.

* **Unified** With the Klaytn-developer-sdk npm package, there is no need to download multiple packages or perform multiple configurations for different use-cases. All of these use-cases can be implemented in one place.
## Packages <a id="Packages"></a>
Klaytn is committed to making all the ecosystem tools available as part of this SDK. However, the modules listed below are currently available with the current [release](https://github.com/klaytn/klaytn-developer-sdk/releases)

**Oracle Starter Kit:** 
[Oracle Starter Kit](./oracle-starter-kit.md) provides libraries for random number generation, external API (GET/POST) calls and price feed. It is not limited to one oracle provider, rather it provides the felxiblity to access [Chainlink](./oracle-starter-kit.md) and [Witnet](./oracle-starter-kit.md) Oracle services. 

**Bridge Starter Kit:**
Bridge Starter Kit provides options to interopt with other chains. [Wormhole](./bridge-starter-kit/wormhole.md) and [Celer](./bridge-starter-kit/celer.md) bridge integration is available as part of this sdk.

**Dex Starter Kit:** 
Dex Starter Kit provides libraries to integrate with dex-contracts and implement features like swapping, staking, farming, minting and excuting multisig transactions.


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::
