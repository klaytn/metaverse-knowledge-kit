# Tutorial

Let's suppose you have to add you avatar to IPFS in order to use it in your dApp. In this tutorial you will see how to achieve it using IPFS and web3.js.

### Prerequisites

You first need to install the `ipfs-http-client` library, as well as web3.js. You can do this using npm by running the following command:

```javascript:
npm install web3
npm install ipfs-http-client web3
```

Once you have installed these libraries, you can use them in your dApp to access the IPFS network and add an image to it. 

We first create instances of IPFS and *web3.js*, which allow us to interact with IPFS and the Klaytn network, respectively. We then use the fs module to read the image file from disk.
The add method from the ```ipfs-http-client``` library is used to add the image to IPFS. Finally, we use *web3.js* to store the IPFS hash of the image on Klaytn using a smart contract.
Here is the code example:

```
const Web3 = require('web3')
const IPFS = require('ipfs-http-client')
const fs = require('fs')

// Create an IPFS instance
const ipfs = IPFS('ipfs.infura.io', '5001', { protocol: 'https' })

// Create a web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider('https://api.baobab.klaytn.net:8651'))

async function main() {
  // Read the image file from disk
  const file = fs.readFileSync('myNFT.png')

  // Add the image to IPFS
  const image = await ipfs.add({
    content: file
  })

  // Get the IPFS hash of the image
  const ipfsHash = image.hash

  // Store the IPFS hash on Klaytn 
  const contract = new web3.eth.Contract(/* ... */)
  await contract.methods.setIpfsHash(ipfsHash).send({
    from: /* ... */
  })
}

```

 Please visit the [IPFS API documentation](https://docs.ipfs.tech/reference/) to get more details.
