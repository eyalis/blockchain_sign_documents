import React, { useContext } from "react";
import BlockchainContext from '../context/BlockchainContext';
import { Box } from "@mui/material";
import { css } from "@emotion/react";

function BlockchainInfo() {
    const { blockchain, symbol } = useContext(BlockchainContext);
    return (
        <Box sx={styles.blockchainInfoBox}>
            Blockchain: {blockchain} ({symbol})
        </Box>
    );
}

const styles = {
    blockchainInfoBox: css`
        padding: 16px;
        font-size: 1.25rem;
        text-align: center;
        color: #333;
        background-color: #f9f9f9;
        margin-bottom: 24px;
    `,
};

export default BlockchainInfo;
