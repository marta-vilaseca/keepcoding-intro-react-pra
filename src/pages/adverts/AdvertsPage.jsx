import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdvertListItem from "../../components/adverts/AdvertListItem";
import EmptyList from "../../components/adverts/EmptyList";
import { Button } from "../../components/common/Button";
import { Loader } from "../../components/common/Loader";
import { FormCheckbox } from "../../components/common/formElements/formCheckbox";
import { FormInputText } from "../../components/common/formElements/formInputText";
import { FormSelect } from "../../components/common/formElements/formSelect";
import Layout from "../../components/layout/Layout";
import { getAdverts, getAllTags } from "../../services/advertsService";
import "./advertsPage.css";

export function AdvertsPage() {
  const [error, setError] = useState(null);
  const [adverts, setAdverts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nameFilter: "",
    tagsFilter: [],
    saleFilter: "all",
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const tags = await getAllTags();
        setAllTags(tags);
      } catch (error) {
        setError(`Failed to fetch tags: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTags();

    const fetchAdverts = async () => {
      try {
        setIsLoading(true);
        const adverts = await getAdverts();
        setAdverts(adverts);
      } catch (error) {
        setError(`Failed to fetch adverts: ${error.message}`);
      } finally {
        setIsLoading(false);
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
    <Layout page="adverts">
      <div className="adverts__filter">
        <form>
          <FormInputText name="nameFilter" value={formData.nameFilter} onChange={handleChange} />
          <FormSelect name="saleFilter" value={formData.saleFilter} onChange={handleChange} options={{ all: "All", true: "For sale", false: "Wanted" }} />
          <div className="tag__options">
            <FormCheckbox key="any" id="any" labelText="any tag" name="tagsFilter" value="" checked={formData.tagsFilter.length === 0} onChange={handleChange} />
            {allTags.map((tag) => (
              <FormCheckbox key={tag} id={tag} labelText={tag} name="tagsFilter" value={tag} checked={formData.tagsFilter.includes(tag)} onChange={handleChange} />
            ))}
          </div>
          <Button onClick={handleClear}>Clear</Button>
        </form>
      </div>
      {isLoading && <Loader />}
      {adverts.length ? (
        <>
          {filteredAdverts.length > 0 ? (
            <ul className="adverts__list">
              {filteredAdverts.map(({ id, ...advert }) => (
                <AdvertListItem key={id} id={id} {...advert} />
              ))}
            </ul>
          ) : (
            !isLoading && (
              <EmptyList title="No ads found with these filters">
                <p>(Try removing some)</p>
              </EmptyList>
            )
          )}
        </>
      ) : (
        <>
          {error && (
            <div className="error-message" onClick={resetError}>
              ERROR: {error}
            </div>
          )}
          {!isLoading && (
            <EmptyList title="It seems like there are no ads yet!">
              <p>What do you think about creating one?</p>
              <Link to="/adverts/new" className="button__link">
                Create advert
              </Link>
            </EmptyList>
          )}
        </>
      )}
    </Layout>
  );
}
