---
title: 👨‍🔧 Klaytn Service SDK
sidebar_label: Overview
---

## Overview <a id="overview"></a>

The Klaytn Service SDK (KSS) is a set of npm packages that simplifies the usage of various services on the Klaytn blockchain by wrapping their functionality into easy-to-use packages. It aims to integrate all the ecosystem services in Klaytn and comes with starter kits containing default configurations and tools.  
 
The KSS also includes a Command Line Interface (CLI) that enables developers to manage services from their local terminal. Developers can use the SDK by simply importing the npm package to access third-party services such as Oracles and Bridges. 

The SDK provides several features and benefits, including: 

* **Faster development**: Pre-built code and libraries are available in the SDK to speed up the development process and let developers focus on business logic rather than reinventing the wheel 

* **Simplified integration**: The SDK can work with all EVM-compatible chains, making it easier to integrate with Layer1s and saving developers time and effort. 

* **Consistency**: Standardized tools and interfaces in the SDK can help ensure applications are consistent and compatible with the platform or service used. 

* **Sample code**: The SDK provides ready-made code snippets for developers to use or modify for their dApps, helping to reduce the learning curve and speed up development. 

* **Improved documentation and community support**: The SDK includes elaborate documentation and support resources to help developers troubleshoot issues and stay up-to-date with changes and updates to the platform or service. 

## Use cases <a id="usecases"></a>

The Klaytn Service SDK (KSS) brings various benefits to the metaverse, including: 

* **Interoperability**: If you’re building a decentralized app (dApp) in the metaverse and want to allow users to access networks other than Klaytn, the KSS's Bridge-starter kit enables the bridging of assets to other networks. This enhances user flexibility and retention.  

* **Increased functionality**: If you're developing a gaming app in the metaverse that needs real-world data, the KSS's Oracle-starter-kit can integrate off-chain data into your dApp, giving it more functionality. 

* **Access to diversity**: If you're building a marketplace or a wallet in the metaverse, the KSS's Dex-starter-kit can communicate with existing decentralized exchanges and be used to exchange assets, providing users with more flexibility and access to a diverse range of assets.  

* **Unified**: The Klaytn-service-sdk npm package eliminates the need to download multiple packages or perform multiple configurations for different use cases. You can implement all of these use cases in one place using the Klaytn Service SDK. 

## Packages <a id="Packages"></a>

Klaytn is committed to making all ecosystem services available as part of this SDK. While we work on adding more resources, you may first access various kits that are currently available with this [release](https://github.com/klaytn/klaytn-service-sdk/releases).

**Oracle Starter Kit:**
The [Oracle Starter Kit](./oracle-starter-kit.md) provides libraries for random number generation, external API (GET/POST) calls and price feed.

**Bridge Starter Kit:**
The Bridge Starter Kit provides options to interoperate with other chains. [Wormhole](./bridge-starter-kit/wormhole.md) and [Celer](./bridge-starter-kit/celer.md) bridge integration is available as part of this SDK.

**DEX Starter Kit:**
The DEX Starter Kit provides libraries to integrate with dex-contracts and implement features like swapping, staking, farming, minting, and excuting multisig transactions.

:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::
