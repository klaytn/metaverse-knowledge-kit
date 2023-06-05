---
title: 🎗 NFT Royalty
sidebar_label: Introduction
---

## Introduction <a id="Introduction"></a>

In general, the creators of a unique asset (NFT) profit from the asset's initial sale. However, this unique asset may appreciate in value over time, and the creator may not benefit from this increase in value. NFT Royalties is based on this approach, in which creators are continuously rewarded for the value of their work after a subsequent sale beyond the initial sale.

## Definition of NFT Royalties <a id="Definition of NFT Royalties"></a>
NFT royalties are payments made to the original creator of a digital asset for each time that asset is resold. This means that when this asset is sold, a certain percentage is paid to the creator as a reward for the asset's value.

For example, a creator may have published an asset on the Marketplace and initially sold it for 10,000 KLAY. Simultaneously, the creator included a 10% NFT royalty percentage for subsequent sales. Thus, if the buyer resells and earns 100,000 KLAY from the resale, the original creator will receive 10% (10,000 KLAY).

Isn't that cool? NFT royalties let creators passively earn from their work.

## How does it work? <a id="How does it work"></a>
When creatives use NFT Royalty for subsequent sales, they will continue to earn money from their work. The creator usually specifies the royalty policy at the platform or on-chain level.

Typically, the procedure is as follows:
* NFT is minted with a royalty percentage added by a creator, either on the platform or on the blockchain.
* When there is a subsequent sale, the creator is paid

## NFT Marketplaces and NFT Royalties <a id="NFT Marketplaces and NFT Royalties"></a>
Marketplaces determine whether the royalty details in a NFT smart contract will be implemented or not. This brings us to the fact that not all marketplaces honor NFT royalties. Further, because of the peculiarities of different NFT platforms, there exist unique royalty payment implementations that are not easily usable by other marketplaces. Thus, making royalty policies from other marketplaces or platforms not automatically transferrable.

For example, if an NFT with a royalty policy is sold on Rarible and then listed on OpenSea, the original creator will not be paid from subsequent sales because the royalty policy was not transferred. ERC2981 was created in response to the need to standardize royalty payment across all platforms. The ERC2981 standard addresses this issue by allowing accurate royalty payments to be implemented regardless of the marketplace where the NFT is sold or resold.

This standard is implemented by ensuring that marketplaces and individuals retrieve royalty payment information via royaltyInfo(), which specifies how much to pay to the creator address for a given sale price. To learn more about this standard, check this guide


This standard is applicable in the metaverse, where NFT royalties can be attached to in-game items and collectibles, digital accessories, virtual lands, and so on.

## Code Sample <a id="Code Sample"></a>

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts//token/common/ERC2981.sol";

contract MyToken is KIP17, KIP17URIStorage, Ownable, ERC2981 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() KIP17("MyToken", "MTK") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function mintNFTWithRoyalty(address recipient, string memory uri, address royaltyReceiver, uint96 feeNumerator) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, uri);
        _setTokenRoyalty(tokenId, royaltyReceiver, feeNumerator);

        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(KIP17, KIP17URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(KIP17, KIP17URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(KIP17, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

```

## Important Note <a id="Important Note"></a>

The code above is a standardized implementation of retrieving royalty payment information from a KIP17 contract. It shows how royalty information can be set for a single token id using the **_setTokenRoyalty** in the **mintNFTWithRoyalty** function. Similarly, royalty information can be specified globally for all tokens using **_setDefaultRoyalty**.

Further, royalty is specified as a fraction of Sale Price:

(salePrice * feeNumerator) / _feeDenominator()

**_feeDenominator()** is specified in basis point by default. This value defaults to 10,000 but is overridable. Also the feeNumerator as specified in **mintNFTWithRoyalty** function is calculated in basis point.  Take for instance if you want to set the royalty percentage to 10%, the **feeNumerator** will be 10/100 * 10000 = 1000

To get more insight of  how it works under the hood, check out this [codebase](https://github.com/klaytn/klaytn-contracts/blob/master/contracts/token/common/ERC2981.sol).







