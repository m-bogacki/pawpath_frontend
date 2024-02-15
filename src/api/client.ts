import { TCredentials, TRegister, TToken } from "../Types/Auth";
import { TAnimal, TAnimalCare } from "../Types/Animal";
import { isExpired } from "react-jwt";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

const tokenFreeUrls = ["api/token/", "api/token/refresh/", "api/users/create/"];

instance.interceptors.request.use(
  (config) => {
    if (config.url && tokenFreeUrls.includes(config.url)) {
      return config;
    }
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) throw Error("There is no token");
    if (token && !isExpired(token) && config) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthAPI = {
  login: (credentials: TCredentials) => {
    return instance.post("api/token/", credentials);
  },
  refreshToken: (refresh: TToken) => {
    return instance.post("api/token/refresh/", { refresh: refresh });
  },
  signup: (credentials: TRegister) => {
    return instance.post("api/users/create/", credentials);
  },
  fetchUser: (userId: number) => {
    return instance.get(`api/users/${userId}/`);
  },
};

const AnimalAPI = {
  createAnimal: (animal: TAnimal) =>
    instance.post("api/animals/create/", animal),

  deleteAnimal: (animalId: number) =>
    instance.delete(`api/animals/${animalId}`),

  fetchAnimals: () => {
    return instance.get("api/animals/");
  },
};

const AnimalCareAPI = {
  fetchAnimalCareList: () => instance.get("api/animal-care/"),
  createAnimalCare: (animalCare: TAnimalCare) =>
    instance.post("api/animal-care/create/", animalCare),
  deleteAnimalCare: (animalCareId: number) =>
    instance.delete(`api/animal-care/${animalCareId}/`),
  fetchAnimalCare: (animalCareId: number) =>
    instance.get(`api/animal-care/${animalCareId}/`),
};

export { AuthAPI, AnimalAPI, AnimalCareAPI };
