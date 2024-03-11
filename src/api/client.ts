import { TCredentials, TRegister, TToken } from "../Types/Auth";
import { TAnimal, TAnimalCare, TOffer } from "../Types/Animal";
import { isExpired } from "react-jwt";
import axios, { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

const tokenFreeUrls = ["api/token/", "api/token/refresh/", "api/users/create/"];

httpClient.interceptors.request.use(
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
    return httpClient.post("api/token/", credentials);
  },
  refreshToken: (refresh: TToken) => {
    return httpClient.post("api/token/refresh/", { refresh: refresh });
  },
  signup: (credentials: TRegister) => {
    return httpClient.post("api/users/create/", credentials);
  },
  fetchUser: (userId: number) => {
    return httpClient.get(`api/users/${userId}/`);
  },
};

const AnimalAPI = {
  createAnimal: (animal: TAnimal) =>
    httpClient.post("api/animals/create/", animal),

  deleteAnimal: (animalId: number) =>
    httpClient.delete(`api/animals/${animalId}/`),
  updateAnimal: (animalId: number, data: any) => {
    return httpClient.patch(`api/animals/${animalId}/`, data);
  },
  updateCareInstructions: (animalId: number, data: any) => {
    return httpClient.patch(
      `api/animals/${animalId}/update-care-instructions/`,
      data
    );
  },

  fetchAnimalList: () => {
    return httpClient.get("api/animals/");
  },
  fetchAnimal: (animalId: number) => {
    return httpClient.get(`api/animals/${animalId}/`);
  },
};

const AnimalCareAPI = {
  fetchAnimalCareList: () => httpClient.get("api/animal-care/"),
  createAnimalCare: (animalCare: TAnimalCare) =>
    httpClient.post("api/animal-care/create/", animalCare),
  deleteAnimalCare: (animalCareId: number) =>
    httpClient.delete(`api/animal-care/${animalCareId}/`),
  fetchAnimalCare: (animalCareId: number) =>
    httpClient.get(`api/animal-care/${animalCareId}/`),
  makeOffer: (animalCareId: number, description: Partial<TOffer>) =>
    httpClient.post(`api/animal-care/${animalCareId}/make-offer/`, {
      description,
    }),
  acceptOffer: (offerId: number) => {
    return httpClient.get(`api/animal-care/offer/${offerId}/accept/`);
  },
  declineOffer: (offerId: number) => {
    return httpClient.get(`api/animal-care/offer/${offerId}/decline/`);
  },
};

const UserAPI = {
  updateUser: (userId: number, data: any) => {
    return httpClient.patch(`api/users/${userId}/`, data);
  },
  updateUserAddress: (userId: number, data: any) => {
    return httpClient.patch(`api/users/${userId}/update-address/`, data);
  },
};

export { AuthAPI, AnimalAPI, AnimalCareAPI, UserAPI };
