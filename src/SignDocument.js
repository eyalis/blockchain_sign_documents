import React, { useState } from 'react';
import { connectWallet } from './web3Helper'; // Importa la función connectWallet

const SignDocument = () => {
    const [documentId, setDocumentId] = useState('');
    const [signingStatus, setSigningStatus] = useState(null);
    const [signedAddresses, setSignedAddresses] = useState([]);
    const [ipfsHash, setIpfsHash] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { web3Instance, account, contractInstance } = await connectWallet(); // Utiliza la función connectWallet
            await contractInstance.methods.signDocument(documentId).send({ from: account });
            setSigningStatus('Signing successful');

            const documentInfo = await contractInstance.methods.getDocument(documentId).call();
            setIpfsHash(documentInfo[0]); // Actualiza esta línea para asignar el hash IPFS correctamente

            const signers = await contractInstance.methods.getAuthorizedSigners(documentId).call();
            const signed = [];
            for (const signer of signers) {
                if (await contractInstance.methods.isDocumentSigned(documentId, signer).call()) {
                    signed.push(signer);
                }
            }
            setSignedAddresses(signed);
        } catch (error) {
            console.error('Error conectando la billetera o interactuando con el contrato:', error);
            setSigningStatus('Signing failed');
        }
    };

    return (
        <div>
            <h2>Sign Document</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Document ID"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                />
                <button type="submit">Sign Document</button>
            </form>
            {signingStatus && <p>{signingStatus}</p>}
            {signedAddresses.length > 0 && (
                <div>
                    <h3>Signed Addresses</h3>
                    <ul>
                        {signedAddresses.map((address, index) => (
                            <li key={index}>{address}</li>
                        ))}
                    </ul>
                </div>
            )}
            {ipfsHash && (
                <div>
                    <h3>IPFS Document</h3>
                    <a href={`https://ipfsexplorer.online/ipfs/${ipfsHash}`} target="_blank" rel="noreferrer">
                        https://ipfsexplorer.online/ipfs/{ipfsHash}
                    </a>
                </div>
            )}
        </div>
    );
};

export default SignDocument;
