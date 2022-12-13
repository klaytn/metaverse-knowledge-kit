# Introduction

### What is The Graph
[The Graph](https://thegraph.com/en/) is an open and decentralized indexing protocol and promote accessibility of decentralized apps via public and open APIs called subgraphs. Just like other indexing tools in centralized databases, The Graph is used to locate and retrieve data on the blockchain. At the time of writting, it supports only Ethereum network.
These open APIs (subgraphs) may be queried using GraphQL. The Graph also exposes public subgraphs like Uniswap, LivePeer and more. Subgraphs can be used by developers by simply making requests to their API URL.

### How it works
When using The Graph, everything starts with the subgraph manifest: it’s a set of subgraph descriptions that lead the protocol to learn how to index the blockchain data on Ethereum.
Thus, the subgraph manifest outlines the smart contracts that should be monitored for a particular subgraph and teaches The Graph the process of mapping event data versus the data that needs storage in its database.
The processes to index the queries are as follows:
![Architecture](https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FNYeqXyDmcl2fVVxglGsR%2Fuploads%2FGmB0tspGHx41n9clDGbS%2Fimage.png?alt=media&token=7f13712f-4f5f-4ea2-993a-60ab2f4b7df8)

-   Everything starts with a smart contract transaction

-   One or more events are generated during the transaction

-   The Graph's node in the middle constantly scans Ethereum for new blocks and the data they provide for the subgraph.

-   Graph Node searches these blocks for Ethereum events relating to a particular subgraph and executes the mapping handlers that was specified.

-   The dApp utilizes the GraphQL endpoint of The Graph's node to query the node for the data indexed from the blockchain. The Graph's node converts these GraphQL queries to SQL queries for its underlying data store to retrieve the necessary data.

-   The dApp now presents the data to the end-users via a valuable UI, which can then create new transactions in the protocol.

-   The entire cycle repeats.

Learn more about The Graph [here](https://thegraph.com/docs/en/cookbook/quick-start/).