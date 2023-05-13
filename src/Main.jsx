import React from "react";
import { Link } from "react-router-dom";

function Main() {
    return (
        <div>
            <h1>Document Signer</h1>
            <div>
                <h2>Issue document</h2>
                <Link to="/issue-document">Issue document</Link>
            </div>
            <div>
                <h2>Sign document</h2>
                <Link to="/sign-document">Sign document</Link>
            </div>
            <div>
                <h2>Retrieve document</h2>
                <Link to="/retrieve-document">Retrieve document</Link>
            </div>
        </div>
    );
}

export default Main;
