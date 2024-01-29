import axios from "axios";
import { TCredentials } from "../Types/Auth";
import { TAnimal } from "../Types/Animal";
import { isExpired } from "react-jwt";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

const requestInterceptor = instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) throw Error("There is no token");
    if (token && !isExpired(token) && config) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    console.log(config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    return Promise.reject(error.response.data);
  }
);

const AuthAPI = {
  login: (credentials: TCredentials) => {
    instance.interceptors.request.eject(requestInterceptor);
    return instance.post("api/token/", credentials);
  },
};

const AnimalAPI = {
  createAnimal: (animal: TAnimal) =>
    instance.post("api/animals/create/", animal),

  deleteAnimal: (animalId: number) =>
    instance.delete(`api/animals/${animalId}`),
};

export { AuthAPI, AnimalAPI };
