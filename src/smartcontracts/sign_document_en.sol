// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DocumentSigner is ERC721, ReentrancyGuard, Ownable {
    // Max signers per document
    uint256 public constant MAX_SIGNERS = 10;

    // Structure to store document information
    struct Document {
        string ipfsHash;
        address owner;
        uint256 timestamp;
        mapping(address => bool) authorizedSigners;
        mapping(address => bool) signatures;
        address[] signerList;
    }

    // Mapping of document ID to Document structure
    mapping(uint256 => Document) private _documents;

    // Event to notify when a new document is registered
    event DocumentRegistered(
        uint256 indexed documentId,
        string ipfsHash,
        address indexed owner,
        uint256 timestamp
    );
    // Event to notify when an authorized signer is added
    event SignerAuthorized(uint256 indexed documentId, address indexed signer);
    // Event to notify when an authorized signer signs a document
    event DocumentSigned(uint256 indexed documentId, address indexed signer);

    constructor() ERC721("DocumentSigner", "DSG") {}

    function registerDocument(
        string memory ipfsHash,
        address[] memory signers
    ) public onlyOwner {
        require(signers.length > 0 && signers.length <= MAX_SIGNERS, 
        "DocumentSigner: Document must have at least one signer and not more than the maximum allowed");

        // Create a unique document ID based on sender's address and current block number
        uint256 newDocumentId = uint256(keccak256(abi.encodePacked(msg.sender, block.number)));

        // Create a new document and store it in the mapping
        Document storage document = _documents[newDocumentId];
        document.ipfsHash = ipfsHash;
        document.owner = msg.sender;
        document.timestamp = block.timestamp;

        // Add authorized signers
        for (uint256 i = 0; i < signers.length; i++) {
            document.authorizedSigners[signers[i]] = true;
            document.signerList.push(signers[i]);
            emit SignerAuthorized(newDocumentId, signers[i]);
        }

        // Emit the DocumentRegistered event
        emit DocumentRegistered(
            newDocumentId,
            ipfsHash,
            msg.sender,
            block.timestamp
        );

        // Create the ERC721 token and assign it to the document owner
        _mint(msg.sender, newDocumentId);
    }

    function transferDocumentOwnership(uint256 documentId, address newOwner) public onlyOwner {
        require(
            _exists(documentId),
            "DocumentSigner: The document does not exist"
        );
        _transfer(_documents[documentId].owner, newOwner, documentId);
        _documents[documentId].owner = newOwner;
    }

    function getDocument(
        uint256 documentId
    ) public view returns (string memory, address, uint256) {
        require(
            _exists(documentId),
            "DocumentSigner: The document does not exist"
        );
        Document storage document = _documents[documentId];
        return (document.ipfsHash, document.owner, document.timestamp);
    }

    function isAuthorizedSigner(
        uint256 documentId,
        address signer
    ) public view returns (bool) {
        require(
            _exists(documentId),
            "DocumentSigner: The document does not exist"
        );
        return _documents[documentId].authorizedSigners[signer];
    }

    function signDocument(uint256 documentId) public {
        require(
            _exists(documentId),
            "DocumentSigner: The document does not exist"
        );
        Document storage document = _documents[documentId];
        require(
            document.authorizedSigners[msg.sender],
            "DocumentSigner: You are not authorized to sign this document"
        );
        require(
            !document.signatures[msg.sender],
            "DocumentSigner: You have already signed this document"
        );

        document.signatures[msg.sender] = true;
        emit DocumentSigned(documentId, msg.sender);
    }

    function isDocumentSigned(
        uint256 documentId,
        address signer
    ) public view returns (bool) {
        require(
            _exists(documentId),
            "DocumentSigner: The document does not exist"
        );
        return _documents[documentId].signatures[signer];
    }

    // Add a function to get the authorized signers
    function getAuthorizedSigners(
        uint256 documentId
    ) public view returns (address[] memory) {
        require(
            _exists(documentId),
            "DocumentSigner: The document does not exist"
        );
        return _documents[documentId].signerList;
    }

    // Check if a signer has signed a document
    function hasSigned(uint256 documentId, address signer) public view returns (bool) {
        require(
            _exists(documentId),
            "DocumentSigner: The document does not exist"
        );
        return _documents[documentId].signatures[signer];
    }
}
