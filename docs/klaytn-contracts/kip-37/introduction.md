---
title: ✨ KIP37 (Multi Tokens)
sidebar_label: Introduction
---
## Introduction <a id="KIP37 Introduction"></a>

[KIP37](https://kips.klaytn.foundation/KIPs/kip-37) is a standard for representing digital assets on the Klaytn blockchain that allows the creation of multiple token standards in the same contract. This contract allows for a “hybrid token” which includes a combination of fungible tokens and non-fungible tokens. It enables you to create every type of asset, from currency and virtual land to digital art and gaming items. 

KIP37 as a token standard is heavily derived from [ERC1155](https://eips.ethereum.org/EIPS/eip-721), the go-to standard for NFTs within blockchain games. Using this standard as opposed to deploying seperate KIP7 and KIP17 contracts has benefits. It allows developers to consolidate the logic in one contract and one single address. It also allows batch transfers to operate in the confines of the same contract — and all of this can be accomplished at a reduced gas cost. Therefore, to issue multiple tokens on top of Klaytn, the KIP37 standard specification must be implemented.

## Use cases <a id="KIP37 Usecase"></a>
Since KIP37 provides a token standard that can power both fungible and non-fungible items in real games and their item economies, it is well-suited for blockchain games. A metaverse gaming application could use KIP37 to create fungible in-game coins, while also having a non-fungible plot of virtual land.

For example, [Sandbox](https://www.sandbox.game/en/), a blockchain-based virtual world, uses a similar token standard ([ERC1155](https://medium.com/sandbox-game/erc-1155-a-new-standard-for-the-sandbox-c95ee1e45072)) to mint both NFTs and fungible tokens, which they sell for use in various gaming experiences.


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::