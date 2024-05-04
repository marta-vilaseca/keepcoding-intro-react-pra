import { client } from "../api/client";

const adsUrl = "/api/v1/adverts";
const tagsUrl = "/api/v1/adverts/tags";

export const getAdverts = async () => {
  const response = await client.get(adsUrl);
  return response;
};

export const getAdvert = async (adId) => {
  const response = await client.get(`${adsUrl}/${adId}`);
  return response;
};

export const createAdvert = async (adData) => {
  const response = await client.post(adsUrl, adData, { headers: { "Content-type": "multipart/form-data" } });
  return response;
};

export const deleteAdvert = async (adId) => {
  const response = await client.delete(`${adsUrl}/${adId}`);
  return response;
};

export const getAllTags = async () => {
  const response = await client.get(tagsUrl);
  return response;
};
