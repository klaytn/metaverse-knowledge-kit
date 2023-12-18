---
title: Decentralized Storage
sidebar_label: Indexing
---

# 👉 Indexing Decentralized Storages <a id="Indexing Decentralized Storages"></a>

import styles from "./indexing.module.css"

export const Item = ({ alt, children, flexGrow, src, style }) => (
  <div className={styles.images__container} style={{ flexGrow }}>
    <figure className={styles.images__figure} style={style}>
      <img className={styles.images__img} alt={alt} src={src} />
      <figcaption className={styles.images__figcaption}>{children}</figcaption>
    </figure>
  </div>
);

<section className={styles.images}>
  <Item
    alt="Website Index"
    flexGrow={1}
    src="/images/decentralized-storage/website-index.png"
    style={{ borderBottomWidth: "1px", borderLeftWidth: "2px", borderRightWidth: "2px", borderTopWidth: "1px", borderTopLeftRadius: "0.3rem" }}>
    Website Index
  </Item>
  <Item
    alt="Book Index"
    flexGrow={2}
    src="/images/decentralized-storage/book-index.png"
    style={{ borderTopWidth: "1px" }}>
    Book Index [<a href="https://www.pexels.com/photo/magnifying-glass-on-book-4494642">Pexels</a>]
  </Item>
</section>

## What are Indexes? <a id="What is an Index"></a>

[**Indexes**](https://en.wikipedia.org/wiki/Database_index) speed up the retrieval of data by reducing the number of reads required to find said data, often in *logarithmic* scales.
*E.g.*: to find an item in 1000 data points, indexes may only need 10 reads; in 1,000,000 data points, only 20 reads are needed.

**Indexes** can also organize data in a way that makes it easier to find specific data, like how books, search engines, & websites index topics (including this website!);
With Indexes, searches that take *minutes* can be reduced to *milliseconds* 👇.

## Why index Decentralized Storages? <a id="Why index Decentralized Storages"></a>

Blockchain data is stored in a distributed & sequential manner, which makes data retrieval *complex & slow*.

A common use case for [Real-World Assets](https://klaytn.foundation/from-traditional-to-digitalexploring-the-potential-and-power-of-rwa-tokenization) is tracing an NFT's origin. Without an index, you would need to scan through blocks one by one to find the transaction that created the NFT. If 1 million new transactions have been created since the NFT was minted, 1 million transactions need to be scanned. A slow & expensive operation is performed to retrieve a single line of data.

At the basic level, Blockchain Indexing services (or **Indexers**) read data points from the blockchain as they arrive & organizes them in a database. When a system or user requests data, the Indexer can quickly access the database & return the data to the requester, in logarithmic&nbsp;time&nbsp;⏱️.

Hold up. Bringing distributed data into a single database... Isn't that Centralization? Yes, but that's where Decentralized, [Oracle](/docs/category/-decentralized-oracle)-like Indexers come in: indexes are replicated across nodes & proof mechanisms are implemented while maintaining high-speed, low-cost read operations.

Decentralized Indexers enable blockchain's security to scale for 👆 **lots of data & realtime latency**.

## Popular Indexers <a id="Popular Indexers"></a>

These services provide indexes and/or tools to index data

1. [The Graph](https://thegraph.com)
2. [Subquery](https://subquery.network)
3. [Covalent](https://www.covalenthq.com)
4. [Goldsky](https://goldsky.com)
5. [Subsquid](https://subsquid.io)

:::info
If you have any questions, please join our [Discord server](https://discord.io/KlaytnOfficial), or send us an email at <developers@klaytn.foundation>
:::

<style>

</style>
