import { useEffect, useState } from "react";
import AdvertListItem from "../../components/adverts/AdvertListItem";
import EmptyList from "../../components/adverts/EmptyList";
import Layout from "../../components/layout/Layout";
import { getAdverts, getAllTags } from "./service";

export function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const [formData, setFormData] = useState({
    nameFilter: "",
    tagsFilter: [],
    saleFilter: "all",
  });

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
    const { name, value, type, checked } = event.target;

    if (name === "tagsFilter" && value === "") {
      setFormData((prevState) => ({
        ...prevState,
        tagsFilter: [],
      }));
    } else {
      if (type === "checkbox") {
        const updatedTags = checked ? [...formData.tagsFilter, value] : formData.tagsFilter.filter((tag) => tag !== value);

        setFormData((prevState) => ({
          ...prevState,
          tagsFilter: updatedTags,
        }));
      } else {
        const processedValue = value === "true" ? true : value === "false" ? false : value;
        setFormData((prevState) => ({
          ...prevState,
          [name]: processedValue,
        }));
      }
    }
  };

  const filteredAdverts = adverts.filter((advert) => {
    const nameMatch = advert.name.toLowerCase().startsWith(formData.nameFilter.toLowerCase());
    const saleMatch = formData.saleFilter === "all" || advert.sale === formData.saleFilter;
    const tagMatch = formData.tagsFilter.length === 0 || formData.tagsFilter.some((tag) => advert.tags.includes(tag));

    return nameMatch && saleMatch && tagMatch;
  });

  const handleClear = () => {
    event.preventDefault();
    setFormData({
      nameFilter: "",
      tagsFilter: [],
      saleFilter: "all",
    });
  };

  return (
    <>
      {adverts.length ? (
        <Layout title="Adverts">
          <div>
            <form id="advertFilters">
              <input name="nameFilter" type="text" value={formData.nameFilter} onChange={handleChange} />
              <select name="saleFilter" value={formData.saleFilter} onChange={handleChange}>
                <option value="all">All</option>
                <option value="true">Sale</option>
                <option value="false">Wanted</option>
              </select>
              <div>
                <label>
                  <input type="checkbox" name="tagsFilter" value="" checked={formData.tagsFilter.length === 0} onChange={handleChange} />
                  Any Tag
                </label>
                {allTags.map((tag) => (
                  <label key={tag}>
                    <input type="checkbox" name="tagsFilter" value={tag} checked={formData.tagsFilter.includes(tag)} onChange={handleChange} />
                    {tag}
                  </label>
                ))}
              </div>
              <button onClick={handleClear}>Clear</button>
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
