import React, { useState } from 'react';
import { connectWallet } from './web3Helper'; // Importa la función connectWallet

const IssueDocument = () => {
    const [ipfsHash, setIpfsHash] = useState('');
    const [signers, setSigners] = useState('');
    const [documentId, setDocumentId] = useState(null);
    const [transactionInfo, setTransactionInfo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { web3Instance, account, contractInstance } = await connectWallet(); // Utiliza la función connectWallet
            const signersArray = signers.split(',').map((address) => address.trim());
            const result = await contractInstance.methods
                .registerDocument(ipfsHash, signersArray)
                .send({ from: account });

            const documentId = result.events.DocumentRegistered.returnValues.documentId;
            setDocumentId(documentId);
            setTransactionInfo(result);
        } catch (error) {
            console.error('Error conectando la billetera o interactuando con el contrato:', error);
        }
    };

    return (
        <div>
            <h2>Issue Document</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="IPFS Hash"
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Signers (comma separated)"
                    value={signers}
                    onChange={(e) => setSigners(e.target.value)}
                />
                <button type="submit">Issue Document</button>
            </form>
            {documentId && (
                <div>
                    <h3>Document Issued</h3>
                    <p>Document ID: {documentId}</p>
                </div>
            )}
            {transactionInfo && (
                <div>
                    <h3>Transaction Information</h3>
                    <p>Transaction Hash: {transactionInfo.transactionHash}</p>
                    <p>Block Number: {transactionInfo.blockNumber}</p>
                </div>
            )}
        </div>
    );
};

export default IssueDocument;
