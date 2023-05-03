import React from "react";
import { Link } from "react-router-dom";

function Main() {
    return (
        <div>
            <h1>Document Signer</h1>
            <div>
                <h2>Emitir documento</h2>
                <Link to="/emitir-documento">Emitir documento</Link>
            </div>
            <div>
                <h2>Firmar documento</h2>
                <Link to="/firmar-documento">Firmar documento</Link>
            </div>
            <div>
                <h2>Recuperar información de documento</h2>
                <Link to="/recuperar-documento">Recuperar información de documento</Link>
            </div>
        </div>
    );
}

export default Main;
