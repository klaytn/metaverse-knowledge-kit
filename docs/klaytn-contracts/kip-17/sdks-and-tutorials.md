---
title: KIP17
sidebar_label: Tutorial
---

# 💻 KIP17 Tutorial <a id="KIP17 Tutorial"></a>
In order to interact with deployed contracts using caver-js, you will need to follow these steps.

## 1. Prerequisite <a id="KIP17 Tutorial Prerequsite"></a>

* [Remix IDE](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-remix#connecting-klaytn-remix-using-kaikas) and [Kaikas](https://kaikas.zendesk.com/hc/en-us/articles/6657796272793-How-do-I-install-PC-Kaikas-)
* Enough test KLAY from [faucet](https://baobab.wallet.klaytn.foundation/faucet)
* [Node Js and NPM](https://kinsta.com/blog/how-to-install-node-js/)

## 2. Deploying KIP 17 Smart contract <a id="Deploying KIP 17 Smart contract"></a>
The code below defines a KIP17 token called. The contract uses the `KIP17` and `KIP17Enumerable` contracts from the [Klaytn contracts library](https://github.com/klaytn/klaytn-contracts), as well as the `Counters` and `Ownable` contract for managing token ID counters and access control

The contract has a constructor that initializes the KIP17 contract with the name "HappyMonkey" and the symbol "HM". It also increments the token ID counter to start at 1 (the default value is 0).

The contract defines two public functions, withdraw and safeMint, as well as several internal and override functions. The withdraw function allows the contract owner to withdraw any KLAY that is in the contract. The safeMint function allows users to mint new tokens in the bundle, provided that the total supply is less than the maximum limit and the user sends at least the minimum required amount of KLAY.

The contract also overrides the _baseURI and supportsInterface functions from the KIP17 and KIP17Enumerable contracts, as well as the _beforeTokenTransfer function from the [KIP17](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP17) contract. These functions are used for various internal and utility purposes, such as setting the base URI for token metadata and checking if the contract supports a specific interface.

```javascript title="KIP17Token.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/access/Ownable.sol";

contract HappyMonkey is KIP17, KIP17Enumerable, Ownable{

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public MINT_PRICE = 0.05 ether;
    uint public MAX_SUPPLY = 100;

    constructor() KIP17("HappyMonkey", "HM") {
        // Start token ID at 1. By default it starts at 0.
        _tokenIdCounter.increment();
    }

    function withdraw() public onlyOwner{
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

    // The following function is an override required by Solidity.
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

Refer to this [guide](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-remix#connecting-klaytn-remix-using-kaikas) to deploy the above contract on Klaytn using Remix IDE.

After you have successfully deployed your token contract, you should be able to copy the contract’s ABI and address. 

## 3. Interacting with KIP17 smart contract functions <a id="Interacting with KIP17 smart contract functions"></a>

To successfully interact with an already deployed contract, you'll need to install caver-js like we already did in previous KIP7 tutorial, you can visit this step if you have not installed caver js or skip it if otherwise.

After installing caver-js, you will need to follow these steps.

**a. Set up ABI folder**

Create a new file named `kip17Abi.json` in the helper folder. 

**b. Create your Scripts**

Create a new file named `kip17Caver.js` in the scripts folder. 

**c. Execute Scripts**

Paste the code below in your newly created `kip17Caver.js` file. The code illustrates the use of caver.js to interact with the KIP17 token previously created.

First, we import caver.js and the contract ABI, which defines the functions and parameters of the KIP7 contract. Then, we initialize caver.js and the KIP7 contract by providing the contract address.

Next we set the contract address, create and add keyring to enable users sign on using their own Klaytn account. Then, we call a balanceOf function to get a specified address token balance. Then, we minted tokens to a  specified account given the sender of this transaction is the creator of the contract. Finally, we transfer tokens from the current account to another account given the token id using the `safeTransferFrom`
function of the contract.

``` javascript
// Interact with KIP7 contract with caver-js

// Import caver.js and the KIP7 contract ABI
const Caver = require('caver-js')
const contractABI = require("../abi/kip17Abi.json")

// Initialize caver.js and the KIP7 contract
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const contractAddr = "paste contract address"
const contract = caver.contract.create(contractABI, contractAddr);

// Create and add keyring
const keyring = caver.wallet.keyring.createFromPrivateKey(“Paste private key from kaikas wallet”)
caver.wallet.add(keyring)

// function to get token balance
const  getTokenBalance = async (addr) => {
    contract.methods.balanceOf(addr).call()
    .then(result => {
        console.log(result);
    })
 }

// function to mintTokens 
const mintTokens = async () => {
    const recipientAddr = "paste recipient address";
    const amountPayable =  caver.utils.convertToPeb('0.05', 'KLAY');
    contract.send({from: keyring.address, gas: 1500000, value: amountPayable}, 'safeMint', keyring.address)
    .then(receipt => {
        console.log(receipt);
        getTokenBalance(keyring.address)
    })
    .catch(err => {
        console.log(err);
    })
}

// function to transfer tokens
const transferTokens = async () => {
    const recipientAddr = "paste recipient address";

    const recipientBalanceB4 = await contract.methods.balanceOf(recipientAddr).call();
    console.log(recipientBalanceB4);

    // ensure to know the token ID you want to transfer and also ensure the from address has token balance
    contract.send({from: keyring.address, gas: 1500000, value: 0}, 'safeTransferFrom', keyring.address, recipientAddr, 2)
    .then(receipt => {
        console.log(receipt);
        getTokenBalance(recipientAddr);
    })
    .catch(err => {
        console.log(err);
    })

}
// getTokenBalance(keyring.address);
mintTokens();
transferTokens();

```

To run this code, open your terminal and paste this command
> node ./scripts/kip17Caver.js


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::