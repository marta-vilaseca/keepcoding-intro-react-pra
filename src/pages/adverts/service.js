import axios from "axios";

import { client } from "../../api/client";

const adsUrl = "/api/v1/adverts";

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
  formData.append("photo", adData.photo);

  return client.post(url, formData);
};
