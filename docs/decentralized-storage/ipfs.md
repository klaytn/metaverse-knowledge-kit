---
title: Decentralized Storage
sidebar_label: IPFS Introduction
---

# What is IPFS? <a id="What is IPFS"></a>

[IPFS, or InterPlanetary File System](https://ipfs.io/), is a decentralized storage and communication protocol that allows users to store and share files and data on the decentralized web. IPFS is built on the principles of distributed networks, content-addressing, and [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer) communication, which enables users to access and share data in a secure manner.

# What makes IPFS special? <a id="What makes IPFS special"></a>

With IPFS peer-to-peer network, content is made available through nodes anywhere in the world. As part of IPFS in-built security feature, contents are cryptographically hashed resulting in **Content Identifier**(CID). This CID is a hash of the content in it rather than where it is located. This leads us to the concept of “Content Addressing”.

IPFS uses content addressing through hashing to identify content. This stands as a viable alternative to the [location addressing](https://www.computerlanguage.com/results.php?definition=location-based+addressing#:~:text=Identifying%20data%20by%20its%20physical,ppsx.) prone to censorship and single point of failure.

# Why is IPFS important for Metaverse? <a id="Why is IPFS important for Metaverse?"></a>


# What is pinning? <a id="What is pinning"></a>

Pinning is a mechanism that indicates to IPFS that a file should be retained or kept available. This can be done by running a local IPFS node and manually pinning the file, or by using a third-party pinning service.

# Why do we need pinning service? <a id="Why do we need pinning service"></a>

To utilize the storage capacity of nodes, IPFS puts in place a process where nodes clear out infrequently-used items to efficiently manage its storage size. This process is called [Garbage Collection](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)). 

As the node's datastore grows in size, a periodic garbage collection process will prune unpinned blocks, so you don't run out of disk space. To ensure that data persists on IPFS, and is not deleted during garbage collection, data can be pinned to one or more IPFS Nodes. 

# Pinning Service Providers <a id="Pinning Service Providers"></a>

These service providers run different nodes to pin data on these nodes for a fee
1. [Pinata](https://pinata.cloud/) 
2. [Web3.Storage](https://web3.storage/) 
3. [Filebase](https://filebase.com/)
4. [Infura](https://infura.io/)
5. [NFT.Storage](https://nft.storage/)
