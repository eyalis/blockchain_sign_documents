import React, { useState } from "react";
import { connectWallet } from "./web3Helper";
import DocumentInfo from "./pages/DocumentInfo";
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

    const handleGetDocument = async () => {
        if (!documentId) return;

        if (!contractInstance) {
            try {
                const { contractInstance } = await connectWallet();
                setContractInstance(contractInstance);

                const document = await contractInstance.methods
                    .getDocument(documentId)
                    .call();
                setDocumentInfo(document);

                const ipfsHash = document[0];
                const ipfsLink = `https://ipfs.io/ipfs/${ipfsHash}`;
                setIpfsLink(ipfsLink);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const document = await contractInstance.methods
                    .getDocument(documentId)
                    .call();
                setDocumentInfo(document);

                const ipfsHash = document[0];
                const ipfsLink = `https://ipfs.io/ipfs/${ipfsHash}`;
                setIpfsLink(ipfsLink);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Wrapper>
            <Container>
                <h2>Retrieve Document</h2>
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
                    <DocumentInfo document={documentInfo} ipfsLink={ipfsLink} />
                )}
            </Container>
        </Wrapper>
    );
};

export default RetrieveDocument;
