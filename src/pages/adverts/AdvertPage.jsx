import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultPhoto from "../../assets/no-photo.png";
// import { Button } from "../../components/common/Button";
import { ConfirmationButton } from "../../components/common/ConfirmationButton";
import { Loader } from "../../components/common/Loader";
import Layout from "../../components/layout/Layout";
import { deleteAdvert, getAdvert } from "../../services/advertsService";
import "./advertpage.css";

export function AdvertPage() {
  const [error, setError] = useState(null);
  const [advert, setAdvert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getAdvertFromService() {
      try {
        setIsLoading(true);
        const advert = await getAdvert(params.id);
        setAdvert(advert);
      } catch (error) {
        if (error.status === 404) {
          navigate("/404");
        } else {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getAdvertFromService();
  }, [params.id, navigate]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteAdvert(params.id);
      navigate("/adverts");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
    setShowConfirmDelete(false);
  };

  return (
    <>
      {isLoading && (
        <Layout page="individual">
          <Loader />
        </Layout>
      )}
      {advert && (
        <Layout title={advert.name} page="individual" showTitle>
          {error && (
            <div className="error-message" onClick={resetError}>
              ERROR {error.status}: {error.message}
            </div>
          )}
          <div className="advert__individual">
            <ConfirmationButton
              buttonClassName="button__delete"
              buttonText="Delete ad"
              dialogText="Are you sure you want to delete this ad?"
              confirmAction={handleDelete}
              confirmActionText="delete"
              cancelActionText="cancel"
            />
            {/* <Button onClick={confirmDelete} className="button__delete">
              Delete ad
            </Button> */}
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
              {advert.photo ? <img src={advert.photo} alt={advert.name} style={{ maxWidth: "100%" }} /> : <img src={defaultPhoto} alt="No photo provided" style={{ maxWidth: "100%" }} />}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
