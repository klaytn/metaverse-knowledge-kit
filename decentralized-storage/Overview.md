#Overview

In this section, we will discuss the key benefits of decentralized storage, provide some examples of decentralized storage systems, and explore some potential use cases and challenges for decentralized storage, including its importance for NFTs projects.

### Introduction

Decentralized storage is a type of storage system where data is distributed across a network of nodes or devices, rather than being stored on a central server or location. We can think of decentralized storage as a peer-to-peer network where members share their available disk space to create a shared global memory.

**Centralized vs decentralized storage**

There are few points that make decentralized storage relevant:

-   *data availability: o*n centralized storage, who works on HTTP methods, we upload files which resides on a specific location. If the files are deleted, we can get a 404 error. On decentralized storage, the files are hashed and uploaded to a decentralized storage (e.g IPFS or Swarm). As long as there's a validator, the files remain available.

-   *security*: most decentralized storage services offer file auto-encryption by default

-   *data integrity:* on centralized storage, if we modify a file on a particular link, the file remains available at the same link. On decentralized storage, when we upload a file, a hash is generated. When a modification is done on a file, it changes completely the hash of the file.

-   *sharding*: sharding means splitting files into little pieces and send them to different nodes to ensure no single node holds the complete dataset, eliminating the problems of censorship and privacy intrusion.

**Blockchain-based storage vs Contract-based storage**

There are two main ways to decentralize the storage: using blockchain-based persistence method or contract-based persistence method.

*Blockchain-based storage*: this method is quite similar to the web2 way of storing data. When the data (image, video,...) is stored, every node on the network needs to keep a copy of the data. This is method is used by [Arweave](https://www.arweave.org/).

*Contract-based storage*: instead of replicating the data across every node, only few nodes store a piece data for a specific period of time. The contract then can be renewed if the time period needs to be extended. Instead of the entire data set, the hash of where the data is located gets stored on-chain. [Filecoin](https://filecoin.io/), [Storj](https://storj.io/) or [Sia](https://sia.tech/) are using this method.