---
title: dNFT
sidebar_label: dNFT Tutorial
---

# 💻 Tutorial <a id="dNFT Tutorial"></a>

The introduction of dynamic NFTs will result in excellent gameplay in the gaming and metaverse, making it simple to update NFT metadata based on external actions. As previously stated, this change can be based on either on-chain or off-chain actions. The [Zerion DNA](https://zerion.io/dna/) is a practical example of NFT that changes based on data pulled from on-chain actions in Zerion's web wallet. The [LaMelo Ball NFTs](https://lameloball.io/#/) are an example of a dNFT based on off-chain action. The Lamelo Ball NFT is a collection of eight different NFTs, of which each records a unique set of LaMelo's player statistics, ranging from assists to rebounds to points scored.

One of these eight NFTs, the Gold Evolve NFT, made a unique promise: if LaMelo Ball was named Rookie of the Year for the 2021 NBA season, the NFT would evolve to reflect a new image. Following LaMelo's award, the NFT evolved.

In this tutorial, you will learn how to build a dynamic NFT using Witnet Oracle to update your NFT metadata based on [KLAY/USDT](https://feeds.witnet.io/klaytn/klaytn-testnet_klay-usdt_6) price action.

## Prerequisites <a id="Prerequisite"></a>

1. [Remix IDE](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-remix#connecting-klaytn-remix-using-kaikas) & [Metamask](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-metamask) 
   
In this tutorial, we're going to use the Remix IDE, but the same can be done using Hardhat or any other Solidity Smart Contract development framework and your favorite code editor.

2. Install [IPFS Desktop](https://github.com/ipfs/ipfs-desktop#ipfs-desktop) &  [IPFS Companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en)
   
IPFS desktop and IPFS Companion harnesses the power of [IPFS](https://ipfs.io/) and your locally running IPFS node directly inside your favorite browser

3. Faucets and Testnet Tokens
   
Make sure your MetaMask wallet is connected to [Baobab](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-metamask#connect-to-klaytn-baobab-network-testnet). After connecting to the right network, get test KLAY from Klay [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

## Set up <a id="set-up"></a>
Create a `KdNFT.sol` file on Remix. Copy over the smart contract code below in the newly created file and save it.

```js title="KdNFT.sol"
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/utils/Strings.sol";
import "@klaytn/contracts/access/Ownable.sol";



// witnet pricefeed

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";
import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceFeed.sol";

contract KdynamicNFT is KIP17, KIP17Enumerable, KIP17URIStorage, Ownable {
    using Counters for Counters.Counter;

     Counters.Counter private _tokenIdCounter;

    uint public interval; 
    uint public lastTimeStamp;

    int256 public currentPrice;

    IWitnetPriceRouter public witnetPriceRouter;
    IWitnetPriceFeed public klayUsdtPrice;
    
    // IPFS URIs for the dynamic nft graphics/metadata.
    // NOTE: These connect to my IPFS Companion node.
    // You should upload the contents of the /ipfs folder to your own node for development.
        string bullUrisIpfs = "https://ipfs.io/ipfs/QmdcURmN1kEEtKgnbkVJJ8hrmsSWHpZvLkRgsKKoiWvW9g?filename=simple_bull.json";
        string bearUrisIpfs = "https://ipfs.io/ipfs/QmbKhBXVWmwrYsTPFYfroR2N7NAekAMxHUVg2CWks7i9qj?filename=simple_bear.json";

    event TokensUpdated(string marketTrend);

    // YOu can pass in 30(seconds) for `updateInterval`
    constructor(uint updateInterval) KIP17("Klaytn dNFT", "KDNFT") {
        // Set the keeper update interval
        interval = updateInterval; 
        lastTimeStamp = block.timestamp;  //  seconds since unix epoch

        // Baobab Price-feed contract address
        witnetPriceRouter = IWitnetPriceRouter(0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0);
        updateKlayUsdtPriceFeed();
        
        // gets the current KLAY/USDT price and store it to currentPrice var 
        (currentPrice ,) = getKlayUsdtPrice();
    }

    function safeMint(address to) public  {
        // Current counter value will be the minted token's token ID.
        uint256 tokenId = _tokenIdCounter.current();

        // Increment it so next time it's correct when we call .current()
        _tokenIdCounter.increment();

        // Mint the token
        _safeMint(to, tokenId);

        // Default to a bull NFT
        string memory defaultUri = bullUrisIpfs;
        _setTokenURI(tokenId, defaultUri);
    }

    function checkUpkeep(bytes calldata /* checkData */) external view  returns (bool upkeepNeeded, bytes memory /* performData */ ) {
         upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;

    }


    function performUpkeep(bytes calldata /* performData */ ) external  {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - lastTimeStamp) > interval ) {
            int latestPrice;
            lastTimeStamp = block.timestamp;         
            (latestPrice, ) =  getKlayUsdtPrice();
        
            if (latestPrice == currentPrice) {
                return;
            }

            if (latestPrice < currentPrice) {
                // bear
                updateAllTokenUris("bear");

            } else {
                // bull
                updateAllTokenUris("bull");
            }

            // update currentPrice
            currentPrice = latestPrice;
        } else {
            return;
        }

       
    }

    function updateAllTokenUris(string memory trend) internal {
        if (compareStrings("bear", trend)) {
            for (uint i = 0; i < _tokenIdCounter.current() ; i++) {
                _setTokenURI(i, bearUrisIpfs);
            } 
            
        } else {     

            for (uint i = 0; i < _tokenIdCounter.current() ; i++) {
                _setTokenURI(i, bullUrisIpfs);
            }  
        }   
        emit TokensUpdated(trend);
    }
    
    function updateKlayUsdtPriceFeed() public {
        IERC165 _newPriceFeed = witnetPriceRouter.getPriceFeed(bytes4(0x5d9add33));
        if (address(_newPriceFeed) != address(0)) {
            klayUsdtPrice = IWitnetPriceFeed(address(_newPriceFeed));
        }
    }

    /// Returns the KlAY / USDT price (6 decimals), ultimately provided by the Witnet oracle, and
    /// the timestamps at which the price was reported back from the Witnet oracle's sidechain 
    /// to Klaytn Baobab. 
     function getKlayUsdtPrice() public view returns (int256 _lastPrice, uint256 _lastTimestamp) {
        (_lastPrice, _lastTimestamp,,) = klayUsdtPrice.lastValue();
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function setInterval(uint256 newInterval) public onlyOwner {
        interval = newInterval;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

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
        override(KIP17, KIP17Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```


The code above houses the logic for our dynamic NFT. It employs a mix of [Klaytn contracts](https://github.com/klaytn/klaytn-contracts), [Witnet Oracle contract](https://www.npmjs.com/package/witnet-solidity-bridge) interfaces, and a manual implementation of the Chainlink Keeper Contract. 

The performUpkeep function is where the majority of the code's functionality is found. At intervals, if the market price goes up, the smart contract will ensure the NFT’s URI points to the bullish image, and the NFT will be dynamically updated. The NFT will dynamically update to a bearish image if the price feed data falls. 

## Create and upload Metadata on IPFS <a id="Create and upload Metadata on IPFS"></a>
Metadata allows digital assets to have additional properties, such as a name, description, and image other than its unique identifier (token ID). To create metadata that allows applications like OpenSea pull in rich data and easily display them in-app, you need to follow this metadata structure:

Here's an example of metadata structure that OpenSea supports

```javascript
{
  "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
  "external_url": "https://openseacreatures.io/3", 
  "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
  "name": "Dave Starbelly",
  "attributes": [ ... ]
}
```

For more information about metadata, refer to this [guide](https://docs.opensea.io/docs/metadata-standards)

Now you need to make sure you update the links in the IPFS URIs for `bullUrisIpfs` and `bearUrisIpfs` in the contract to point to the files hosted on your IPFS browser node.

To set up the NFT data on your browser IPFS node:

* Upload and get the IPFS hash of the images you’ll love to use on your IPFS Desktop
  
* Create a Token metadata JSON for both images with the image value adjusted accordingly
  
* Click on the IPFS Companion’s browser extension icon to open up your local IPFS node
  
* Import your metadata files to the FILES section in your IPFS Desktop

![](/images/dnft/importIPFS.png)

* To get the URI link for each uploaded metadata, click on the three dots and copy the string from “Share Link”

![](/images/dnft/dotIPFS.png)

## Compile and Deploy Contract <a id="Compile and Deploy dNFT"></a>

To complete this task, you need to go through the following steps viz: 

* Choose the right compiler in Remix IDE based on the smart contract’s pragma (0.8.0 onwards).
  
* Make sure you’re compiling the right file- `KDNFT.sol`.
  
* Switch your environment to “Injected web3” and deploy with the contract argument - updateInterval: 30(seconds) or 10(seconds).

![](/images/dnft/kdynft.png)

* Copy and paste the wallet address you'd love to mint a token for in the `safeMint` field.

![](/images/dnft/dnftSafeMint.png)

## Interacting with deployed contract <a id="Interacting with deployed contract"></a>

Now that a dNFT has been minted to your wallet address, you need to trigger the change in metadata manually. The following steps outlines the process:

* **checkUpkeep**: You need to manually need to check upkeep. If it returns true, that means the interval  set has passed, and an upkeep action is due. If it returns false, that means the time set has not passed the interval set. 

![](/images/dnft/checkUpkeep.png)

* **performUpkeep**: If the `checkUpkeep` returns true, you need to call the performUpkeep function to run the embedded logic on-chain. This checks if there is a deviation in the price set at deployment and the latestPrice gotten from the getKlayUsdtPrice(). In the case of reduction, the smart contract sets the token URI to the bearish image, and if otherwise to the bullish image.

![](/images/dnft/performUpkeep.png)

You would want to check [OpenSea](https://testnets.opensea.io/) to visually see how this NFT evolve based on price action.

![](/images/dnft/openseaDNFT.png)


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::
