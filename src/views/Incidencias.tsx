import "../styles/Incidencias.css";
import IncidentCard from "../components/IncidentCard.tsx";
import { useState } from "react";

// cómo es una incidencia en mi app, con mis nombres
interface Incidencia {
    id: number;
    titulo: string;
    resuelta: boolean; // true = resuelta, false = pendiente
}

function Incidencias() {
    // lista de incidencias ya traducidas a mi forma (empieza vacía)
    const [listaIncidencias, setListaIncidencias] = useState<Incidencia[]>([]);
    // estamos cargando? al principio no
    const [cargando, setCargando] = useState(false);

    // pide las incidencias a la api, las traduce a mi forma y las guarda en el estado
    async function meterIncidencias() {
        setCargando(true); // empiezo a cargar, sale el mensaje
        try {
            // petición GET, _limit=8 hace que la API devuelva solo 8 tareas
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8");

            // si el servidor responde con error, lanzo una excepción para que la recoja el catch
            if (!respuesta.ok) {
                throw new Error("No se han podido cargar las incidencias");
            }

            const datos = await respuesta.json();

            // en la api la propiedad se llama completed, yo la llamo resuelta
            const incidencias: Incidencia[] = datos.map((incidenciaAPI: any) => {
                const incidencia: Incidencia = {
                    id: incidenciaAPI.id,
                    titulo: incidenciaAPI.title,
                    resuelta: incidenciaAPI.completed
                };
                return incidencia;
            });

            // guardo la lista traducida y React repinta
            setListaIncidencias(incidencias);
        } catch (error) {
            // si algo falla lo saco por consola
            console.error(error);
        } finally {
            // se ejecuta siempre, así el mensaje de carga desaparece aunque haya error
            setCargando(false);
        }
    }

    // si estamos cargando preparo el mensaje, si no se queda en null (no se pinta nada)
    let mensajeDeCarga = null;

    if (cargando === true) {
        mensajeDeCarga = <p>Cargando datos del servidor…</p>;
    }

    return (
        <div className="incidencias">
            {/* título y botón en la misma fila, el botón se desactiva mientras carga */}
            <div className="cabecera-vista">
                <h2>Incidencias</h2>
                <button onClick={() => meterIncidencias()} disabled={cargando}>Ver las incidencias</button>
            </div>

            {mensajeDeCarga}

            {/* una tarjeta por incidencia, con key para que React la identifique */}
            <div className="lista-incidencias">
                {listaIncidencias.map((i) => (
                    <IncidentCard key={i.id} titulo={i.titulo} resuelta={i.resuelta} />
                ))}
            </div>
        </div>
    );
}

export default Incidencias;