---
title: KIP37
sidebar_label: Tutorial
---

# 💻 KIP37 Tutorial <a id="KIP37 Tutorial"></a>
In this guide, you will deploy a KIP37 contract on Remix IDE and then use caver-js to interact with it

## 1. Prerequisites <a id="KIP37 Tutorial Prerequsite"></a>

* [Remix IDE](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-remix#connecting-klaytn-remix-using-kaikas) and [Kaikas](https://kaikas.zendesk.com/hc/en-us/articles/6657796272793-How-do-I-install-PC-Kaikas-)
* Enough test KLAY from [faucet](https://baobab.wallet.klaytn.foundation/faucet)
* [Node Js and NPM](https://kinsta.com/blog/how-to-install-node-js/)

## 2. Deploying a KIP 37 smart contract <a id="Deploying KIP 37 Smart contract"></a>
This code below defines a KIP37 token. The contract uses the `KIP37` contract from the [Klaytn contracts library](https://github.com/klaytn/klaytn-contracts), as well as the `Counters` contract for managing token ID counters.

The contract has a constructor that initializes the KIP37 contract with the name "MultiTokenNFT". It also initializes a mapping to store the metadata URIs for each token, as well as a token ID counter to keep track of the tokens that have been minted.

The contract defines a mintToken function, which allows users to mint new tokens with metadata URIs. This function takes a string representing the token metadata URI and the amount of tokens to mint, and uses the `_mint` function of the KIP37 contract to create and mint the new tokens. The function also increments the token ID counter and stores the metadata URI in the mapping.

The contract also defines a uri function, which overrides the uri function of the KIP37 contract. This function retrieves the metadata URI for a given token ID from the mapping.

The contract also defines an internal _setTokenUri function, which is used to store the metadata URI for a given token ID in the mapping. This function is called by the `mintToken` function to set the metadata URI for each newly minted token.

``` javascript title="KIP37Token.sol"

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP37/KIP37.sol";
import "@klaytn/contracts/utils/Counters.sol";

contract KIP37Token is KIP37 {

    mapping (uint256 => string) private _tokenURIs;
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds; 

    constructor() KIP37("MultiTokenNFT") {} 

    function mintToken(string memory tokenURI, uint256 amount)
    public returns(uint256) { 
        uint256 newItemId = _tokenIds.current(); 
        _mint(msg.sender, newItemId, amount, "");
        _setTokenUri(newItemId, tokenURI); 
        _tokenIds.increment(); 
        return newItemId; 
    } 

    function uri(uint256 tokenId) override public view 
    returns (string memory) { 
        return(_tokenURIs[tokenId]); 
    } 
    
    function _setTokenUri(uint256 tokenId, string memory tokenURI)
    private {
         _tokenURIs[tokenId] = tokenURI; 
    } 
}

```

Refer to this [guide](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-remix#connecting-klaytn-remix-using-kaikas) to deploy the above contract on Klaytn using Remix IDE.

After you have successfully deployed your token contract, you should be able to copy the contract’s ABI and address. 

## 3. Interacting with KIP37 smart contract functions <a id="Interacting with KIP37 smart contract functions"></a>

To successfully interact with an already deployed contract, you'll need to install caver-js like we already did in previous KIP7 tutorial, you can visit this step if you have not installed caver js or skip it if otherwise.

After installing caver-js, you will need to follow these steps.

**a. Set up ABI folder**

Create a new file named `kip37Abi.json` in the `abi` folder. 

**b. Create your Scripts**

Create a new file named `kip37Caver.js` in the scripts folder. 

**c. Execute Scripts**

Paste the code below in your newly created `kip37Caver.js` file. The code illustrates the use of caver.js to interact with the KIP17 token previously created.

1. First, we import caver.js and the contract ABI, which defines the functions and parameters of the KIP7 contract. 
2. Initialize caver.js and the KIP7 contract by providing the contract address.
3. Set the contract address, create and add keyring to enable users sign on using their own Klaytn account. 
4. Call a balanceOf function to get a specified address token balance given its ID. 
5. Mint tokens to the sender of the transaction given the tokenURI and amount. 
6. Finally, we transfer tokens from the current account to another account given the token id, amount to transfer and bytes,  using the `safeTransferFrom` function of the contract.

``` javascript

// Interact with KIP37 contract using caver-js
// Import caver.js and the KIP7 contract ABI
const Caver = require('caver-js')
const contractABI = require("../abi/kip37Abi.json")

// Initialize caver.js and the KIP7 contract
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const contractAddr = "<Paste contract address>"
const contract = caver.contract.create(contractABI, contractAddr);

// Create and add keyring
const keyring = caver.wallet.keyring.createFromPrivateKey('<Paste private key from Kaikas Wallet>')
caver.wallet.add(keyring)

// function to mintTokens 
const mintTokens = async () => {

    contract.send({from: keyring.address, gas: 1500000, value: 0}, 'mintToken', "", 5)
    .then(receipt => {
        const id = receipt.events.TransferSingle.returnValues.id;
        getTokenBalance(keyring.address, id)
    })
    .catch(err => {
        console.log(err);
    })
}

// function to transfer tokens
const transferTokens = async () => {
    const recipientAddr = "paste recipient address";

    const recipientBalanceB4 = await contract.methods.balanceOf(recipientAddr, 2).call();
    console.log(recipientBalanceB4);

    // ensure to know the token ID you want to transfer and also ensure the from address has token balance
    contract.send({from: keyring.address, gas: 1500000, value: 0}, 'safeTransferFrom', keyring.address, recipientAddr, 2, 2, "0x")
    .then(receipt => {
        console.log(receipt);
        getTokenBalance(recipientAddr, 2);
    })
    .catch(err => {
        console.log(err);
    })

}
getTokenBalance(keyring.address, 2);
// mintTokens();
// transferTokens();

```
To run this code, open your terminal and paste this command

```javascrript
node ./scripts/kip37Caver.js
```

:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::