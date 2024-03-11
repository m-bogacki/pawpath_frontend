import { TUser } from "./User";

type AnimalSize = "Small" | "Medium" | "Big" | "Very Big";

type TAnimal = {
  id?: number;
  owner: TUser;
  image: string;
  name: string;
  species: TSpecies;
  weight: number;
  size: AnimalSize;
  care_instructions?: TCareInstructions;
};
type TSpecies = "DOG" | "CAT";

type TCareInstructions = {
  id?: number;
  number_of_walks_per_day: number;
  food_portions: number;
  food_amount: number;
  additional_instructions: string;
};

type TOffer = {
  id?: number;
  description: string;
  status: string;
  carrer: TUser;
};

type TAnimalCareStatus = "New" | "Ongoing" | "Finished";

type TAnimalCare = {
  id: number;
  offers: TOffer[];
  animals: TAnimal[];
  start_date: Date;
  end_date: Date;
  status: TAnimalCareStatus;
  price: number;
};

export type {
  TAnimal,
  TSpecies,
  TCareInstructions,
  TAnimalCareStatus,
  TAnimalCare,
  TOffer,
};
