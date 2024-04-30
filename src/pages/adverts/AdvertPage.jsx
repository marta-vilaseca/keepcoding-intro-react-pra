import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultPhoto from "../../assets/no-photo.png";
import Layout from "../../components/layout/Layout";
import { getAdvert } from "./service";

export function AdvertPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [advert, setAdvert] = useState(null);

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

  return (
    <>
      {advert && (
        <Layout title={advert.name}>
          <p>Price: {advert.price}</p>
          <p>Type: {advert.sale ? "Venta" : "Compra"}</p>
          <p>Tags: {advert.tags.join(", ")}</p>
          {advert.photo ? <img src={advert.photo} alt={advert.name} style={{ maxWidth: "100%" }} /> : <img src={defaultPhoto} alt="Default" style={{ maxWidth: "100%" }} />}
        </Layout>
      )}
    </>
  );
}
