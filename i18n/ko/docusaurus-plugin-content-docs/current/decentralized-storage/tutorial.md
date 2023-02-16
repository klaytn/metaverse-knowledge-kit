---
title: Decentralized Storage
sidebar_label: IPFS Tutorial
---

# 💻 Tutorial <a id="IPFS Tutorial"></a>

In this tutorial, you will learn with a step-by-step guide how to install, spawn a node, add, retrieve, read files from IPFS using caver js. Furthermore, other possible means of integrating IPFS in your project will be highlighted.

## Prerequisites <a id="Prerequisites"></a> 

* [Node Js and NPM](https://kinsta.com/blog/how-to-install-node-js/)
* Install [caver-js](https://www.npmjs.com/package/caver-js)
* Subscribe to any Service Provider: You can integrate your IPFS project using any service provider. In this guide we will make use of [Infura](https://docs.infura.io/infura/getting-started) which gives access to project ID and Project Secret to connect your project to IPFS.

## Getting Started <a id="Getting Started"></a>

After successfully installing caver-js and generating your Project ID and Project Secret on Infura, you ll need to set up your script file in your working directory by following these steps:

* Create a scripts folder then create a new file named `caverIpfs.js`
* Paste the following code in the newly created file: The code snippet explains how to basically set connection with IPFS node, add file to IPFS, read file from IPFS.

```javascript

const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')


const ipfsConn = {
    host: 'ipfs.infura.io',
    port: 5001,
    https: true,
    projectId:'2GRIlYZcPcjuJFU79rzmWlhtst4' ,
    projectSecret: 'dd51f6cbc6b77076fba0e127f61ab284'
  }  

async function addFileToIpfs() {
     // Set connection with IPFS Node
    const options = caver.ipfs.createOptions({projectId: ipfsConn.projectId, projectSecret: ipfsConn.projectSecret});
    await caver.ipfs.setIPFSNode(ipfsConn.host, ipfsConn.port, ipfsConn.https, options)
    
    // Add a file to IPFS with file path
    const cid = await caver.ipfs.add('./file/ipfs.txt')
    console.log(`Contents uploaded to IPFS with CID ${cid}`)

    // Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy
}


async function addBufferFileToIpfs() {
     // Set connection with IPFS Node
    const options = caver.ipfs.createOptions({projectId: ipfsConn.projectId, projectSecret: ipfsConn.projectSecret});
    await caver.ipfs.setIPFSNode(ipfsConn.host, ipfsConn.port, ipfsConn.https, options)
    
     // Add a file to IPFS with file contents
    const contents = Buffer.from('Hello to my World!')
    const cid = await caver.ipfs.add(contents)
    console.log(`Contents uploaded to IPFS with CID ${cid}`)
}

async function getFileFromIpfs() {
    const options = caver.ipfs.createOptions({projectId: ipfsConn.projectId, projectSecret: ipfsConn.projectSecret});
    await caver.ipfs.setIPFSNode(ipfsConn.host, ipfsConn.port, ipfsConn.https, options)
    

    // Download a file from IPFS
    const cid = "Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy";
    const buffer = await caver.ipfs.get(cid)
    console.log(`Contents downloaded from IPFS: ${buffer.toString('utf8')}`)
}

async function convertCIDtoMultihash() {
    const options = caver.ipfs.createOptions({projectId: ipfsConn.projectId, projectSecret: ipfsConn.projectSecret});
    await caver.ipfs.setIPFSNode(ipfsConn.host, ipfsConn.port, ipfsConn.https, options)
    

    // Download a file from IPFS
    const cid = "Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy";
    
    const multihash = await caver.ipfs.toHex(cid)
    console.log(`multihash: ${multihash}`)
}


addFileToIpfs()
// addBufferFileToIpfs()
getFileFromIpfs()
// convertCIDtoMultihash()

```

* To execute the code above, run this command
    > node scripts/caverIpfs.js


![](/images/Ipfs/caverCID.png)

* Visualize on web: Once uploaded on IPFS, you can visualize it on your browser by adding the CID generated to this url

    > https://ipfs.io/ipfs/cid

    > Example: https://ipfs.io/ipfs/Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy


![](/images/Ipfs/visualizeIpfs.png)


## Other Methods <a id ="Other Methods"></a>

* [Run node and use API (Javascript)](https://docs.ipfs.tech/basics/js/js-ipfs/#install-js-ipfs): You will learn how to install and spawn a node using the available libraries, and add, retrieve, read, and remove files in javascript.
* [Desktop App](https://docs.ipfs.tech/basics/desktop-app/#install-ipfs-desktop): With IPFS Desktop, users can add, remove, and download a file using IPFS.
* [Infura](https://docs.infura.io/infura/networks/ipfs/how-to/authenticate-requests): You can integrate your IPFS project with Infura by following through the guide in the link.


:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at developers@klaytn.foundation
:::