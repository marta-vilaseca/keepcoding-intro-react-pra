import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdvertListItem from "../../components/advert/AdvertListItem";
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
    <div>
      <h2>Adverts</h2>
      <p>Test</p>
      <div className="tweetsPage">
        {adverts.length ? (
          <ul>
            {adverts.map(({ id, ...advert }) => (
              <li key={id}>
                <Link to={`/adverts/${id}`}>
                  <AdvertListItem {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          // <EmptyList />
          <p>No adverts</p>
        )}
      </div>
    </div>
  );
}
