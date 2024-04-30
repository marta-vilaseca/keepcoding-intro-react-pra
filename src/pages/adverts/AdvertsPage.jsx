import { useEffect, useState } from "react";
import AdvertListItem from "../../components/adverts/AdvertListItem";
import EmptyList from "../../components/adverts/EmptyList";
import Layout from "../../components/layout/Layout";
import { getAdverts } from "./service";

export function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAdverts().then((adverts) => {
      setAdverts(() => {
        if (Math.random() > 0.9) {
          throw new Error("Ooops");
        }
        return adverts;
      });
    });
  }, []);

  return (
    <>
      {adverts.length ? (
        <Layout title="Adverts">
          <ul>
            {adverts.map(({ id, ...advert }) => (
              <li key={id}>
                <AdvertListItem id={id} {...advert} />
              </li>
            ))}
          </ul>
        </Layout>
      ) : (
        <Layout title="¡No hay anuncios todavía!">
          <EmptyList />
        </Layout>
      )}
    </>
  );
}
