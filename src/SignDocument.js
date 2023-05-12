import React, { useState } from "react";
import { connectWallet } from "./web3Helper";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: sans-serif;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0062cc;
  }
`;

const SignDocument = () => {
    const [documentId, setDocumentId] = useState("");
    const [signingStatus, setSigningStatus] = useState(null);
    const [signedAddresses, setSignedAddresses] = useState([]);
    const [ipfsHash, setIpfsHash] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { web3Instance, account, contractInstance } = await connectWallet();
            await contractInstance.methods.signDocument(documentId).send({ from: account, gas: 100000, gasPrice: web3Instance.utils.toWei("10", "gwei") });
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

