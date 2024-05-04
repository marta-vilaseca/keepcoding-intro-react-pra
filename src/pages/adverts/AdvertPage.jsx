import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultPhoto from "../../assets/no-photo.png";
import { Dialog } from "../../components/common/Dialog";
import Layout from "../../components/layout/Layout";
import { deleteAdvert, getAdvert } from "../../services/advertsService";
import "./advertpage.css";

export function AdvertPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [advert, setAdvert] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    async function getAdvertFromService() {
      try {
        const advert = await getAdvert(params.id);
        setAdvert(advert);
      } catch (error) {
        if (error.status === 404) {
          navigate("/404");
        }
      }
    }
    getAdvertFromService();
  }, [params.id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteAdvert(params.id);
      navigate("/adverts");
    } catch (error) {
      console.error("Failed to delete ad:", error);
    }
  };

  const confirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <>
      {advert && (
        <Layout title={advert.name} page="individual">
          <div className="advert__individual">
            <button onClick={confirmDelete} className="button__delete">
              Borrar anuncio
            </button>
            <div className="adv__ind__details">
              <p className="adv__ind__sale">{advert.sale ? "Venta" : "Compra"}</p>

              <ul className="adv__ind__tags">
                {advert.tags.map((tag) => (
                  <li key={tag} className="card__tag">
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="adv__ind__price card-price">{advert.price}&euro;</p>
            </div>
            <div className="adv__ind__photo">
              {advert.photo ? <img src={advert.photo} alt={advert.name} style={{ maxWidth: "100%" }} /> : <img src={defaultPhoto} alt="Default" style={{ maxWidth: "100%" }} />}
            </div>
          </div>
          {showConfirmDelete && <Dialog dialogText="Are you sure you want to delete this ad?" confirmAction={handleDelete} cancelAction={cancelDelete} />}
        </Layout>
      )}
    </>
  );
}
