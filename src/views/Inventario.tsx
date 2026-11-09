import "../styles/Inventario.css";
import AssetCard from "../components/AssetCard.tsx";
import { useState } from "react";

// cómo es un activo en mi app, con mis nombres
// así no dependo de cómo se llamen los campos en la API
interface Activo {
    id: number;
    titulo: string;
    precio: number;
    imagen: string;
}

function Inventario() {
    // lista de activos ya traducidos a mi forma (empieza vacía)
    const [listaActivos, setListaActivos] = useState<Activo[]>([]);
    // estamos cargando? al principio no
    const [cargando, setCargando] = useState(false);

    // pide los activos a la api, los traduce a mi forma y los guarda en el estado
    async function meterActivos() {
        setCargando(true); // empiezo a cargar, sale el mensaje
        try {
            // petición GET, limit=6 hace que la API devuelva solo 6 productos
            const respuesta = await fetch("https://fakestoreapi.com/products?limit=6");

            // si el servidor responde con error, lanzo una excepción para que la recoja el catch
            if (!respuesta.ok) {
                throw new Error("No se han podido cargar los activos");
            }

            const datos = await respuesta.json();

            // para cada producto de la api creo un activo con mis nombres
            const activos: Activo[] = datos.map((productoAPI: any) => {
                const activo: Activo = {
                    id: productoAPI.id,
                    titulo: productoAPI.title,
                    precio: productoAPI.price,
                    imagen: productoAPI.image
                };
                return activo;
            });

            // guardo la lista traducida y React repinta
            setListaActivos(activos);
        } catch (error) {
            // si algo falla (sin conexión, API caída...) lo saco por consola
            console.error(error);
        } finally {
            // se ejecuta siempre, haya ido bien o mal, así el mensaje de carga desaparece
            setCargando(false);
        }
    }

    // si estamos cargando preparo el mensaje, si no se queda en null (no se pinta nada)
    let mensajeDeCarga = null;

    if (cargando === true) {
        mensajeDeCarga = <p>Cargando datos del servidor…</p>;
    }

    return (
        <div className="inventario">
            {/* título y botón en la misma fila */}
            <div className="cabecera-vista">
                <h2>Inventario</h2>
                <button onClick={() => meterActivos()}>Ver los activos</button>
            </div>

            {mensajeDeCarga}

            {/* por cada activo una tarjeta, con key para que React la identifique */}
            <div className="activos">
                {listaActivos.map((a) => (
                    <AssetCard key={a.id} titulo={a.titulo} precio={a.precio} imagen={a.imagen} />
                ))}
            </div>
        </div>
    );
}

export default Inventario;