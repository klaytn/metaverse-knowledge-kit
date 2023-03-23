---
title: Gaming SDK
sidebar_label: Create KIP17 tokens
---

# 👑 How to create KIP17 tokens <a id="How to use the KIP17 token"></a>

In this section you will see how to build a Unity project using the KIP17 (ERC-721) token standard on Klaytn.

## Getting Started <a id="Getting Started"></a>

Start by creating a new project by following the steps at the section [Create a new Unity project](./create-a-new-unity-project.md).
Make sure to install all dependencies to fix all bugs.

**Use the WebLogin prefab to enable web3 wallet connection**

Under **Assets** → **Web3Unity** → **Scenes**, double-click on **WebLogin**. This is the prefab used to connect a wallet in a WebGL project.

![](/images/chainsafe/12_webLogin.png)

Go to **File** → **Build Settings** → **WebGL** → **Switch Platform**

![](/images/chainsafe/13_webGL_switch.png)

From the same window, click on **Add Open Scenes** (top right) to add the Login scene as the first scene to appear when we run the project.

From the same window, click on **Player Settings** → **Player** → **Resolution and Presentation**, under **WebGL Template**, select the one with the same as our Unity version (WebGL 2020 for our case).

![](/images/chainsafe/14_webGL_template.png)

Go back to the Unity project. Under **Assets**, select **Scenes** and double-click on **SampleScene** to use it as our second scene (FYI the first one is the login scene).

Go to **File** → **Build Settings** → **Add Open Scenes**. The SampleScene will appear under the WebLogin scene. It means the SampleScene, where we will create the buttons to read and write to the contract, will be the next scene after the *WebLogin*. 

> Make sure the WebLogin scene is at the top because the order matters.

![](/images/chainsafe/15_add_openScenes.png)

# Create your contract <a id="Create your contract"></a>

* Open [Remix IDE](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null), install the [Klaytn Remix plugin](https://klaytn.foundation/using-klaytn-plugin-on-remix/) then paste the code below:


```javascript

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
//import "@klaytn/contracts/access/Ownable.sol;
import "@klaytn/contracts/utils/Counters.sol";

contract HappyMonkey is KIP17, KIP17Enumerable {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public MINT_PRICE = 0.05 ether;
    uint public MAX_SUPPLY = 100;

    constructor() KIP17("HappyMonkey", "HM") {
        // Start token ID at 1. By default is starts at 0.
        _tokenIdCounter.increment();
    }

    function withdraw() public {
        require(address(this).balance > 0, "Balance is zero");
        payable(msg.sender).transfer(address(this).balance);
    }

    function safeMint(address to) public payable {
        require(totalSupply() < MAX_SUPPLY, "Can't mint anymore tokens.");

        require(msg.value >= MINT_PRICE, "Not enough ether sent.");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://happyMonkeyBaseURI/";
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(KIP17, KIP17Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

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

> Find the ERC721 source code [here](https://github.com/davidrazmadzeExtra/ERC721_NFT/blob/main/HappyMonkey.sol)

* Compile your contract and deploy it to baobab testnet (get your faucet [here](https://baobab.wallet.klaytn.foundation/faucet)).

# Create your C# script on Unity  <a id="Create your C# script on Unity"></a>

Under **Project** window, right-click on **Scenes**, click on **Create** → **C# Script** Use the script below.

```java

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using System.Numerics;
using UnityEngine.UI;
using Newtonsoft.Json;

public class KIP17Example : MonoBehaviour
{
    // set chain: ethereum, polygon, klaytn, etc
    string chain = "klaytn";
    // set network mainnet, testnet
    string network = "testnet";
    // set contract address
    private string contract = "0x1625026Eb24A40728dC3c574d10Cf08ee38cBC9A";
    // set contract ABI
    private readonly string abi = "[{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"symbol\",\"type\":\"string\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\",\"signature\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\",\"signature\":\"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\",\"signature\":\"0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\",\"signature\":\"0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\",\"signature\":\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0x095ea7b3\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0x70a08231\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0x081812fc\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0xe985e9c5\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0x06fdde03\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0x8da5cb5b\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0x6352211e\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0x715018a6\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0x42842e0e\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"_data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0xb88d4fde\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0xa22cb465\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0x01ffc9a7\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0x95d89b41\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\",\"constant\":true,\"signature\":\"0xc87b56dd\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0x23b872dd\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0xf2fde38b\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"baseURI_\",\"type\":\"string\"}],\"name\":\"setBaseURI\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0x55f804b3\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"tokenURI\",\"type\":\"string\"}],\"name\":\"mintNFT\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0xeacabe14\"}]";
    // set rpc url endpoint
    //string rpc = "https://public-node-api.klaytnapi.com/v1/baobab";

    // Call the "owner" function with "10" as argument
    async public void GetOwner()
    {
        // function name
        string method = "owner";
        // arguments
        string args = "[]";
        try
        {
            string response = await EVM.Call(chain, network, contract, abi, method, args);
            Debug.Log(response);
        } catch(Exception e) 
        {
            Debug.LogException(e, this);
        }
    }
    
    // Call the "safeMint" function 
    async public void SafeMint()
    {
        // function name
        string method = "safeMint";
        // arguments
        string args = "[\"0x646268287Aa8A20947d781E845Cb9631A644D1E1\"]";
        // value in ston to add in the transaction 
        string value = "50000000000000000";
        // gas limit: REQUIRED
        string gasLimit = "1000000";
        // gas price: REQUIRED
        string gasPrice = "250000000000";

        try 
        {
            string response = await Web3GL.SendContract(method, abi, contract, args, value, gasLimit, gasPrice);
            Debug.Log(response);
        } catch(Exception e) 
        {
            Debug.LogException(e, this);
        }
    }
    
     // Call the "approve" function 
    async public void Approve()
    {
        // spender
        string to = "0x57468012dF29B5f1C4b5baCD1CD2F0e2eC323316";
        // token ID
        string tokenId = "1";
        // function name
        string method = "approve";
        string[] obj = {to, tokenId};
        // arguments
        string args = JsonConvert.SerializeObject(obj);
        // value in ston to add in the transaction 
        string value = "50000000000000000";
        // gas limit: REQUIRED
        string gasLimit = "1000000";
        // gas price: REQUIRED
        string gasPrice = "250000000000";

        try 
        {
            string response = await Web3GL.SendContract(method, abi, contract, args, value, gasLimit, gasPrice);
            Debug.Log(response);
        } catch(Exception e) 
        {
            Debug.LogException(e, this);
        }
    }
}


```

## Create the buttons <a id="Create buttons"></a>
We will create 2 buttons (*Owner* and *Mint*) on the UI to interact with our KIP17 token.
To create the buttons, follow the steps in the section [Custom Interaction with Login](./custom-interaction-with-login.md).

## Build and Run the project <a id="Build and Run the project"></a>
Go to **File** → **Build and Run**.

Click on **Login** to connect Metamask.

Click on **Mint** and confirm your transaction.

![](/images/chainsafe/31_kip17_mintFunc.png)

Here are the details of the transaction on [Klaytnscope](https://baobab.scope.klaytn.com/tx/0xa7adfe56dd7892679adb385e42ee22f969d8672668c3cc5d4c1baf8ee63cb98c?tabId=eventLog).

![](/images/chainsafe/32_kip17_tx.png)


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::