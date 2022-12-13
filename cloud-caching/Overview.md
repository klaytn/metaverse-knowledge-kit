# Overview

**What is Web3 caching**

Caching is the process of storing copies of files in a cache, or temporary storage location, so that they can be accessed more quickly. A cache is just a temporary storage location for copies of data like HTML files, JavaScript or images. This allows future requests for data to be processed faster than if they were kept in the primary storage location. Caching can be used to reduce latency in many application workloads such as gaming, social networking or media sharing.

**Why do we need it**

On the blockchain, users make the call to the network via RPC (Remote Procedure Call), which is not faster. If we need to retrieve a one-year transaction, RPC calls would be not suitable for it. Instead, using a web3 caching would resolve this issue.

**Advantages of caching web3 data**

-   Fewer queries to the actual [blockchain network](https://www.leewayhertz.com/blockchain-use-cases/)

-   Faster access to data

-   More complex queries can be made to the caching layer using any DB, while queries are limited on the blockchain

-   Creates replica of blockchain data as backup.More user-friendly APIs can be exposed hence better access to the data.

**Web3 caching architecture**

Here is an example of an architecture of a web3 caching layer:

![Web3 caching architecture](https://app.gitbook.com/o/yW2pZk9dsEG42mS394aX/s/NYeqXyDmcl2fVVxglGsR/~/changes/Zc86R1c5mpMg7H4SfO3J/cloud-caching/overview)

**Caching best practices**

The validity of the data being being cached is really important when implementing a cache layer. A successful cache results in a high hit rate which means the data was present when fetched. A cache miss occurs when the data fetched was not present in the cache. Controls such as *TTLs* (Time to live) can be used to expire data. Another parameter to consider is whether or not the cache environment must be highly available. In-memory engines like Redis can achieve this. An In-Memory layer can be used as a standalone data storage layer in contrast to caching data from a primary location. An In-memory layer may be used to store data independently of caching it from a primary location. To determine if this is suitable, we need to establish an *RTO* (Recovery Time Objective) and *RPO* ( Recovery Point Objective) for the in-memory engine. Design strategies and characteristics of [different In-Memory engines](https://aws.amazon.com/elasticache/)  can be applied to meet most *RTO* and *RPO* requirements.