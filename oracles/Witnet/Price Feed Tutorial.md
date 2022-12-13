# Tutorial

#### Introduction

In this section, you will see how to get the latest price of any of the [supported currency pairs](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds) on Klaytn through Price Feeds.

On Witnet, there are 2 ways to get the price feed: from the *Price Feeds Router* or from a *Price Feed Contract*. Using Price Feeds Router is the easiest way to get price feeds as it removes the need to know the actualy contract addresses handling the price updates from the Witnet oracle.

Witnet price feeds are timely updated with fresh data as aggregated from multiple reliable data sources and attested by the Witnet decentralized oracle network, which offers high data integrity guarantees.

###

Prerequisites[](#prerequisites)

-   [Metamask](https://metamask.io/download/)

-   [Remix IDE](https://remix.ethereum.org/)

-   [Klaytn Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)

-   Klaytn account and test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

**Steps**

  1. **Get the WitnetPriceRouter address**

Go to [Multi-chain addresses](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses) and select [Klaytn Price Feeds](https://docs.witnet.io/smart-contracts/witnet-data-feeds/addresses/klaytn-price-feeds).

![Klaytn Price Feeds](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FNYeqXyDmcl2fVVxglGsR%2Fuploads%2FGqHBjjY2PbGfp6cCTQlf%2FScreenshot%202022-11-17%20at%2014.49.54.png?alt=media&token=67ed25dd-f8a8-4b86-8ec9-d8f0532dbfae)

We will be fetching the KLAY/USD pair on baobab network so the WitnetPriceRouter is [0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0](https://baobab.scope.klaytn.com/account/0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0?tabId=txList) and the ID4 (represents the pair) which is 0x6cc828d1.
2. **Open Remix IDE**
Make sure you have the Klaytn Plugin installed.
Click [here](https://remix.ethereum.org/#url=https://github.com/tantely-klaytn/witnet-oracle/blob/main/PriceFeed.sol) open the code in Remix.

Or use this code snippet: 

```solidity:
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "witnet-solidity-bridge/contracts/interfaces/IWitnetPriceRouter.sol";

contract PriceFeed {

    IWitnetPriceRouter public immutable witnetPriceRouter;
    
    /*
     * Network: Klaytn Baobab
     * WitnetPriceRouter: 0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0
     **/
    constructor() {
        witnetPriceRouter = IWitnetPriceRouter(0xeD074DA2A76FD2Ca90C1508930b4FB4420e413B0);
    }

    /// Returns the KLAY / USD price (6 decimals), ultimately provided by the Witnet oracle, and
    /// the timestamps at which the price was reported back from the Witnet oracle's sidechain 
    /// to Klaytn Baobab. 
    /// ID4: 0x6cc828d1
    function getKlayUsdPrice() external view returns (int256 _lastPrice, uint256 _lastTimestamp) {
        (_lastPrice, _lastTimestamp,) = witnetPriceRouter.valueFor(bytes4(0x6cc828d1));
    }
}
```

If you look at the parameter in the constructor and in the getKLayUsdPrice function, we have used the address of the WitnetPriceRouter and the ID4 mentioned above.

3. **Compile and Deploy the contract**
Select the Klaytn icon in the sidebar to use the Klaytn plugin. Choose baobab environment and add your account by providing your private key. Make sure you have enough test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet).

![Deploy](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FNYeqXyDmcl2fVVxglGsR%2Fuploads%2Fw5m1stL1o7QlmX1xKa1f%2FScreenshot%202022-11-17%20at%2016.15.39.png?alt=media&token=e72b64dd-2fe4-4383-a60d-20bbdf9f24ff)

Now you have you contract deployed. 

4. **Get the KLAY/USD price**
Once your contract deployed, you will be able to see the PriceFeed contract under "Deployed Contracts" section. Click on it, and the available functions will show up. Here, we have the getKlayUsdPrice function.

![Result](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FNYeqXyDmcl2fVVxglGsR%2Fuploads%2Fjdb68MejatD4ylsoL957%2FScreenshot%202022-11-17%20at%2016.22.35.png?alt=media&token=60fad897-b06a-4409-b639-92713d531f16)

Click on it to fetch the current price of KLAY per USD. At the time of writing, it is `170282`, which means 1 KLAY equals to $0.170282.

### Conclusion

In this tutorial, we saw how to use Witnet oracle to get the Price Feed on baobab testnet. If you want more information, visit [Klaytn Docs](https://docs.klaytn.foundation/) and [Witnet Oracle Docs](https://docs.witnet.io/). If you have any questions, visit [Klaytn Forum](https://forum.klaytn.foundation/).

Happy coding!