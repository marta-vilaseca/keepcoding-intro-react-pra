import P from "prop-types";
import { Link } from "react-router-dom";

export default function AdvertListItem({ id, name, price, sale, tags }) {
  return (
    <>
      <h3>
        <Link to={`/adverts/${id}`}>{name}</Link> <span>{sale ? "Venta" : "Compra"}</span>
      </h3>
      <p>{price} €</p>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </>
  );
}

AdvertListItem.propTypes = {
  name: P.string.isRequired,
  price: P.number.isRequired,
  sale: P.bool.isRequired,
  tags: P.arrayOf(P.string).isRequired,
};
