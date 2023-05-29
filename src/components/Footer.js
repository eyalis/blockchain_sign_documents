import React from "react";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Box sx={styles.footer}>
            <Typography variant="body2" align="center" sx={styles.footerText}>
                2023 - {" "}
                <Link to="https://www.linkedin.com/in/eyal-szewkis/" target="_blank" rel="noopener">
                    Eyal Szewkis
                </Link>
                {" | "}
                <Link to="/info">
                    About this App
                </Link>
            </Typography>
        </Box>
    );
};

const styles = {
    footer: {
        backgroundColor: "#f5f5f5",
        padding: "20px",
        marginTop: "auto",
    },
    footerText: {
        fontSize: "12px",
    },
};

export default Footer;
