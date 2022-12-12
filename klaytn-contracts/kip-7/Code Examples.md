In this section, you will see a code example of a KIP7 contract and a script to interact with the contract.

### Basic KIP7 token

The contract below defines a basic KIP7 token with the name "My KIP7 Token", the symbol "MKT", and 18 decimal places. The contract uses the KIP7 contract from the [Klaytn contracts library](https://github.com/klaytn/klaytn-contracts). The initial supply of the token is set in the contract's constructor, where we are minting 1 million tokens and sending them to the contract's creator. The `minToken` function allows to mint a certain amount of token to an address.

```solidity:
pragma solidity ^0.8.0;

import "https://github.com/klaytn/klaytn/blob/master/contracts/token/KIP7.sol";

contract MyKIP7Token is KIP7 {

    string public name = "My KIP7 Token";
    string public symbol = "MKT";
    uint8 public decimals = 18;

    constructor() public {
        // Set the initial supply of your token here
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals)));
    }
    
    function mintToken(address account, uint256 amount) public onlyOwner {
        _safeMint(account, amount);
    }
}
```
### Interact with caver.js
In the code below you have an example of how to use caver.js to interact with the KIP7 token we created before. 

First, we import caver.js and the contract ```ABI```, which defines the functions and parameters of the KIP7 contract. Then, we initialize caver.js and the KIP7 contract by providing the contract address.

Next, we get the current account and balance of the KIP7 token using the ```balanceOf``` function of the contract. Then, we transfer 100 tokens from the current account to another account using the transfer function of the contract. Finally, we get the updated balance of the KIP7 token to verify that the transfer was successful.

Get more details about ```caver.js``` API on [Klaytn Docs](https://docs.klaytn.foundation/dapp/sdk/caver-js/api-references).

```javascript:
// Import caver.js and the KIP7 contract ABI
const Caver = require('caver-js');
const contractABI = require('./MyKIP7Token.json');

// Initialize caver.js and the KIP7 contract
const caver = new Caver('https://api.baobab.klaytn.net:8651');
const contract = new caver.klay.Contract(contractABI, '0x...'); // Replace with the contract address

// Get the current account and balance of the KIP7 token
const account = caver.klay.accounts.wallet.add(caver.klay.accounts.create());
const balance = contract.methods.balanceOf(account.address).call();

// Transfer 100 tokens from the current account to another account
contract.methods.transfer('0x...', 100).send({
  from: account.address,
  gas: '250000000000',
});

// Get the updated balance of the KIP7 token
const updatedBalance = contract.methods.balanceOf(account.address).call();

console.log(balance);  // -> 100
console.log(updatedBalance);  // -> 0
```
Note that this code example is for illustration purposes only and may not be complete or fully functional. It is intended to give you an idea of how you can use caver.js to interact with a KIP7 contract on Klaytn.
