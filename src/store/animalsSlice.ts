import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { types } from "util";
import { TAnimal } from "../types/Animal";

const animalsInitialState = {
  animals: [],
} as {
  animals: TAnimal[];
};

const animalsSlice = createSlice({
  name: "animals",
  initialState: animalsInitialState,
  reducers: {
    deleteAnimal(state, action: PayloadAction<TAnimal>) {
      const newAnimals = state.animals.slice();
      const animalToDeleteIndex = newAnimals.indexOf(action.payload);
      newAnimals.splice(animalToDeleteIndex, 1);
      state.animals = newAnimals;
    },
    addAnimal(state, action: PayloadAction<TAnimal>) {
      const animal = action.payload;
      state.animals.push(animal);
    },
    setAnimals(state, action: PayloadAction<TAnimal[]>) {
      state.animals = action.payload;
    },
  },
});

export const { deleteAnimal, setAnimals, addAnimal } = animalsSlice.actions;

export default animalsSlice.reducer;
