import React, { useState, useEffect } from "react";
import { connectWallet } from "./web3Helper";
import DocumentInfo from "./pages/DocumentInfo";
import SignerInfo from "./pages/SignerInfo";
import {
    Wrapper,
    Container,
    Form,
    Input,
    Button,
} from "./styles/RetrieveDocumentStyles";

const RetrieveDocument = () => {
    const [documentId, setDocumentId] = useState("");
    const [documentInfo, setDocumentInfo] = useState(null);
    const [ipfsLink, setIpfsLink] = useState(null);
    const [contractInstance, setContractInstance] = useState(null);
    const [signerInfo, setSignerInfo] = useState([]);

    useEffect(() => {
        (async () => {
            const { contractInstance } = await connectWallet();
            setContractInstance(contractInstance);
        })();
    }, []);

    const handleGetDocument = async () => {
        if (!documentId) return;

        if (!contractInstance) {
            try {
                const { contractInstance } = await connectWallet();
                setContractInstance(contractInstance);

                const document = await contractInstance.methods
                    .getDocument(documentId)
                    .call();

                const ipfsHash = document[0];
                const ipfsLink = `https://ipfs.io/ipfs/${ipfsHash}`;
                setIpfsLink(ipfsLink);

                // Update documentInfo
                setDocumentInfo({
                    ipfsHash: document[0],
                    owner: document[1],
                    timestamp: document[2]
                });

                // Get authorized signers
                const signers = await contractInstance.methods
                    .getAuthorizedSigners(documentId)
                    .call();

                // Check if each signer has signed the document
                const signerInfo = [];
                for (let i = 0; i < signers.length; i++) {
                    const isSigned = await contractInstance.methods
                        .isDocumentSigned(documentId, signers[i])
                        .call();
                    signerInfo.push({
                        signer: signers[i],
                        hasSigned: isSigned,
                    });
                }

                setSignerInfo(signerInfo);

            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const document = await contractInstance.methods
                    .getDocument(documentId)
                    .call();
                console.log("Document retrieved:", document);

                const ipfsHash = document[0];
                const ipfsLink = `https://ipfs.io/ipfs/${ipfsHash}`;
                setIpfsLink(ipfsLink);

                // Update documentInfo
                setDocumentInfo({
                    ipfsHash: document[0],
                    owner: document[1],
                    timestamp: document[2]
                });

                // Get authorized signers
                const signers = await contractInstance.methods
                    .getAuthorizedSigners(documentId)
                    .call();

                // Check if each signer has signed the document
                const signerInfo = [];
                for (let i = 0; i < signers.length; i++) {
                    const isSigned = await contractInstance.methods
                        .isDocumentSigned(documentId, signers[i])
                        .call();
                    signerInfo.push({
                        signer: signers[i],
                        hasSigned: isSigned,
                    });
                }

                setSignerInfo(signerInfo);

            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <Wrapper>
            <Container>
                <h2>Retrieve a Document</h2>

                <div>
                    <p>On this page, you can "retrieve" a document stored on the BNB Smart Chain. What does that mean? Well, it means you can access and view a document that has been recorded on the blockchain. Cool, right?</p>

                    <p>To retrieve a document, simply enter the document ID and click the "Get Document" button. The page will fetch the document information, including the IPFS hash, owner, and timestamp. You can click the IPFS hash link to view the document.</p>

                    <p>If the document has authorized signers, you'll also see a list of signers and their signing status. Each signer's address is checked to see if they have signed the document or not.</p>

                    <p>Please note that you'll need a software wallet to sign transactions and interact with the BNB Smart Chain. Make sure you have a compatible wallet set up before retrieving any documents.</p>

                    <p>That's it! Have fun retrieving your documents from the blockchain!</p>
                </div>


                <Form onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="text"
                        id="documentId"
                        placeholder="Document ID"
                        onChange={(e) => setDocumentId(e.target.value)}
                    />
                    <Button onClick={handleGetDocument}>Get Document</Button>
                </Form>
                {documentInfo && (
                    <div>
                        <p>IPFS Hash: <a href={ipfsLink} target="_blank">{documentInfo.ipfsHash}</a> </p>
                        <p>Owner: {documentInfo.owner}</p>
                        <p>Timestamp: {new Date(documentInfo.timestamp * 1000).toLocaleString()}</p>
                    </div>
                )}

                {Array.isArray(signerInfo) && signerInfo.length > 0 && (
                    <SignerInfo documentId={documentId} signers={signerInfo.map(signerData => signerData.signer)} contractInstance={contractInstance} />)}

            </Container>
        </Wrapper>
    );
};

export default RetrieveDocument;
