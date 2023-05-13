import React, { useState } from "react";
import { connectWallet } from "./web3Helper";
import { Wrapper, Container, Form, Input, Button } from "./styles/SignDocumentStyles";

const SignDocument = () => {
    const [documentId, setDocumentId] = useState("");
    const [signingStatus, setSigningStatus] = useState(null);
    const [signedAddresses, setSignedAddresses] = useState([]);
    const [ipfsHash, setIpfsHash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { web3Instance, account, contractInstance } = await connectWallet();
            await contractInstance.methods
                .signDocument(documentId)
                .send({ from: account, gas: 100000, gasPrice: web3Instance.utils.toWei("10", "gwei") });
            setSigningStatus("Signing successful");

            const documentInfo = await contractInstance.methods.getDocument(documentId).call();
            setIpfsHash(documentInfo[0]);

            const signers = await contractInstance.methods.getAuthorizedSigners(documentId).call();
            const signed = [];
            for (const signer of signers) {
                if (await contractInstance.methods.isDocumentSigned(documentId, signer).call()) {
                    signed.push(signer);
                }
            }
            setSignedAddresses(signed);
        } catch (error) {
            console.error("Error conectando la billetera o interactuando con el contrato:", error);
            setSigningStatus(`Signing failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <Container>
                <h2>Sign Document</h2>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Document ID"
                        value={documentId}
                        onChange={(e) => setDocumentId(e.target.value)}
                    />
                    <Button type="submit">Sign Document</Button>
                </Form>
                {isLoading && <p>Loading...</p>}
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
                        <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noreferrer">
                            https://ipfs.io/ipfs/{ipfsHash}
                        </a>
                    </div>
                )}
            </Container>
        </Wrapper>
    );
};

export default SignDocument;
