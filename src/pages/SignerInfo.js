import React, { useEffect, useState } from 'react';
import { List, ListItem, SignerStatus } from "../styles/SignerInfoStyles"; // Define these styles as needed

const SignerInfo = ({ documentId, signers, contractInstance }) => {
    const [signerStatus, setSignerStatus] = useState([]);
    const [contractAddress, setContractAddress] = useState('');

    useEffect(() => {
        const fetchSignerStatus = async () => {
            try {
                const signerStatus = await Promise.all(
                    signers.map(signer => contractInstance.methods.hasSigned(documentId, signer).call())
                );
                setSignerStatus(signerStatus);
            } catch (error) {
                console.error("Error fetching signer status", error);
            }
        };

        fetchSignerStatus();
        setContractAddress(contractInstance._address);
    }, [documentId, signers, contractInstance]);

    return (
        <div>
            <h3>Authorized Signers</h3>
            <p>Contract Address: {contractAddress}</p>
            <List>
                {signers.map((signer, index) => (
                    <ListItem key={index}>
                        {signer}: {signerStatus[index] ? "Has signed" : "Has not signed"}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default SignerInfo;
