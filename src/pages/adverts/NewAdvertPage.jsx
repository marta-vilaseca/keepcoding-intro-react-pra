import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { Loader } from "../../components/common/Loader";
import { FormCheckbox } from "../../components/common/formElements/formCheckbox";
import { FormFieldset } from "../../components/common/formElements/formFieldset";
import { FormInputText } from "../../components/common/formElements/formInputText";
import { FormRadioButton } from "../../components/common/formElements/formRadioButton";
import Layout from "../../components/layout/Layout";
import { createAdvert, getAllTags } from "../../services/advertsService";
import "./newAdvertPage.css";

export function NewAdvertPage() {
  const [error, setError] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: false,
    tags: [],
    photo: null,
  });
  const navigate = useNavigate();
  const inputFileRef = useRef();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const tags = await getAllTags();
        setAllTags(tags);
      } catch (error) {
        throw new Error("Failed to fetch tags. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTags();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (inputFileRef.current.files.length > 0) {
        const uploadedFile = inputFileRef.current.files[0];
        const allowedFormats = ["image/jpeg", "image/png"];

        if (allowedFormats.includes(uploadedFile.type)) {
          formData.photo = uploadedFile;
        } else {
          setIsLoading(false);
          throw new Error("Invalid file format. Only JPEG and PNG images are allowed.");
        }
      }
      const createdAdvert = await createAdvert(formData);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        navigate("/login");
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({ ...formData, tags: [...formData.tags, value] });
      } else {
        setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== value) });
      }
    } else if (type === "radio") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const buttonDisabled = !formData.name || !formData.price || formData.tags.length === 0;

  return (
    <Layout title="Create New Advert" page="createAdvert" showTitle>
      {isLoading && <Loader />}
      <form id="listing-creation-form" className="create-advert__form" onSubmit={handleSubmit} encType="multipart/form-data">
        <p>
          <label className="form__label" htmlFor="name">
            Nombre
          </label>
          <FormInputText onChange={handleChange} className="form__inputfield" id="name" name="name" value={formData.name} required />
        </p>
        <p>
          <label className="form__label" htmlFor="price">
            Precio
          </label>
          <FormInputText onChange={handleChange} className="form__inputfield" type="number" id="price" name="price" value={formData.price} required />
        </p>
        <FormFieldset className="form__options" labelText="Tipo de anuncio">
          <FormRadioButton onChange={handleChange} type="radio" id="venta" name="sale" value={true} checked={formData.sale === true} />
          <FormRadioButton onChange={handleChange} type="radio" id="compra" name="sale" value={false} checked={formData.sale === false} />
        </FormFieldset>
        <p>
          <label className="form__label" htmlFor="photo">
            Foto{" "}
          </label>
          <input className="form__inputfield" type="file" ref={inputFileRef} id="photo" name="photo" accept="image/png, image/jpeg" />
        </p>
        <FormFieldset className="form__options" labelText="Tags">
          {allTags.map((tag) => (
            <FormCheckbox key={tag} id={tag} labelText={tag} name="tags" value={tag} onChange={handleChange} />
          ))}
        </FormFieldset>
        <Button className="form__button" type="submit" disabled={buttonDisabled}>
          Crear anuncio
        </Button>
        {error && (
          <div className="error-message" onClick={resetError}>
            ERROR: {error.message}
          </div>
        )}
      </form>
    </Layout>
  );
}
