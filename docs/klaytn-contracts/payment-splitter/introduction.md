---
title: 💸 Payment Splitter Contract
sidebar_label: Introduction
---

## Introduction <a id="Introduction"></a>

Revenue sharing has traditionally been done manually, or through intermediaries, etc. in business environments when numerous parties are involved. This procedure has been hampered by delays, ineffectiveness, and even disputes between beneficiaries. Leveraging blockchain and smart contracts, this can be prevented by using the payment splitter contract. Payments can be automated with payment splitter contracts, ensuring that each party receives their just portion in an exact and transparent manner. 

In practice, when you create a project on the blockchain, the need to distribute smart-contract earnings to team members may arise. For example, a metaverse NFT marketplace project. This project may earn fees from trading (sell, buy, transfer, and so on), and each team member or stakeholder has a share. The Payment Splitter contract can be used to distribute each stakeholder's portion.

The Payment Splitter contract enables a group of people to split payments (native tokens and ERC20 tokens) in a secure and transparent manner. This split is made possible by providing the *payee* and the *share* in the contract. The payee is the person to whom you want to pay a certain amount, and the share is the percentage amount the payee will receive. It should be noted that the shares can be distributed in any random ratio or in equal parts.

With the use of payment splitter contracts, 
* The payee does not have to remind the payer of the amount owed on a regular basis.
* The payee cannot withdraw more than they are owed
* Transparency is promoted among team members.

## How it works <a id="How it works"></a> 

Each payee will be able to claim the amount due them from all payments received by the contract. The payment splitter contract follows the [pull method](https://river.com/learn/pull-system-vs-push-system/), which means that payee can safely pull funds out of the contract by calling the release function. 

This is how a payment splitter contract works on a high level:

1. Connect with other contracts which accumulates tokens (both ERC20 and native token) itself.
2. Add payee with share point on the contract
3. Contract receives payment
4. Tokens released to payees based on their shares by calling the release function

To learn more about Payment Splitter, check out the [Payment Splitter Repository](https://github.com/klaytn/klaytn-contracts/blob/master/contracts/finance/PaymentSplitter.sol).

## Usecase <a id="Usecase"></a>  

If revenue sharing is required, the payment splitter contract can be integrated with other contracts. The following are some examples of how a contract can accumulate tokens for itself before releasing them to payees:

1. Token Launch contract is getting fee from the transaction(sell, buy, transfer, etc) 
2. DeFi contract is getting the fee from the user's deposit and stake.
3. NFT Mint contract has some minting price and the contract is getting tokens from the minting transaction.
4. NFT Marketplace contract is getting fee from the tradings(sell, buy, transfer, etc) 
5. Team wants to distribute tokens to team members as monthly pay-check
6. A DEX wants to consolidate and distribute trading fees to certain participants 

For the aforementioned scenarios, the contracts must include functions for withdrawing accumulated tokens or releasing them to payees with shares. Using PaymentSplitter, the above contracts don’t need to have those functions; just connect with PaymentSplitter, add payees with shares and release it to the payees.



