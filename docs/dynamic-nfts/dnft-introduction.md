---
title: 🎨 Dynamic NFTs
sidebar_label: dNFT Introduction
---

## Introduction <a id="Dynamic NFTs Introduction"></a>

NFTs, or non-fungible tokens, have become a prominent application of blockchain technology in the digital economy as proven by its widespread adoption in recent years. NFTs usually represent unique digital assets such as digital art, in-game assets, real estates, and more. 
 
They are distinguished by their unique features such as token IDs, metadata, and contract addresses, which allow ownership to be verified. However, one key limitation of an NFT is that its metadata cannot be changed after it is created, making it static. This limitation poses a challenge for applications that require regular updating of an NFT’s metadata. 

Consider a blockchain game where in-game avatar NFTs store the avatar's skills and traits in the token metadata. As they progress in the game, players may want their achievements to be reflected in the NFTs. This is where dynamic NFTs (dNFTs) come into play where players can keep their in-game avatar’s unique identifier (token ID) while having their in-game achievements reflected through the automatic updating of the NFT’s metadata. 

***Dynamic NFTs*** (dNFTs) are a type of non-fungible token that has smart contract logic integrated into it. This smart contract enables the token to automatically modify its metadata based on both on-chain and off-chain conditions. These conditions can be real-time sports scores, weather results, and other external factors such as the price of a currency. In the context of dNFTs, the smart contract acts as a controlling unit, providing the underlying NFT with specific instructions on when and how to modify its metadata.

## How does a dNFT work? <a id="How does a dNFT work"></a>
Compared to static NFTs, dynamic NFTs can change their metadata based on external conditions. This is achieved with the multi-token standard, which is specified in KIP37 on the Klaytn blockchain platform. Dynamic NFTs utilize smart contracts to dictate how and when the metadata of a dNFT should change based on a triggering event, which can be sourced from external data through an oracle or an on-chain event.  

However, to make the changes visible to non-technical users, most dynamic NFTs require some form of metadata change implementation. These changes are typically initiated by encoded smart contract logic that takes both on-chain and off-chain data into account. 

These simple steps below demonstrate how a dNFT contract works: 

1. A dNFT request is sent to the smart contract. 
2. The smart contract queries the blockchain for on-chain data. 
3. The smart contract connects to off-chain data by relying on Oracles. 
4. Based on the results of both queries, the smart contract returns a specific type of media. 
5. The media is stored in a stateful data structure on IPFS 

In conclusion, dynamic NFT smart contracts rely on both on-chain and off-chain data to accurately reflect changes.

## Application of oracles in dNFTs <a id ="Application of oracles in dNFTs"></a>

Dynamic NFTs (dNFTs) can have their metadata changed based on external conditions that can exist on or off the blockchain. However, blockchains cannot naturally access off-chain data. Therefore, oracles are used to connect the smart contract to real-world data sources such as weather forecasts, sports results, and price feeds.  

As the dNFT ecosystem evolves and NFTs become more closely integrated with the real world, decentralized oracles act as a bridge between the two worlds, enabling the development of automated, decentralized, and interacting dNFT processes.


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::
