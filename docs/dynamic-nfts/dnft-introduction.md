---
title: 🎨 Dynamic NFTs
sidebar_label: dNFT Introduction
---

## Introduction <a id="Dynmaic NFTs Introduction"></a>

The widespread adoption and use of NFTs over the years have brought about major change in the digital economy, thereby making it one of the most prominent applications of blockchain technology. NFTs as it stands can be used to represent unique digital assets ranging from digital art to in-game assets to real estate, etc.

Usually, what makes these non-fungible tokens unique are their token IDs, unique contract addresses, and metadata, which contains the NFT description, image, etc., and as such, verification of ownership is made possible. However, once an NFT is minted on the blockchain, its metadata cannot be altered, thus making it static. When trying to build use-cases that require metadata updates, this static NFT approach has a limitation. 

Consider a blockchain-game in which the in-game avatar NFTs store the avatar's skills and traits in the token metadata. As they progress through the game's stages, players will now require avatar upgrades. This is where dynamic NFTs come into play to help players keep their in-game avatar's unique identifier (token ID) while providing flexibility for modifying or updating different features of the token metadata based on specific conditions.

Thus, ***dynamic NFTs*** (dNFTs) are non-fungible tokens with embedded smart contract logic that enables it to automatically change its metadata based on off-chain and on-chain behaviors. These changes are triggered by a smart contract based on external conditions such as weather results, real-time sports scores, the price of currency, etc. In the case of dNFTs, the smart contract serves as the powerhouse that provides instructions to the underlying NFT regarding when and how its metadata should change.

## How does dNFT work? <a id="How does dNFT work"></a>
In contrast to static NFTs, the "dynamic" element in NFTs can change the metadata based on external conditions. Dynamic NFT primarily uses the multi-token standard which is in KIP37 in Klaytn. In a Dynamic NFT, smart contracts provide instructions on how the dNFT’s metadata should be changed given a triggering event based on external data through an oracle or an on-chain event.
 
Most dynamic NFTs, however, must implement some form of metadata change in order for non-technical users to "see" the changes. Typically, these changes are triggered by encoded smart-contract logic that takes into account both on-chain and off-chain data. 

The simple steps below demonstrate how a dNFT works.

* A dNFT request is sent to the smart contract.
  
* In the second step, the smart contract queries the blockchain for on-chain data.
  
* The smart contract connects to off-chain data by relying on Oracles.
  
* Based on the results of both queries, the smart contract returns a specific type of media.
  
* The media is stored in a stateful data structure on IPFS

Above all, dynamic NFT smart contracts rely on both on-chain and off-chain data to accurately reflect changes.

## Application of oracles in dNFT <a id ="Application of oracles in dNFT"></a>

As previously stated, dynamic NFT metadata changes can be triggered in a variety of ways based on external conditions. These conditions can exist on and off the chain. Blockchains, on the other hand, are naturally incapable of accessing off-chain data. This is where oracles come in, to connect the smart contract to real world data such as weather forecasts, sports results, price feeds, etc.

As the dNFT ecosystem evolves and NFTs become more closely integrated with the real world, decentralized oracles act as a bridge between the two worlds, enabling the development of automated, decentralized, and interacting dNFT processes.


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::
