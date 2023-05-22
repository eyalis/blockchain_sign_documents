// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DocumentSigner is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _documentIds;

    // Estructura para almacenar información del documento
    struct Document {
        string ipfsHash;
        address owner;
        uint256 timestamp;
        mapping(address => bool) authorizedSigners;
        mapping(address => bool) signatures;
        address[] signerList;
    }

    // Mapeo de ID del documento a la estructura del Documento
    mapping(uint256 => Document) private _documents;

    // Evento para notificar cuando se registra un nuevo documento
    event DocumentRegistered(uint256 indexed documentId, string ipfsHash, address indexed owner, uint256 timestamp);
    // Evento para notificar cuando se agrega un firmante autorizado
    event SignerAuthorized(uint256 indexed documentId, address indexed signer);
    // Evento para notificar cuando un firmante autorizado firma un documento
    event DocumentSigned(uint256 indexed documentId, address indexed signer);

    constructor() ERC721("DocumentSigner", "DSG") {}

    function registerDocument(string memory ipfsHash, address[] memory signers) public {
        // Incrementar el ID del documento
        _documentIds.increment();

        // Asignar el nuevo ID del documento
        uint256 newDocumentId = _documentIds.current();

        // Crear un nuevo documento y almacenarlo en el mapeo
        Document storage document = _documents[newDocumentId];
        document.ipfsHash = ipfsHash;
        document.owner = msg.sender;
        document.timestamp = block.timestamp;

        // Agregar firmantes autorizados
        for (uint256 i = 0; i < signers.length; i++) {
            document.authorizedSigners[signers[i]] = true;
            document.signerList.push(signers[i]);
            emit SignerAuthorized(newDocumentId, signers[i]);
        }

        // Emitir el evento DocumentRegistered
        emit DocumentRegistered(newDocumentId, ipfsHash, msg.sender, block.timestamp);

        // Crear el token ERC721 y asignarlo al propietario del documento
        _mint(msg.sender, newDocumentId);
    }

    function getDocument(uint256 documentId) public view returns (string memory, address, uint256) {
        require(_exists(documentId), "DocumentSigner: El documento no existe");
        Document storage document = _documents[documentId];
        return (document.ipfsHash, document.owner, document.timestamp);
    }

    function isAuthorizedSigner(uint256 documentId, address signer) public view returns (bool) {
        require(_exists(documentId), "DocumentSigner: El documento no existe");
        return _documents[documentId].authorizedSigners[signer];
    }

    function signDocument(uint256 documentId) public {
        require(_exists(documentId), "DocumentSigner: El documento no existe");
        Document storage document = _documents[documentId];
        require(document.authorizedSigners[msg.sender], "DocumentSigner: No estas autorizado para firmar este documento");
        require(!document.signatures[msg.sender], "DocumentSigner: Ya firmaste este documento");

        document.signatures[msg.sender] = true;
        emit DocumentSigned(documentId, msg.sender);
    }

    function isDocumentSigned(uint256 documentId, address signer) public view returns (bool) {
        require(_exists(documentId), "DocumentSigner: El documento no existe");
        return _documents[documentId].signatures[signer];
    }

// Agregamos una función para obtener los firmantes autorizados
    function getAuthorizedSigners(uint256 documentId) public view returns (address[] memory) {
        require(_exists(documentId), "DocumentSigner: El documento no existe");
        return _documents[documentId].signerList;
    }
}
