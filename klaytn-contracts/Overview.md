# Overview

###Smart contracts in the metaverse

The metaverse can run on web2 infrastructures or on the blockchain. Smart contracts allow to automate processes like trade and payments within a game and execute themselves only when certain predefined conditions are met.

Below are important elements that justify the use of smart contract in the metaverse:

-   **Truly own in-game assets**

In traditional gaming ecosystem, users don't own their in-game purchases. On the blockchain, NFTs can be used to represent in-game items, such as weapons, armor, costumes or something else and smart contracts will be used to govern transactions inside the game. All in-game assets of players bought using smart contracts are transferred to their public addresses.

-   **More secure gaming experience**

When players buy game digital items, storing them on-chain(so in their wallet) would prevent anyone from stealing or modifying their assets. This could create a more level playing field for all gamers.

-   **Create more value**

On the blockchain, players can trade or sell their game items, which could create additional revenue for developers and companies. NFTs could also help to attract new players to games, as they may be more interested in playing a game that allows them to own digital assets.

###

###Smart contracts on Klaytn

To write smart contracts, Klaytn currently supports [Solidity](https://github.com/ethereum/solidity) as the primary programming language. Solidity is adopted in Klaytn because it is a *de facto* standard contract programming language for Ethereum and has a large user base and an active community. The Klaytn team decided to provide the users with familiar development experience so that the Ethereum DApp developers could easily experiment with or migrate their existing smart contracts to Klaytn.

KIPs(Klaytn Improvement Proposal) are application-level standards in the Klaytn ecosystem (same as ERCs on Ethereum). KIP contracts were created by the Klaytn team to add more optional functions (e.g mint, burn and pause extensions) and to have a better experience using the standards. More details [here](https://kips.klaytn.foundation/).

So at Klaytn we have built [KIP7](https://kips.klaytn.foundation/KIPs/kip-7) which is similar to [ERC-20](https://eips.ethereum.org/EIPS/eip-20), [KIP17](https://kips.klaytn.foundation/KIPs/kip-17) similar to [ERC-721](https://eips.ethereum.org/EIPS/eip-721) and [KIP37](https://kips.klaytn.foundation/KIPs/kip-37) similar to [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) contract. Klaytn contracts library also utilizes the popular Ethereum based [OpenZeppelin library](https://github.com/OpenZeppelin/openzeppelin-contracts/) standardization.

In this section you will see what KIP contracts are and how to use it.