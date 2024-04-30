import { Link } from "react-router-dom";

export default function EmptyList() {
  return (
    <div>
      <p>¿Te animas a crear el primero?</p>
      <Link to="/adverts/new">
        <button>Crear anuncio</button>
      </Link>
    </div>
  );
}
