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
  padding: 0.5rem;
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
        <Wrapper>
            <Container>
                <h2>Retrieve Document</h2>
                {!contractInstance ? (
                    <Button onClick={handleConnectWallet}>Connect Wallet</Button>
                ) : (
                    <>
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="documentId">Document ID:</label>
                            <Input type="text" id="documentId" onChange={(e) => setDocumentId(e.target.value)} />
                            <Button onClick={handleGetDocument}>Get Document</Button>
                        </Form>

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
            </Container>
        </Wrapper>
    );
};

export default RetrieveDocument;
