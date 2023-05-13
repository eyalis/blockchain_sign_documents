import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Hidden,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const NavBar = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const shouldShowMenuItems = () => {
        return location.pathname !== "/";
    };

    const renderMenuItems = () => (
        <Box>
            <Button color="inherit" component={RouterLink} to="/issue-document">
                Issue Document
            </Button>
            <Button color="inherit" component={RouterLink} to="/sign-document">
                Sign Document
            </Button>
            <Button color="inherit" component={RouterLink} to="/retrieve-document">
                Retrieve Document
            </Button>
        </Box>
    );

    const renderDrawerMenuItems = () => (
        <List>
            {[
                { text: "Issue document", to: "/issue-document" },
                { text: "Sign document", to: "/sign-document" },
                { text: "Retrieve document", to: "/retrieve-document" },
            ].map((item, index) => (
                <ListItem
                    button
                    key={index}
                    component={RouterLink}
                    to={item.to}
                    onClick={handleDrawerToggle}
                >
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={styles.title}
                    >
                        Document Signer
                    </Typography>
                    <Hidden smDown>{shouldShowMenuItems() && renderMenuItems()}</Hidden>
                    <Hidden smUp>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                {renderDrawerMenuItems()}
            </Drawer>
        </div>
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
