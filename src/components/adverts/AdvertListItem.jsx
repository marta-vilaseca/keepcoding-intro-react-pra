import P from "prop-types";
import { Link } from "react-router-dom";
import "./advertListItem.css";

export default function AdvertListItem({ id, name, price, sale, tags }) {
  return (
    <div className="advert__card">
      <span className="card__sale">{sale ? "Venta" : "Compra"}</span>
      <h3 className="card__title">
        <Link to={`/adverts/${id}`}>{name}</Link>
      </h3>
      <p className="card__price">{price} €</p>
      <ul className="card__tags">
        {tags.map((tag) => (
          <li key={tag} className="card__tag">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

AdvertListItem.propTypes = {
  name: P.string.isRequired,
  price: P.number.isRequired,
  sale: P.bool.isRequired,
  tags: P.arrayOf(P.string).isRequired,
};
