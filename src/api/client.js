import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // 400/500 server error
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    // Request error
    return Promise.reject({ message: error.message });
  }
);

export const setAuthorizationHeader = (token) => (client.defaults.headers.common["Authorization"] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};

export const getUserName = async (token) => {
  try {
    const response = await client.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { username } = response;

    return username;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
