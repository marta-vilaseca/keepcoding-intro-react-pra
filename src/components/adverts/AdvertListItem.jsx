import P from "prop-types";
import { Link } from "react-router-dom";
import defaultPhoto from "../../assets/no-photo.png";
import "./advertListItem.css";

export default function AdvertListItem({ id, name, price, sale, photo, tags }) {
  return (
    <li className="advert__card">
      <span className="card__price">{price}&euro;</span>
      <div className="card__info">
        <span className="card__sale">{sale ? "For sale" : "Wanted"}</span>
        <h3 className="card__title">
          <Link to={`/adverts/${id}`}>{name}</Link>
        </h3>
      </div>
      <div className="card__photo">
        <Link to={`/adverts/${id}`}>{photo ? <img src={photo} alt={name} /> : <img src={defaultPhoto} alt="No photo provided" />}</Link>
      </div>
      <ul className="card__tags">
        {tags.map((tag) => (
          <li key={tag} className="card__tag">
            {tag}
          </li>
        ))}
      </ul>
    </li>
  );
}

AdvertListItem.propTypes = {
  id: P.string.isRequired,
  name: P.string.isRequired,
  price: P.number.isRequired,
  sale: P.bool.isRequired,
  photo: P.string,
  tags: P.arrayOf(P.string).isRequired,
};
