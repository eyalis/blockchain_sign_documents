import React, { useState } from "react";
import { connectWallet } from './web3Helper'; //

const RetrieveDocument = () => {
    const [documentId, setDocumentId] = useState("");
    const [documentInfo, setDocumentInfo] = useState(null);
    const [ipfsLink, setIpfsLink] = useState(null);
    const [contractInstance, setContractInstance] = useState(null);

    const handleConnectWallet = async () => {
        try {
            const { contractInstance } = await connectWallet();
            setContractInstance(contractInstance);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetDocument = async () => {
        if (!documentId || !contractInstance) return;

        try {
            const document = await contractInstance.methods.getDocument(documentId).call();
            setDocumentInfo(document);

            const ipfsHash = document[0];
            const ipfsLink = `https://ipfs.io/ipfs/${ipfsHash}`;
            setIpfsLink(ipfsLink);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Retrieve Document</h2>
            {!contractInstance ? (
                <button onClick={handleConnectWallet}>Connect Wallet</button>
            ) : (
                <>
                    <div>
                        <label htmlFor="documentId">Document ID:</label>
                        <input type="text" id="documentId" onChange={(e) => setDocumentId(e.target.value)} />
                    </div>
                    <button onClick={handleGetDocument}>Get Document</button>

                    {documentInfo && (
                        <div>
                            <h3>Document Info:</h3>
                            <p>
                                <strong>IPFS Hash:</strong> {documentInfo[0]}
                            </p>
                            <p>
                                <strong>Owner:</strong> {documentInfo[1]}
                            </p>
                            <p>
                                <strong>Timestamp:</strong> {new Date(documentInfo[2] * 1000).toLocaleString()}
                            </p>

                            {ipfsLink && (
                                <p>
                                    <a href={ipfsLink} target="_blank" rel="noreferrer">
                                        View Document
                                    </a>
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default RetrieveDocument;
