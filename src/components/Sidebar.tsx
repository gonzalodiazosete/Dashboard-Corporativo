import "../styles/Sidebar.css"

// props del Sidebar: una función que recibe el nombre de la sección
interface Props {
    setSeccion: (seccion: string) => void // aquí no pongo null porque los botones nunca harán que sea null
}

// menú de navegación con los tres botones
function Sidebar({ setSeccion }: Props) {
    return (
        <div className="sidebar">
            {/* al hacer clic se llama a setSeccion con su nombre,
                eso cambia el estado de App y se pinta la vista nueva */}
            <button onClick={() => setSeccion("Personal")}>Personal</button>
            <button onClick={() => setSeccion("Inventario")}>Inventario</button>
            <button onClick={() => setSeccion("Incidencias")}>Incidencias</button>
        </div>
    )
}

export default Sidebar;