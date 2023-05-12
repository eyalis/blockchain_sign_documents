import React, { useState, useEffect } from "react";
import { connectWallet } from "./web3Helper";
import DocumentInfo from "./DocumentInfo";
import {
    Wrapper,
    Container,
    Form,
    Input,
    Button,
} from "./RetrieveDocumentStyles";

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

    useEffect(() => {
        if (!contractInstance) return;
        handleGetDocument();
    }, [contractInstance]);

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

                        {documentInfo && <DocumentInfo document={documentInfo} ipfsLink={ipfsLink} />}
                    </>
                )}
            </Container>
        </Wrapper>
    );

};

export default RetrieveDocument;
