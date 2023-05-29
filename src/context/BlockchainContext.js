import React from 'react';

console.log("Blockchain:", process.env.REACT_APP_BLOCKCHAIN);
console.log("Symbol:", process.env.REACT_APP_SYMBOL);

// Create a context with default values
const BlockchainContext = React.createContext({
    blockchain: process.env.REACT_APP_BLOCKCHAIN || 'Ethereum', // default blockchain
    symbol: process.env.REACT_APP_SYMBOL || 'ETH', // default symbol
});

export default BlockchainContext;
