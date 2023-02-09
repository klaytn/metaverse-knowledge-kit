---
title: Decentralized Oracle
sidebar_label: Chainlink VRF Tutorial
---

# 💻 Tutorial <a id="Chainlink VRF Tutorial"></a>

As a decentralized oracle service provider, [Chainlink](https://docs.chain.link/getting-started/conceptual-overview) provides two methods for requesting randomness, which are:

**Subscription**: With this method, you create a subscription account and fund the balance with LINK. And then you can connect various consuming contracts to this account to make requests from multiple contracts from a single subscription.

**Direct Funding**: Compared to the subscription method, you must directly fund your consumer contract and ensure there are enough LINK tokens to pay for randomness requests. 

In this tutorial, you will use Chainlink VRF V2 contract to programmatically create a subscription, add a consumer contract and request random values on the Klaytn blockchain.


## Prerequisites <a id="Prerequisites"></a> 

* [MetaMask](https://metamask.io/download/)
* [Remix IDE](https://remix.ethereum.org/)
* [Klaytn Plugin on Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
* Test KLAY from [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

### Step 1 – Obtaining test LINK <a id="Step 1 – Obtaining test LINK"></a>

Make sure you have configured [Klaytn Baobab network on MetaMask](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask#send-klay). You need LINK tokens when requesting randomness, which are available in [Chainlink Faucet](https://faucets.chain.link/).

Click on **Connect wallet** and select **MetaMask**

![](./../../../static/images/chainlink/linkConnect.png)

Verify Captcha request and click on **Send me 20 testnet LINK**.

![](./../../../static/images/chainlink/linkSent.png)

After your request is completed, you will receive a congratulations message.

![](./../../../static/images/chainlink/linkSentDone.png)


To view your LINK Tokens in your wallet, You have to import the token by following the guide in  [LINK Token Contracts](https://docs.chain.link/resources/link-token-contracts). Click the **Add to wallet** button.

![](./../../../static/images/chainlink/linkContract.png)

A new window pop-up will appear asking you to “**Add token**”. Follow through this process, and you should see your tokens successfully imported.

![](./../../../static/images/chainlink/linkSendKlay.png)

### Step 2 – Opening Subscription Manager Contract<a id="Step 2 – Opening Subscription Manager Contract"></a>

In this guide, we will use an example subscription contract. For more information, refer to [Programmatic Subscription](https://docs.chain.link/vrf/v2/subscription/examples/programmatic-subscription) in Chainlink Docs. 
So first, click [here](https://remix.ethereum.org/#url=https://github.com/jiwon-lieb/remix_code/blob/main/klaytn_SubscriptionManager.sol) to open the subscription manager contract directly on Remix IDE.

![](./../../../static/images/chainlink/linkCopyCode.png)


### Step 3 – Compiling & Deploying Smart Contract <a id="Step 3 – Compiling & Deploying Smart Contract"></a>

Now that we have a contract, let’s first compile it.

![](./../../../static/images/chainlink/linkCompileContract.png)

After compiling, click on the Klaytn logo on the side panel, and change the environment to **Injected Web3**. A popup will appear to connect to your MetaMask wallet. Select the account you want to connect to and click Next to proceed.

Select the VRFv2SubscriptionManager Contract and click **Deploy**.

### Step 4 — Getting a random number <a id="Step 4 — Getting a random number"></a>

Now that we have successfully deployed our contract, we need to fund our subscription with some LINK, which we will use to request random numbers.

You can copy the contract address under **Deployed Contracts**.

![](./../../../static/images/chainlink/linkDeployContract.png)

Let’s paste in the address on MetaMask.

![](./../../../static/images/chainlink/linkSendToContract.png)

![](./../../../static/images/chainlink/linkPasteCA.png)

To cover the gas fee, make sure you also have testnet KLAY from [faucet](https://baobab.wallet.klaytn.foundation/faucet). Click **Confirm**.


We now need to top up our subscription account from the contract to pay for the transaction cost when requesting random numbers. Let’s send 5 LINK for good measure. To do this, click **toUpSubscription** and enter the amount, taking into account the 18 decimals. Then click **Transact** and confirm the transaction.

![](./../../../static/images/chainlink/linkTopUp.png)

Now let’s call the `requestRandomWords` function. It may take some time for nodes to verify and confirm the request.

![](./../../../static/images/chainlink/linkRequestRandom.png)

Call the s_randomwords function and pass zero(0) as an argument.

![](./../../../static/images/chainlink/linkRandomNumbers.png)

Congratulations on successfully requesting for random numbers using ChainLink VRF V2 Contracts.

## Conclusion
In this tutorial, we saw how to use  Chainlink oracle to get the Random Numbers on Klaytn Testnet (Baobab). If you want more information, visit [Klaytn Docs](https://docs.klaytn.foundation/) and [Chainlink Oracle Docs](https://docs.chain.link/getting-started/conceptual-overview). If you have any questions, visit [Klaytn Forum](https://forum.klaytn.foundation/).