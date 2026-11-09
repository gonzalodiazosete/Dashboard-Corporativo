import "../styles/Canvas.css";
import Personal from "../views/Personal";
import Inventario from "../views/Inventario";
import Incidencias from "../views/Incidencias";

// props del Canvas: la sección que hay que mostrar
interface Props {
    seccion: string | null; // puede ser null porque al empezar no hay ninguna pantalla elegida
}

// panel central: según la sección pinta una vista u otra
function Canvas({ seccion }: Props) {
    return (
        <div className="canvas">
            {/* renderizado condicional: solo se pinta la vista que coincide con seccion */}
            {seccion === "Personal" && <Personal />}
            {seccion === "Inventario" && <Inventario />}
            {seccion === "Incidencias" && <Incidencias />}
        </div>
    );
}

export default Canvas;