import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Selecciona una opción:</h1>
            <ul>
                <li><Link to='/emitir-documento'>Emitir Documento</Link></li>
                <li><Link to='/firmar-documento'>Firmar Documento</Link></li>
                <li><Link to='/recuperar-documento'>Recuperar Documento</Link></li>
            </ul>
        </div>
    );
}

export default Home;
