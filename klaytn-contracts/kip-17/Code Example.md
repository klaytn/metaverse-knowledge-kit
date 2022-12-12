# Code Example

In this section, you will see a code example of a KIP17 contract and a script to interact with the contract.

### Basic KIP17 token[](#basic-kip17-token)

The code below defines a KIP17 token called. The contract uses the KIP17 and KIP17Enumerable contracts from the [Klaytn contracts library](https://github.com/klaytn/klaytn-contracts), as well as the Counters contract for managing token ID counters.

The contract has a constructor that initializes the KIP17 contract with the name "HappyMonkey" and the symbol "HM". It also increments the token ID counter to start at 1 (the default value is 0).

The contract defines two public functions, `withdraw` and `safeMint`, as well as several internal and override functions. The `withdraw` function allows the contract owner to withdraw any ether that is in the contract's balance. The `safeMint` function allows users to mint new tokens in the bundle, provided that the total supply is less than the maximum limit and the user sends at least the minimum required amount of ether.

The contract also overrides the `_baseURI` and `supportsInterface` functions from the KIP17 and `KIP17Enumerable` contracts, as well as the `_beforeTokenTransfer` function from the [KIP17 contract](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP17). These functions are used for various internal and utility purposes, such as setting the base URI for token metadata and checking if the contract supports a specific interface.

```solidity:
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17Enumerable.sol";
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

### Interact with caver.js[](#interact-with-caver.js)

In the code below, you can see how to use caver.js to interact with the HappyMonkey contract you created previously.

First, import caver.js and the contract `ABI`, which defines the functions and parameters of the HappyMonkey contract. Then, initialize `caver.js` and the HappyMonkey contract by providing the contract address.

Next, get the current account and balance of the contract using the `balanceOf` function of the KIP17 contract. Then, mint a new token in the HappyMonkey bundle using the `safeMint` function of the contract. You need to provide the recipient address and the minimum required amount of ether, as defined in the contract. Finally, we get the updated balance of the contract to verify that the token minting was successful.

Note that this code example is for illustration purposes only and may not be complete or fully functional. It is intended to give you an idea of how you can use caver.js to interact with a KIP17 contract on the Klaytn blockchain.

Get more details about caver.js API on [Klaytn Docs.](https://docs.klaytn.foundation/dapp/sdk/caver-js/api-references)

```javascript:
// Import caver.js and the HappyMonkey contract ABI
const Caver = require('caver-js');
const contractABI = require('./HappyMonkey.json');

// Initialize caver.js and the HappyMonkey contract
const caver = new Caver('https://api.baobab.klaytn.net:8651');
const contract = new caver.klay.Contract(contractABI, '0x...'); // Replace with the contract address

// Get the current account and balance of the contract
const account = caver.klay.accounts.wallet.add(caver.klay.accounts.create());
const balance = contract.methods.balanceOf(account.address).call();

// Mint a new token in the HappyMonkey bundle
await contract.methods.safeMint(account.address).send({
  from: account.address,
  value: caver.utils.toPeb("0.05", "KLAY"),
  gas: '250000000000',
});

// Get the updated balance of the contract
const updatedBalance = contract.methods.balanceOf(account.address).call();

console.log(balance);  // -> 0
console.log(updatedBalance);  // -> 1
```

Note that this code example is for illustration purposes only and may not be complete or fully functional. It is intended to give you an idea of how you can use caver.js to interact with a KIP17 contract on Klaytn.