import React, { useState } from "react";
import { connectWallet } from "./web3Helper";
import BlockchainInfo from './components/BlockchainInfo';
import { Grid } from "@mui/material";
import { css } from "@emotion/react";
import {
    Wrapper,
    Container,
    Form,
    Input,
    Button,
    ErrorMessage,
} from "./styles/SignDocumentStyles";


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
            const { web3Instance, account, contractInstance, gasEstimation } =
                await connectWallet();

            // Estimate necessary gas to operate the transaction
            const gas = await gasEstimation.signDocument(documentId);

            await contractInstance.methods
                .signDocument(documentId)
                .send({ from: account, gas: gas });
            setSigningStatus("Signing successful");

            const documentInfo = await contractInstance.methods
                .getDocument(documentId)
                .call();
            setIpfsHash(documentInfo[0]);

            const signers = await contractInstance.methods
                .getAuthorizedSigners(documentId)
                .call();
            const signed = [];
            for (const signer of signers) {
                if (
                    await contractInstance.methods.isDocumentSigned(documentId, signer).call()
                ) {
                    signed.push(signer);
                }
            }
            setSignedAddresses(signed);
        } catch (error) {
            console.error("Error conectando la billetera o interactuando con el contrato:", error);
            const errorMessage = error.message.split("{")[0].trim();
            setSigningStatus(`Signing failed: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <BlockchainInfo />
            <Grid container sx={styles.gridContainer} spacing={8}></Grid>
            <Container>
                <h2>Sign a Document</h2>

                <div>
                    <p>Here, you can digitally sign a document using a blockchain. But what does that mean?</p>

                    <p>Well, it means that you're adding a secure and tamper-proof record of your document to a blockchain system. It's like having an unforgeable digital signature! To sign your document, you'll need a software wallet like MetaMask or Trust Wallet. These wallets allow you to securely interact with the blockchain.</p>

                    <p>All you need to do is provide the document ID, and with just a click of a button, your signature will be added to the blockchain. You'll see a message saying "Signing successful" once the process is complete. How awesome is that?</p>

                    <p>Once you've signed the document, you can view it by clicking on the provided link. The link will take you to the IPFS (InterPlanetary File System) where your document is securely stored. It's like having a digital vault for your important files!</p>

                    <p>So go ahead, sign your document with confidence and enjoy the benefits of blockchain technology. Let's make your document signing experience secure and hassle-free!</p>
                </div>

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
                {signingStatus && <ErrorMessage>{signingStatus}</ErrorMessage>}
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

const styles = {
    gridContainer: css`
padding: 24px;
@media (min-width: 600px) {
  padding-left: 60px;
  padding-right: 60px;
}
`,
}


export default SignDocument;
