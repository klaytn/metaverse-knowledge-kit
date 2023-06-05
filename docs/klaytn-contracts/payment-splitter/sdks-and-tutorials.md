---
title: 💻 Tutorial
sidebar_label: Tutorial
---

In this guide, you will implement a PaymentSplitter into an  NFT contract using RemixIDE and caver-js.  

## 1. Prerequisites <a id="Prerequsite"></a> 

* [Remix IDE](https://docs.klaytn.foundation/content/dapp/tutorials/connecting-remix#connecting-klaytn-remix-using-kaikas) and [Kaikas](https://kaikas.zendesk.com/hc/en-us/articles/6657796272793-How-do-I-install-PC-Kaikas-)
* Enough test KLAY from [faucet](https://baobab.wallet.klaytn.foundation/faucet)
* [Node Js and NPM](https://kinsta.com/blog/how-to-install-node-js/)

## 2. Deploying NFT - Payment Splitter Smart contract <a id="Deploying NFT - Payment Splitter Smart contract"></a> 

This code below defines a KIP17 token and Payment Splitter contract. These contracts were derived from the [Klaytn contracts library](https://github.com/klaytn/klaytn-contracts).

The contract has a constructor that initializes the KIP17 contract with the name “HappyMonkey“ and symbol “HM”. It also initializes the paymentSplitter contract with the payee and shares arguments respectively.

The safeMint function allows users to mint new tokens provided that the total supply is less than the maximum limit and the user sends at least the minimum required amount of KLAY.

KLAY is sent  to the contracts when a user mints new tokens, and the payee can now pull money from the contracts by calling the `release` function depending on each payee's shares.

```javascript title="NFTPaymentSplitter.sol"
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
import "@klaytn/contracts/utils/Counters.sol";
import "@klaytn/contracts/finance/PaymentSplitter.sol";

contract HappyMonkey is KIP17, KIP17Enumerable, PaymentSplitter {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public MINT_PRICE = 0.05 * 10**18;
    uint public MAX_SUPPLY = 100;

    constructor(address[] memory _payees, uint256[] memory _shares) KIP17("HappyMonkey", "HM") PaymentSplitter(_payees, _shares) {
        // Start token ID at 1. By default it starts at 0.
        _tokenIdCounter.increment();
    }

    function safeMint(address to) public payable {
        require(totalSupply() < MAX_SUPPLY, "Can't mint anymore tokens.");

        require(msg.value >= MINT_PRICE, "Not enough ether sent.");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
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

## 3. Interacting with Payment Spitter smart contract functions <a id="Interacting with Payment Spitter smart contract functions"></a> 
To successfully interact with the already deployed contract, you'll need to install caver-js like we already did in previous KIP7 tutorial, you can visit this step if you have not installed caver js or skip it if otherwise.

After installing caver-js, you will need to follow these steps.

**a. Set up ABI folder**

Create a new file named paymentSplitter.json in the `abi` folder.

**b. Create your Scripts**

Create a new file named `paymentSplitter.js` in the scripts folder.

**c. Execute Scripts**

Paste the code below in your newly created `paymentSplitter.js` file. The code illustrates the use of caver.js to interact with the payment splitter contract previously created.

First, we import caver.js and the contract ABI, which defines the functions and parameters of the payment splitter contract. Then, we initialize caver.js and the KIP17 contract by providing the contract address.

Next we set the contract address, create and add keyring to enable users sign on using their own Klaytn account. Then, we call a safeMint function to mint tokens to a specified account. Next we call the release function to enable the payee to pull funds from the contract.

Finally, we checked the amount released to the payee using the `released` function.

```javascript title="paymentSplitter.js"
// Interact with payment splitter contract using caver-js

// Import caver.js and the paymentSplitter contract ABI
const Caver = require('caver-js')
const contractABI = require("../abi/paymentSplitter.json")

// Initialize caver.js and the paymentSplitter contract
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const contractAddr = "paste contract address"
const contract = caver.contract.create(contractABI, contractAddr);

// Create and add keyring
const keyring = caver.wallet.keyring.createFromPrivateKey('<Paste private key from Kaikas Wallet>')
caver.wallet.add(keyring)

// function to mintTokens 
// This ensures that  KLAY is in the contract
const mintTokens = async () => {
    const amountPayable =  caver.utils.convertToPeb('10', 'KLAY');
    contract.send({from: keyring.address, gas: 1500000, value: amountPayable}, 'safeMint', keyring.address)
    .then(receipt => {
        console.log(receipt);
    })
    .catch(err => {
        console.log(err);
    })
}

// function to pull payee's share from the contract
// Note anyone can call this function provided it is the payee's address
const releaseToPayee = async () => {
    const payeeAddress =  “<PASTE PAYEE ADDRESS>”;
    contract.send({from: keyring.address, gas: 1500000, value: 0}, 'release', payeeAddress)
    .then(receipt => {
        console.log(receipt);
    })
    .catch(err => {
        console.log(err);
    })
}


// function to get amount released to payee
const  getAmountReleased = async (addr) => {
    contract.methods.released(addr).call()
    .then(result => {
        console.log(result);
    })
 }


mintTokens();
// releaseToPayee();
// getAmountReleased("<PASTE PAYEE ADDRESS>");

```

To run this code, open your terminal and paste this command

```bash
node scripts/paymentSplitter.js
```





