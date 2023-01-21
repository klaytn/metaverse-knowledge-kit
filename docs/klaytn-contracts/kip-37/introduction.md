---
title: KIP37
sidebar_label: KIP37 Introduction
---
# Introduction <a id="KIP37 Introduction"></a>

[KIP37](https://kips.klaytn.foundation/KIPs/kip-37) is a standard for representing digital assets on Klaytn blockchain that allows the creation of multiple tokens in the same single contract. This single contract includes a combination of fungible tokens and non-fungible tokens. It enables you to create every type of asset, from currency and virtual land to digital art and gaming items.  

KIP37 as a token standard is heavily derived from [ERC1155](https://eips.ethereum.org/EIPS/eip-721), the go-to standard for NFTs within blockchain games. There are advantages to using this standard rather than deploying separate KIP7 and KIP17 contracts. It allows developers to consolidate the logic in one contract and one single address. It also allows batch transfers to operate in the confines of the same contract — and all of this can be accomplished at a reduced gas cost. Therefore, to issue multiple tokens on top of Klaytn, the KIP37 standard specification must be implemented.

# Usecases <a id="KIP37 Usecase"></a>
KIP37 can be used to power the token standard around real games and their item economies, which include both fungible and non-fungible items. The peculiarity of KIP37 makes it suitable for blockchain games. A metaverse gaming application can therefore rely on KIP37; where an in-game coin would likely be fungible, while a plot of virtual land would be non-fungible. 

For example, [Sandbox](https://www.sandbox.game/en/) - a blockchain-based virtual world, makes use of [ERC1155](https://medium.com/sandbox-game/erc-1155-a-new-standard-for-the-sandbox-c95ee1e45072) to create both NFTs and fungible tokens that offer them the ability to mint a collection of items they can sell for use in various gaming experiences.

