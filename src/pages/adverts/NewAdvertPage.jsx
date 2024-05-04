import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { createAdvert } from "../../services/advertsService";

export function NewAdvertPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sale: false,
    tags: [],
    photo: null,
  });
  const navigate = useNavigate();
  const inputFileRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (inputFileRef.current.files.length > 0) {
        const uploadedFile = inputFileRef.current.files[0];
        const allowedFormats = ["image/jpeg", "image/png"];

        if (allowedFormats.includes(uploadedFile.type)) {
          formData.photo = uploadedFile;
        } else {
          throw new Error("Invalid file format. Only JPEG and PNG images are allowed.");
        }
      }
      const createdAdvert = await createAdvert(formData);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  };

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
    <Layout title="Create New Advert">
      <form id="listing-creation-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div id="loader" className="hidden">
          <div className="loader"></div>
        </div>
        <p>
          <label className="form__label" htmlFor="name">
            Nombre <em>*</em>
          </label>
          <input onChange={handleChange} className="form__inputfield" type="text" id="name" name="name" value={formData.name} required />
        </p>
        <p>
          <label className="form__label" htmlFor="price">
            Precio <em>*</em>
          </label>
          <input onChange={handleChange} className="form__inputfield" type="number" id="price" name="price" value={formData.price} required />
        </p>
        <fieldset className="form__options">
          <span className="form__label">
            Tipo de anuncio <em>*</em>
          </span>
          <span className="options">
            <input onChange={handleChange} type="radio" id="venta" name="sale" value={true} checked={formData.sale === true} />
            <label htmlFor="venta">Venta</label>
            <input onChange={handleChange} type="radio" id="compra" name="sale" value={false} checked={formData.sale === false} />
            <label htmlFor="compra">Compra</label>
          </span>
        </fieldset>
        <p>
          <label className="form__label" htmlFor="photo">
            Foto{" "}
          </label>
          <input className="form__inputfield" type="file" ref={inputFileRef} id="photo" name="photo" accept="image/png, image/jpeg" />
        </p>
        <fieldset className="form__options">
          <span className="form__label">
            Tags <em>*</em>
          </span>
          <span className="options">
            <input onChange={handleChange} type="checkbox" id="lifestyle" name="tags" value="lifestyle" />
            <label htmlFor="lifestyle">Lifestyle</label>
            <input onChange={handleChange} type="checkbox" id="mobile" name="tags" value="mobile" />
            <label htmlFor="mobile">Mobile</label>
            <input onChange={handleChange} type="checkbox" id="motor" name="tags" value="motor" />
            <label htmlFor="motor">Motor</label>
            <input onChange={handleChange} type="checkbox" id="work" name="tags" value="work" />
            <label htmlFor="work">Work</label>
          </span>
        </fieldset>
        <button className="form__button" type="submit" disabled={buttonDisabled}>
          Crear anuncio
        </button>
        <p className="form__footnote">
          <em>*</em> campos obligatorios
        </p>
      </form>
    </Layout>
  );
}
