import "../styles/EmployeeCard.css";

// los datos que recibe la tarjeta por props
interface Props {
    nombre: string;
    correo: string;
    ciudad: string;
}

// tarjeta de un empleado: es un componente porque se repite una vez por empleado
// no tiene lógica, solo recibe los datos y los pinta
function EmployeeCard({ nombre, correo, ciudad }: Props) {
    return (
        <div className="employee-card">
            <h3>{nombre}</h3>
            <p>{correo}</p>
            <p>{ciudad}</p>
        </div>
    );
}

export default EmployeeCard;