// Import Web3 library for interacting with Ethereum blockchain
import Web3 from "web3";
// Import the contract ABI (Application Binary Interface) from a JSON file
import CONTRACT_ABI from "./contractAbi.json";

// Define the contract address for the smart contract

// Ganache
// const CONTRACT_ADDRESS = "0xe13FB9A60DEe619f0E2ACa80F6B04a345217B7b7";

// Ganache seguro
// const CONTRACT_ADDRESS = "0xC0560029AAD5526722457D2994B4eC940aB2661a";

// BSC Testnet
const CONTRACT_ADDRESS = "0x6ACCd36a1A81D7D774c76E487716BA48C13D50c9";

// BNB mainnet
// const CONTRACT_ADDRESS = "0xe06ddc0f1838b36b4803D762A71F0c727A76FEBC";

// Function to connect the user's wallet
export const connectWallet = async () => {
    // Check if window.ethereum (MetaMask) is available
    if (window.ethereum) {
        // Create a new Web3 instance with the injected provider
        const web3Instance = new Web3(window.ethereum);
        // Request user's account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the first account in the user's wallet
        const account = accounts[0];
        // Create a contract instance with the ABI and contract address
        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        // Estimate minimum gas necessary for the transaction
        const gasEstimation = {
            registerDocument: async (ipfsHash, signers) => {
                return contractInstance.methods.registerDocument(ipfsHash, signers).estimateGas({ from: account });
            },
            signDocument: async (documentId) => {
                return contractInstance.methods.signDocument(documentId).estimateGas({ from: account });
            },
            getDocument: async (documentId) => {
                return contractInstance.methods.getDocument(documentId).estimateGas({ from: account });
            },
        };

        // Return the created Web3 instance, user's account and contract instance
        return { web3Instance, account, contractInstance, gasEstimation };
    } else {
        // Throw an error if MetaMask is not installed
        throw new Error("Please install MetaMask to use this application");
    }
};
