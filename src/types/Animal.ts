import { TUser } from "./User";

type TAnimal = {
  id?: number;
  owner: TUser;
  name: string;
  species: TSpecies;
  weight: number;
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
};

export type {
  TAnimal,
  TSpecies,
  TCareInstructions,
  TAnimalCareStatus,
  TAnimalCare,
  TOffer,
};
