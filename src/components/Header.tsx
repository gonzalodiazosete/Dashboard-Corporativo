import { useState } from "react";
import "../styles/Header.css"

// cabecera: logo y nombre a la izquierda, hora a la derecha
function Header () {

    // la hora es un estado para que la pantalla se repinte cada vez que cambie
    const [hora, setHora] = useState(() => new Date().toLocaleTimeString());
    setInterval(() => {
    setHora(new Date().toLocaleTimeString());
    }, 1000);

    return(
            <div className="header">
                {/* el logo está en la carpeta public, por eso la ruta empieza por / */}
                <div className="imagen">
                    <img src = "/bucks.png"></img>
                    <h1>Bucks</h1>
                </div>
                {/* aquí se pinta el estado de la hora */}
                <p className="hora">{hora}</p>
            </div>
    );
}

export default Header;