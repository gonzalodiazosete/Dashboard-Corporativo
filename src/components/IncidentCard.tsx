import "../styles/IncidentCard.css";

// los datos que recibe la tarjeta de una incidencia por props
interface Props {
    titulo: string;
    resuelta: boolean;
}

// tarjeta de una incidencia: cambia color, icono y texto según si está resuelta o pendiente
function IncidentCard({ titulo, resuelta }: Props) {
    return (
        // renderizado condicional: la clase (y con ella el color de fondo) cambia según el estado
        // uso el ternario (condición ? si es verdadera : si es falsa) porque hay dos opciones
        <div className={resuelta ? "incidencia-card resuelta" : "incidencia-card pendiente"}>
            {/* el icono también cambia según el estado */}
            <span className="icono">{resuelta ? "✅" : "⏳"}</span>
            <div>
                <h3>{titulo}</h3>
                <p>{resuelta ? "Resuelta" : "Pendiente"}</p>
            </div>
        </div>
    );
}

export default IncidentCard;