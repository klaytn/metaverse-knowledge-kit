---
title: NFT with Operator Filter
sidebar_label: Introduction
---

## Introduction <a id="Introduction"></a>
Developers and creators need a sustainable means by which they are rewarded for the valuable work they create overtime. However, this has been made possible with the advent of royalties. This piece of innovation - NFT Royalty however faces a major limitation. The number of marketplaces that do not respect creator fees have been rapidly increasing, and creators, in turn, have seen their effective creator fees severely diminished; this stands as one major limitation.

In order to counter this, an on-chain enforcement tool - [Operator Filter](https://github.com/ProjectOpenSea/operator-filter-registry) was introduced by OpenSea to prevent the sale of your NFTs using marketplaces that do not respect creator earnings. To put things in perspective, this mechanism is built atop of the EIP2981 NFT Royalty Standard to  ensure that creators always receive their royalties when their NFTs are sold.  And on the other hand, if someone attempts to trade an NFT using an operator filter in a marketplace that does not honor creator earnings, the NFT transfer will be blocked.

To get more insight of  how it works under the hood, check out this codebase.

## Code Sample <a id="Code Sample"></a>

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";

contract MyToken is KIP17, KIP17URIStorage, Ownable, DefaultOperatorFilterer {
using Counters for Counters.Counter;
Counters.Counter private _tokenIdCounter;

constructor() KIP17("MyToken", "MTK") {}

function safeMint(address to, string memory uri) public onlyOwner {
	uint256 tokenId = _tokenIdCounter.current();
	_tokenIdCounter.increment();
	_safeMint(to, tokenId);
	_setTokenURI(tokenId, uri);
}

// The following functions are overrides required by Solidity.

function _burn(uint256 tokenId) internal override(KIP17, KIP17URIStorage) {
	super._burn(tokenId);
}

function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
	super.setApprovalForAll(operator, approved);
}

function approve(address operator, uint256 tokenId) public override onlyAllowedOperatorApproval(operator) {
	super.approve(operator, tokenId);
}

function transferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
	super.transferFrom(from, to, tokenId);
}

function safeTransferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
	super.safeTransferFrom(from, to, tokenId);
}

function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override onlyAllowedOperator(from) {
	super.safeTransferFrom(from, to, tokenId, data);
}

function tokenURI(uint256 tokenId) public view override(KIP17, KIP17URIStorage) returns (string memory) {
	return super.tokenURI(tokenId);
}

}

```
From the code above, you can observe that the transfer, transferfrom, approve and setApproval function makes use of the onlyAllowedOperator and onlyAllowedOperatorApproval modifier respectively. This implies that only filtered operators i.e allowed platform smart-contract or delegate can execute transfers from or approvals.

