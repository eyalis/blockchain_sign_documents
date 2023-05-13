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
                        to="/issue-document"
                        image={image1}
                        title="Issue document"
                        description="You can issue a document that will be recorded on a blockchain, allowing you to associate signatures from different addresses with an IPFS document, as well as determine who can sign." />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardItem
                        to="/sign-document"
                        image={image2}
                        title="Sign document"
                        description="You can sign a document using your digital signature, ensuring the authenticity and integrity of the content." />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CardItem
                        to="/retrieve-document"
                        image={image3}
                        title="Retrieve document"
                        description="You can retrieve a document by providing the necessary details, allowing you to access the content and verify its authenticity." />
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
