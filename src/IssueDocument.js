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

const IssueDocument = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [signers, setSigners] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const [transactionInfo, setTransactionInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { web3Instance, account, contractInstance } = await connectWallet();
      const signersArray = signers.split(",").map((address) => address.trim());
      const result = await contractInstance.methods
        .registerDocument(ipfsHash, signersArray)
        .send({ from: account });

      const documentId = result.events.DocumentRegistered.returnValues.documentId;
      setDocumentId(documentId);
      setTransactionInfo(result);
    } catch (error) {
      console.error("Error conectando la billetera o interactuando con el contrato:", error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <h2>Issue Document</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="IPFS Hash"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Signers (comma separated)"
            value={signers}
            onChange={(e) => setSigners(e.target.value)}
          />
          <Button type="submit">Issue Document</Button>
        </Form>
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
      </Container>
    </Wrapper>
  );
};

export default IssueDocument;
