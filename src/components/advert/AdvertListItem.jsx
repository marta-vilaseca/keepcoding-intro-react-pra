import P from "prop-types";

export default function AdvertListItem({ name, price, sale, tags, photo }) {
  return (
    <>
      <h3>{name}</h3>
    </>
  );
}

AdvertListItem.propTypes = {
  name: P.string.isRequired,
  price: P.string.isRequired,
  sale: P.bool.isRequired,
  tags: P.arrayOf(P.string).isRequired,
  photo: P.string,
};
