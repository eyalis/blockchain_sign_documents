const DocumentInfo = ({ document, ipfsLink }) => {
    return (
        <div>
            <h3>Document Info:</h3>
            <p>
                <strong>IPFS Hash:</strong> {document[0]}
            </p>
            <p>
                <strong>Owner:</strong> {document[1]}
            </p>
            <p>
                <strong>Timestamp:</strong> {new Date(document[2] * 1000).toLocaleString()}
            </p>

            {ipfsLink && (
                <p>
                    <a href={ipfsLink} target="_blank" rel="noreferrer">
                        View Document
                    </a>
                </p>
            )}
        </div>
    );
};

export default DocumentInfo;
