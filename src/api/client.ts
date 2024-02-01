import axios from "axios";
import { TCredentials, TRegister, TToken } from "../Types/Auth";
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthAPI = {
  login: (credentials: TCredentials) => {
    instance.interceptors.request.eject(requestInterceptor);
    return instance.post("api/token/", credentials);
  },
  refreshToken: (refresh: TToken) => {
    instance.interceptors.request.eject(requestInterceptor);
    return instance.post("api/token/refresh/", { refresh: refresh });
  },
  signup: (credentials: TRegister) => {
    instance.interceptors.request.eject(requestInterceptor);
    return instance.post("api/users/create/", credentials);
  },
  fetchUser: (userId: number) => {
    return instance.get(`api/users/${userId}`);
  },
};

const AnimalAPI = {
  createAnimal: (animal: TAnimal) =>
    instance.post("api/animals/create/", animal),

  deleteAnimal: (animalId: number) =>
    instance.delete(`api/animals/${animalId}`),

  fetchAnimals: () => instance.get("api/animals/"),
};

const AnimalCareAPI = {};

export { AuthAPI, AnimalAPI };
