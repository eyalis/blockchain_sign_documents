import React, { useState } from "react";
import { connectWallet } from "./web3Helper";
import { Wrapper, Container, Form, Input, Button } from "./styles/IssueDocumentStyles";

const IssueDocument = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [signers, setSigners] = useState("");
  const [documentId, setDocumentId] = useState(null);
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [authorizedSigners, setAuthorizedSigners] = useState([]);
  const [contractAddress, setContractAddress] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      const { web3Instance, account, contractInstance, gasEstimation } = await connectWallet();
      const signersArray = signers.split(",").map((address) => address.trim());

      setContractAddress(contractInstance.options.address);

      // Estimate necessary gas to operate the transaction
      const gas = await gasEstimation.registerDocument(ipfsHash, signersArray);
      const result = await contractInstance.methods
        .registerDocument(ipfsHash, signersArray)
        .send({ from: account, gas: gas });

      const documentId = result.events.DocumentRegistered.returnValues.documentId;
      setDocumentId(documentId);
      setAuthorizedSigners(signersArray);
      setTransactionInfo(result);
    } catch (error) {
      console.error("Error connecting wallet or interacting with contract:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <h2>Issue a Document</h2>

        <p>
          On this page, you can "issue" a document onto the BNB Smart Chain.
          What does that mean? Well, it essentially means that you're recording a document in a system
          that's nearly impossible to counterfeit or alter. Pretty cool, right?
        </p>
        <p>
          You just need to provide two things: an IPFS hash and the BNB addresses of the people
          authorized to sign the document. The IPFS hash is like an address that can be accessed
          to view your document, while the BNB addresses are like unique digital signatures for
          each person who needs to sign your document. Exciting stuff!
        </p>


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
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {documentId && (
          <div>
            <h3>Document Issued</h3>
            <p>Document ID: {documentId}</p>
            <p>IPFS Hash:
              <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noreferrer">
                {ipfsHash}
              </a></p>
            <p>Authorized Signers:</p>
            <ul>
              {authorizedSigners.map((signer, index) => (
                <li key={index}>{signer}</li>
              ))}
            </ul>
          </div>
        )}
        {transactionInfo && (
          <div>
            <h3>Transaction Information</h3>
            <p>Transaction Hash: {transactionInfo.transactionHash}</p>
            <p>Block Number: {transactionInfo.blockNumber}</p>
            <p>Contract Address: {contractAddress}</p>
          </div>
        )}
      </Container>
    </Wrapper>
  );
};

export default IssueDocument;
