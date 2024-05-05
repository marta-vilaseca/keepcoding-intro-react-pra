import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdvertListItem from "../../components/adverts/AdvertListItem";
import EmptyList from "../../components/adverts/EmptyList";
import { Button } from "../../components/common/Button";
import { FormCheckbox } from "../../components/common/formCheckbox";
import { FormInputText } from "../../components/common/formInputText";
import { FormSelect } from "../../components/common/formSelect";
import Layout from "../../components/layout/Layout";
import { getAdverts, getAllTags } from "../../services/advertsService";
import "./advertsPage.css";

export function AdvertsPage() {
  const [error, setError] = useState(null);
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
        setError(`Failed to fetch tags: ${error.message}`);
      }
    };
    fetchTags();

    const fetchAdverts = async () => {
      try {
        const adverts = await getAdverts();
        setAdverts(adverts);
      } catch (error) {
        setError(`Failed to fetch adverts: ${error.message}`);
      }
    };
    fetchAdverts();
  }, []);

  const resetError = () => setError(null);

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
    const tagMatch = formData.tagsFilter.length === 0 || formData.tagsFilter.every((tag) => advert.tags.includes(tag));

    return nameMatch && saleMatch && tagMatch;
  });

  const handleClear = (event) => {
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
        <Layout page="adverts">
          <div className="adverts__filter">
            <form>
              <FormInputText name="nameFilter" value={formData.nameFilter} onChange={handleChange} />
              <FormSelect name="saleFilter" value={formData.saleFilter} onChange={handleChange} options={{ all: "All", true: "Sale", false: "Wanted" }} />
              <div className="tag__options">
                <FormCheckbox key="any" id="any" labelText="any tag" name="tagsFilter" value="" checked={formData.tagsFilter.length === 0} onChange={handleChange} />
                {allTags.map((tag) => (
                  <FormCheckbox key={tag} id={tag} labelText={tag} name="tagsFilter" value={tag} checked={formData.tagsFilter.includes(tag)} onChange={handleChange} />
                ))}
              </div>
              <Button onClick={handleClear}>Clear</Button>
            </form>
          </div>
          {filteredAdverts.length > 0 ? (
            <ul className="adverts__list">
              {filteredAdverts.map(({ id, ...advert }) => (
                <AdvertListItem key={id} id={id} {...advert} />
              ))}
            </ul>
          ) : (
            <EmptyList title="No se han encontrado anuncios con estos filtros">
              <p>(Prueba de quitar alguno)</p>
            </EmptyList>
          )}
        </Layout>
      ) : (
        <Layout page="adverts">
          {error && (
            <div className="error-message" onClick={resetError}>
              ERROR: {error}
            </div>
          )}
          <EmptyList title="¡No hay anuncios todavía!">
            <p>¿Te animas a crear el primero?</p>
            <Link to="/adverts/new" className="button__link">
              Crear anuncio
            </Link>
          </EmptyList>
        </Layout>
      )}
    </>
  );
}
