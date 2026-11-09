import { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Canvas from "./components/Canvas"
import './styles/index.css'

// App es el componente raíz: junta header, sidebar y canvas
function App() {

  // pantalla que se ve ahora mismo (empieza en null porque no quiero nada hasta pulsar un botón)
  // está en App porque es el padre de Sidebar (que lo cambia) y de Canvas (que lo lee)
  const [seccion, setSeccion] = useState<string | null>(null);
  
    return (
        <div className="principal">
            <Header></Header>
            <div className="abajo">
                {/* le paso a Sidebar por props la función para cambiar la sección */}
                <Sidebar setSeccion={setSeccion}></Sidebar>
                {/* le paso a Canvas por props la sección actual para elegir la vista */}
                <Canvas seccion={seccion}></Canvas>
            </div>
        </div>
    );
}

export default App
