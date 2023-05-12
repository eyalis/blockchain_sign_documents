import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { css } from "@emotion/react";
import CardItem from "./components/CardItem";
import image1 from "./assets/issue_document_woman.jpg";
import image2 from "./assets/sign_document_couple.jpg";
import image3 from "./assets/check_document_couple1.jpeg";

function Home() {
    return (
        <div>
            <Grid container sx={styles.gridContainer} spacing={8}>
                <Grid item xs={12} sm={4}>
                    <CardItem
                        to="/emitir-documento"
                        image={image1}
                        title="Issue document"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardItem
                        to="/firmar-documento"
                        image={image2}
                        title="Sign document"
                        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardItem
                        to="/recuperar-documento"
                        image={image3}
                        title="Retrieve document"
                        description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur investigud amidus." />
                </Grid>
            </Grid>
        </div>
    );
}

const styles = {
    gridContainer: css`
    padding: 24px;
    @media (min-width: 600px) {
      padding-left: 60px;
      padding-right: 60px;
    }
  `,
};

export default Home;
