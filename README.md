# Blockchain Document Signer

Author: Eyal Szewkis

## Demo

Check out the [demo](https://bc-document-signer.appspot.com/) of the web app.

## Introduction

Blockchain Document Signer is a web application that utilizes blockchain technology to securely store and manage digital documents. It provides three main features: Issue Document, Sign Document, and Retrieve Document.

### Issue Document

The "Issue Document" section allows users to record a document onto the blockchain. By providing an IPFS hash and a list of authorized signers' addresses, the document is stored in a tamper-proof manner on the blockchain. This ensures the document's authenticity and immutability.

### Sign Document

In the "Sign Document" section, users can digitally sign a document that has been issued on the blockchain. By entering the document ID and using a software wallet, users can add their digital signature to the document. The signing process is securely executed on the blockchain, providing a reliable and transparent verification mechanism.

### Retrieve Document

The "Retrieve Document" section enables users to access and view documents stored on the blockchain. By entering the document ID, users can retrieve the document's information, including the IPFS hash, owner, and timestamp. Additionally, if the document has authorized signers, their signing status is displayed, indicating whether each signer has signed the document or not.

## Smart Contract Interaction

The `web3Helper.js` component allows users to specify the contract and blockchain network they want to interact with. Modify the component to configure the smart contract address and network details according to your requirements.
