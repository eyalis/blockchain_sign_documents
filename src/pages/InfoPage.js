import React from 'react';
import { Wrapper, Container } from '../styles/InfoStyles';

const InfoPage = () => {
    return (
        <Wrapper>
            <Container>
                <div className="info-content">
                    <h1>Document Signer</h1>
                    <h2>Introduction</h2>
                    <p>
                        This web application allows you to securely register and sign documents using blockchain technology.
                        The documents are stored on the IPFS network, which is a decentralized file storage system, and the metadata
                        of the documents, such as the IPFS hash, timestamp, and signatories, are stored on the Binance blockchain.
                        This ensures that the documents are tamper-proof and their integrity can be verified at any time.
                    </p>

                    <h2>Prerequisites</h2>
                    <p>To use this web application, you need:</p>
                    <ul>
                        <li><b>A Web3 enabled browser:</b> Modern browsers like Chrome, Firefox, or Edge with the MetaMask extension, or a dedicated Ethereum browser like Brave, are required.</li>
                        <li><b>An Ethereum Wallet:</b> To interact with the Ethereum blockchain, you need an Ethereum wallet. MetaMask is a user-friendly option and is available as a browser extension.</li>
                        <li><b>Binance coin (BNB):</b> To pay for transaction fees on the Ethereum network, also known as "gas", you need ETH. You can acquire ETH from various cryptocurrency exchanges.</li>
                        <li><b>An IPFS client (optional):</b> To upload your documents to IPFS and get an IPFS hash, you need an IPFS client. This is not required if you already have an IPFS hash for your document.</li>
                    </ul>

                    <h1>How to Use the Web Application</h1>
                    <h2>Register a Document</h2>
                    <ol>
                        <li>
                            Open the web application in your Web3 enabled browser.
                        </li>
                        <li>
                            Connect your Ethereum wallet when prompted.
                        </li>
                        <li>
                            In the "Register Document" section, enter the IPFS hash of the document you want to register.
                            This is a unique identifier provided by IPFS when you upload a document to their network.
                        </li>
                        <li>
                            Enter the addresses of the signers who are authorized to sign the document.
                        </li>
                        <li>
                            Click "Register Document". Confirm the transaction in your Ethereum wallet.
                        </li>
                        <li>
                            The application will provide you with a unique Document ID, which is used to reference the document in the future.
                        </li>
                    </ol>

                    <h2>Sign a Document</h2>
                    <ol>
                        <li>
                            In the "Sign Document" section, enter the Document ID of the document you want to sign.
                        </li>
                        <li>
                            Click "Sign Document". Confirm the transaction in your Ethereum wallet.
                        </li>
                        <li>
                            The application will show a "Signing successful" message once the transaction is confirmed.
                        </li>
                    </ol>

                    <h2>Retrieve a Document</h2>
                    <ol>
                        <li>
                            In the "Retrieve Document" section, enter the Document ID of the document you want to retrieve.
                        </li>
                        <li>
                            Click "Retrieve Document".
                        </li>
                        <li>
                            The application will display the IPFS hash, list of signers, issuer, timestamp, and signing status of the document.
                        </li>
                    </ol>

                    <h1>Use case</h1>
                    <p>
                        Let's say Alice has written a contract that she and Bob need to sign. Alice uploads the contract to IPFS and gets
                        an IPFS hash, then she opens our web application, connects her Ethereum wallet, and registers the document with
                        the IPFS hash and Bob's Ethereum address as the signer. The application provides her with a Document ID.
                    </p>
                    <p>
                        Later, Bob opens the application, connects his Ethereum wallet, and signs the document using the Document ID
                        provided by Alice. Once he confirms the transaction, the document is officially signed by him.
                    </p>
                    <p>
                        At any time, Alice, Bob, or anyone with the Document ID can retrieve the document details from the application.
                        They can use the IPFS hash to download the document from IPFS, and the application shows them the list of signers,
                        the issuer, the timestamp, and whether the document has been signed by all signers.
                    </p>
                    <p>
                        This ensures a transparent, auditable, and secure process for document registration and signing.
                    </p>
                    <h2>Example</h2>
                    <p>
                        Let's walk through an example:
                    </p>
                    <ol>
                        <li>
                            Connect your Metamask wallet by clicking the "Connect Wallet" button.
                        </li>
                        <li>
                            Register a document with the IPFS hash "QmNUwbYoT4yCDBv3dLq4XSKHJMLu3KnxRt2XHyErZKoLM2" and authorized signer as your Ethereum address.
                        </li>
                        <li>
                            After the document is successfully registered, you will receive a Document ID. Copy that ID.
                        </li>
                        <li>
                            Click "Sign Document", paste the Document ID and confirm the signature in your Metamask popup.
                        </li>
                        <li>
                            After the document is successfully signed, go to "Retrieve Document", paste the Document ID and click "Get Document".
                            You will see the IPFS hash, timestamp, and your address as the signer.
                        </li>
                    </ol>
                </div>
            </Container>
        </Wrapper >
    );
};

export default InfoPage;
