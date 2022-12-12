# Code Example


In this section, you will see a code example of a KIP37 contract and a script to interact with the contract.

### Basic KIP37 token

This code below defines a KIP37 token. The contract uses the KIP37 contract from the [Klaytn contracts library](https://github.com/klaytn/klaytn-contracts), as well as the Counters contract for managing token `ID counters.`

The contract has a `constructor` that initializes the KIP37 contract with the name "MultiTokenNFT". It also initializes a mapping to store the metadata `URIs` for each token, as well as a `token ID counter` to keep track of the tokens that have been minted.

The contract defines a `mintToken` function, which allows users to mint new tokens with `metadata URIs`. This function takes a `string` representing the token `metadata URI` and the amount of tokens to mint, and uses the `_mint` function of the KIP37 contract to create and mint the new tokens. The function also increments the token ID counter and stores the metadata URI in the mapping.

The contract also defines a `uri` function, which overrides the `uri` function of the KIP37 contract. This function retrieves the metadata URI for a given token ID from the mapping.

The contract also defines an internal `_setTokenUri` function, which is used to store the metadata URI for a given token ID in the mapping. This function is called by the `mintToken` function to set the metadata URI for each newly minted token.

```solidity:
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

### Interact with caver.js
In the code below, you can see how to use caver.js to interact with the KIP37 token we created previously. 

First, we import caver.js and the contract ABI, which defines the functions and parameters of the KIP37Token contract. Then, we initialize caver.js and the KIP37Token contract by providing the contract address.

Next, we get the current account using the accounts.create function of caver.js. Then, we mint a new token with a metadata URI using the mintToken function of the contract. We provide the metadata URI and the amount of tokens to mint, as well as the recipient address.

Finally, we get the metadata URI for the minted token using the uri function of the contract. We provide the token ID of the minted token, and the function retrieves the metadata URI from the contract's mapping.

Get more details about caver.js API on [Klaytn Docs](https://docs.klaytn.foundation/dapp/sdk/caver-js/api-references).

```javaScript:
// Import caver.js and the KIP37Token contract ABI
const Caver = require('caver-js');
const contractABI = require('./KIP37Token.json');

// Initialize caver.js and the KIP37Token contract
const caver = new Caver('https://api.baobab.klaytn.net:8651');
const contract = new caver.klay.Contract(contractABI, '0x...'); // Replace with the contract address

// Get the current account and balance of the contract
const account = caver.klay.accounts.wallet.add(caver.klay.accounts.create());
const balance = contract.methods.balanceOf(account.address).call();

// Mint a new token in the KIP37Token contract
const tokenURI = "https://mymetadata.com/myToken";
await contract.methods.mintToken(tokenURI, 1).send({
  from: account.address,
  gas: '250000000000',
});

// Get the updated balance of the contract
const updatedBalance = contract.methods.balanceOf(account.address).call();

// Get the metadata URI for the newly minted token
const tokenId = updatedBalance - balance;
const metadataURI = contract.methods.uri(tokenId).call();

console.log(balance);  // -> 0
console.log(updatedBalance);  // -> 1
console.log(metadataURI);  // -> "https://mymetadata.com/myToken"
```

Note that this code example is for illustration purposes only and may not be complete or fully functional. It is intended to give you an idea of how you can use caver.js to interact with a KIP37 contract on Klaytn.