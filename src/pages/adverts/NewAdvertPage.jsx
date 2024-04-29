import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";

export function NewAdvertPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    sale: false,
    tags: [],
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdAdvert = await createAdvert({ ...formValues, photo: inputFileRef.current.files[0] });
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const inputFileRef = useRef();

  const handleChange = (event) => {
    // const { name, value } = event.target;
    // setFormValues({ ...formValues, [name]: value });
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      if (checked) {
        setFormValues({ ...formValues, tags: [...formValues.tags, value] });
      } else {
        setFormValues({ ...formValues, tags: formValues.tags.filter((tag) => tag !== value) });
      }
    } else if (type === "radio") {
      setFormValues({ ...formValues, [name]: value === "true" });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  return (
    <>
      <h2>Create New Advert</h2>
      <form id="listing-creation-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div id="loader" className="hidden">
          <div className="loader"></div>
        </div>
        <p>
          <label className="form__label" htmlFor="name">
            Nombre <em>*</em>
          </label>
          <input onChange={handleChange} className="form__inputfield" type="text" id="name" name="name" value={formValues.name} required />
        </p>
        <p>
          <label className="form__label" htmlFor="price">
            Precio <em>*</em>
          </label>
          <input onChange={handleChange} className="form__inputfield" type="number" id="price" name="price" value={formValues.price} required />
        </p>
        <fieldset className="form__options">
          <span className="form__label">
            Tipo de anuncio <em>*</em>
          </span>
          <span className="options">
            <input onChange={handleChange} type="radio" id="venta" name="sale" value={true} checked={formValues.sale === true} />
            <label htmlFor="venta">Venta</label>
            <input onChange={handleChange} type="radio" id="compra" name="sale" value={false} checked={formValues.sale === false} />
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
        <button className="form__button" type="submit">
          Crear anuncio
        </button>
        <p className="form__footnote">
          <em>*</em> campos obligatorios
        </p>
      </form>
    </>
  );
}
