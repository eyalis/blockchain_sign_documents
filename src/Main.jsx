import React from "react";
import { Link } from "react-router-dom";

function Main() {
    return (
        <div>
            <h1>Document Signer</h1>
            <div>
                <h2>Issue document</h2>
                <Link to="/emitir-documento">Issue document</Link>
            </div>
            <div>
                <h2>Firmar documento</h2>
                <Link to="/firmar-documento">Sign document</Link>
            </div>
            <div>
                <h2>Retrieve document</h2>
                <Link to="/recuperar-documento">Retrieve document</Link>
            </div>
        </div>
    );
}

export default Main;
