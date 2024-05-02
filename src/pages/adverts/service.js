import axios from "axios";

import { client } from "../../api/client";

const adsUrl = "/api/v1/adverts";
const tagsUrl = "/api/v1/adverts/tags";

export const getAdverts = () => {
  const url = `${adsUrl}`;
  return client.get(url);
};

export const getAdvert = (adId) => {
  const url = `${adsUrl}/${adId}`;
  return client.get(url);
};

export const createAdvert = (adData) => {
  const url = `${adsUrl}`;
  const formData = new FormData();

  formData.append("name", adData.name);
  formData.append("price", adData.price);
  formData.append("sale", adData.sale);
  formData.append("tags", adData.tags);
  if (adData.photo !== null && adData.photo !== undefined) {
    formData.append("photo", adData.photo);
  }

  return client.post(url, formData);
};

export const deleteAdvert = (adId) => {
  const url = `${adsUrl}/${adId}`;
  return client.delete(url);
};

export const getAllTags = () => {
  const url = `${tagsUrl}`;
  return client.get(url);
};
