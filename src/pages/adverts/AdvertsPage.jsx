import { useEffect, useState } from "react";
import AdvertListItem from "../../components/adverts/AdvertListItem";
import EmptyList from "../../components/adverts/EmptyList";
import Layout from "../../components/layout/Layout";
import { getAdverts, getAllTags } from "./service";

export function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [saleFilter, setSaleFilter] = useState("all");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTags();
        setAllTags(tags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };
    fetchTags();

    const fetchAdverts = async () => {
      try {
        const adverts = await getAdverts();
        setAdverts(adverts);
      } catch (error) {
        console.error("Failed to fetch adverts:", error);
      }
    };
    fetchAdverts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "saleFilter") {
      setSaleFilter(value === "all" ? "all" : value === "true");
    } else if (name === "tagFilter") {
      setTagFilter(value);
    } else {
      setNameFilter(value);
    }
  };

  const filteredAdverts = adverts.filter((advert) => {
    const nameMatch = advert.name.toLowerCase().startsWith(nameFilter.toLowerCase());
    const saleMatch = saleFilter === "all" || advert.sale === saleFilter;
    const tagMatch = !tagFilter || advert.tags.includes(tagFilter);

    return nameMatch && saleMatch && tagMatch;
  });

  return (
    <>
      {adverts.length ? (
        <Layout title="Adverts">
          <div>
            <form id="advertFilters">
              <input
                type="text"
                value={nameFilter}
                onChange={(event) => {
                  setNameFilter(event.target.value);
                }}
              />
              <select name="saleFilter" value={saleFilter} onChange={handleChange}>
                <option value="all">All</option>
                <option value="true">Sale</option>
                <option value="false">Wanted</option>
              </select>
              <select name="tagFilter" value={tagFilter} onChange={handleChange}>
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <ul>
            {filteredAdverts.map(({ id, ...advert }) => (
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
