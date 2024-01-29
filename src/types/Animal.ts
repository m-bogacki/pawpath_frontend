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

type TAnimalCareStatus = "New" | "Ongoing" | "Finished";

type TAnimalCare = {
  id: number;
  animals: TAnimal[];
  start_date: string;
  end_date: string;
  status: TAnimalCareStatus;
};

export type {
  TAnimal,
  TSpecies,
  TCareInstructions,
  TAnimalCareStatus,
  TAnimalCare,
};
