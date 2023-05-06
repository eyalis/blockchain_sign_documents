import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={RouterLink} to="/" sx={styles.title}>
                    Document Signer
                </Typography>
                <Button color="inherit" component={RouterLink} to="/emitir-documento">
                    Emitir documento
                </Button>
                <Button color="inherit" component={RouterLink} to="/firmar-documento">
                    Firmar documento
                </Button>
                <Button color="inherit" component={RouterLink} to="/recuperar-documento">
                    Recuperar documento
                </Button>
            </Toolbar>
        </AppBar>
    );
};

const styles = {
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "inherit",
    },
};

export default NavBar;
