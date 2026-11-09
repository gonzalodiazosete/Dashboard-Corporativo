import "../styles/AssetCard.css";

// los datos que recibe la tarjeta de un activo por props
interface Props {
    titulo: string;
    precio: number;
    imagen: string;
}

// tarjeta de un activo: imagen, título, precio y una etiqueta si es caro
function AssetCard({ titulo, precio, imagen }: Props) {
    return (
        <div className="asset-card">
            <img src={imagen} alt={titulo}></img>
            <h3>{titulo}</h3>
            <p>{precio} $</p>

            {/* renderizado condicional: la etiqueta solo sale si el precio supera los 50$ */}
            {precio > 50 && <span className="alto-valor">Activo de Alto Valor</span>}
        </div>
    );
}

export default AssetCard;