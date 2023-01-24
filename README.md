# OffersChain

Every consumer wants to take best advantage of a competetive market. Many market players come together to create an Offer proposition for the end consumer. While this creates win-win situation for all, most of the time its also get limited to large players of the market.

## OffersChain democratize the way offers products are created, published, participated and validated 

### Current pain points and friction in the process

- Current eco-system requires **manual multi party contracts** spanning across the industry verticals ranging from banks, payment processors, lending instruments, ecommerce platforms and manufacturers, financial institutions and aggregators.

- Typically any offer involved multi-party contracts esp related to **subvention, transaction validations and further settlement / reconciliation** processes. Today agreeing to any such offer products is manual followed by system integrations for facilitating transaction.

- **Technical integration is also expensive in terms of investment, time and effort.** Also leads to lot of errors resulting financial losses.

- When there are scenarios wrt constraints applied on the offer such as max number of transactions or SKU, **transaction validation, offer locking and redemtion  becomes difficult** and such offers are required to be in tightly integrated and close loop business networks. 

- Due to these complexities, **small and medium scale participants get disadvantaged** as it poses limitations limitations in adoption or participating in a promotional program.

- **Ultimately a large number of common consumers fail to get advantage of a competetive market**

Below is a depiction of complex relationships and integration required within industry players.

![image](https://user-images.githubusercontent.com/26347728/210842965-79c6eaca-b961-4b44-b727-a3bf0f3e0e6b.png)


### Distributed ledger is a perfect fit to solve the issues.
#### Solution Concept - 

It’s a blockchain networks where offer contracts can be executed by the interested parties. 
- For example - a Mobile phone manufacturer is willing to invite other participants to offer cashbacks on Rupay cards and wants issuer banks, payment gateways and merchants to accept the deal and make it available on various payment gateways.

- The deal can be accepted over a blockchain smart contract and made available to consumers without any new / additional integrations.
 - Use Cases – 

-> Payment Instruments based offers – Credit / Debit Cards, UPI VPA, Wallets, NetBanking, Pay Later (BNPL), EMI, Loyalty points.

-> Offer proposals

-> Offer acceptance

-> Transaction validations, offer locking and redemptions


### High level business process
![image](https://user-images.githubusercontent.com/26347728/210930040-8b54fbf0-859e-4c9d-a814-f29cc81c6722.png)


- Blockchain Network – Permissioned private blockchain. Participants would be banks, payment gateways and acquirers, large merchants, eCommerce and marketplace portals, lenders of EMI and Pay Later, Loyalty platforms, payment networks and regulators as applicable.



![image](https://user-images.githubusercontent.com/26347728/210843066-f95cdff4-2d47-4805-8cb9-db5dcf42cefa.png)


### Follow the below sections to understand and potentially try out a PoC at your own.
- dapp - Includes client app that deployes contracts and test scripts 
- network - Includes steps to deploy a "near production grade" Besu private permissioned network in Azure cloud.

### Technology
- We selected Quorum blockchain technology specifically built for financial industry. It provides greater security and data privacy. We used Hyperledger Besu ethereum client and Tessera as transaction manager.
- This PoC uses QBFT consensys protocol

 https://consensys.net/quorum/
 
 https://besu.hyperledger.org/en/stable/private-networks/
 
 https://besu.hyperledger.org/en/stable/private-networks/concepts/poa/
 
 https://besu.hyperledger.org/en/22.4.4/Concepts/ArchitectureOverview/
 
 https://docs.tessera.consensys.net/en/stable/

- For deployment we used Azure cloud and kubernetes cluster.

- some case studies and real world implementations - 

https://www.jpmorgan.com/onyx/index

https://www.jpmorgan.com/onyx/liink.htm

https://www.galileoplatforms.com/


