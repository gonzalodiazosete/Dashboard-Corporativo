import { useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import "../styles/Personal.css";

// Personal es una vista porque es una pantalla completa
// la tarjeta es un componente porque es una pieza que se repite dentro de ella

// solo los campos de la API que necesito
interface User {
    id: number;
    name: string;
    email: string;
    address: { city: string };
}

function Personal() {
    // lista de empleados que devuelve la API (empieza vacía)
    const [usuarios, setUsuarios] = useState<User[]>([]);
    // true mientras esperamos la respuesta del servidor
    const [cargando, setCargando] = useState<boolean>(false);
    // texto que el usuario escribe en el buscador
    const [busqueda, setBusqueda] = useState<string>("");

    // petición GET al pulsar el botón; es async para esperar con await a que fetch termine
    // (ojo: aquí no controlo errores, en Inventario e Incidencias sí uso try/catch/finally)
    const cargarDatos = async () => {
        setCargando(true);
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        // json() convierte la respuesta en un array de objetos
        const datos = await respuesta.json();
        // guardo los datos en el estado y React repinta el componente
        setUsuarios(datos);
        setCargando(false);
    };

    // me quedo con los empleados cuyo nombre contiene lo escrito (todo en minúsculas)
    // no toco la lista original: creo una nueva en cada pintado, así al borrar vuelven todos
    const filtrados = usuarios.filter((u) =>
        u.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <div className="barra-busqueda">
                {/* cada vez que escribo se guarda en busqueda y se vuelve a filtrar */}
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                {/* al pulsar se piden los empleados a la API */}
                <button onClick={cargarDatos}>Cargar datos</button>
            </div>

            {/* renderizado condicional: el mensaje solo sale mientras carga */}
            {cargando && <p>Cargando datos del servidor…</p>}

            <div className="grid">
                {/* .map() crea una tarjeta por empleado y le pasa los datos por props,
                    key sirve para que React identifique cada tarjeta */}
                {filtrados.map((u) => (
                    <EmployeeCard
                        key={u.id}
                        nombre={u.name}
                        correo={u.email}
                        ciudad={u.address.city}
                    />
                ))}
            </div>
        </div>
    );
}

export default Personal;