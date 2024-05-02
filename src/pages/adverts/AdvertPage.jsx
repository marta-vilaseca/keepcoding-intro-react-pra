import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultPhoto from "../../assets/no-photo.png";
import Layout from "../../components/layout/Layout";
import { deleteAdvert, getAdvert } from "./service";

export function AdvertPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [advert, setAdvert] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {advert && (
        <Layout title={advert.name}>
          <div>
            <button onClick={confirmDelete}>Borrar anuncio</button>
            <p>Price: {advert.price}</p>
            <p>Type: {advert.sale ? "Venta" : "Compra"}</p>
            <p>Tags: {advert.tags.join(", ")}</p>
            {advert.photo ? <img src={advert.photo} alt={advert.name} style={{ maxWidth: "100%" }} /> : <img src={defaultPhoto} alt="Default" style={{ maxWidth: "100%" }} />}
          </div>
          {showConfirmation && (
            <div>
              <p>Are you sure you want to delete this ad?</p>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          )}
        </Layout>
      )}
    </>
  );
}
