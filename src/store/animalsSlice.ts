import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TAnimal, TAnimalCare } from "../Types/Animal";
import { AnimalAPI } from "../api/client";
import { toast } from "react-toastify";

const animalsInitialState = {
  animals: [],
  animalCare: [],
  isLoading: false,
} as {
  animals: TAnimal[];
  animalCare: TAnimalCare[];
  isLoading: boolean;
};

export const addAnimal = createAsyncThunk(
  "animals/create",
  async (animal: TAnimal, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalAPI.createAnimal(animal),
        {
          success: "Added new animal",
          error: "Encountered issue during creation of animal",
          pending: "Processing...",
        },
        { position: "bottom-right" }
      );
      return fulfillWithValue(response);
    } catch (error: any) {
      return rejectWithValue(error.detail);
    }
  }
);

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
    // addAnimal(state, action: PayloadAction<TAnimal>) {
    //   const animal = action.payload;
    //   state.animals.push(animal);
    // },
    setAnimals(state, action: PayloadAction<TAnimal[]>) {
      state.animals = action.payload;
    },
    setAnimalCareList(state, action: PayloadAction<TAnimalCare[]>) {
      state.animalCare = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnimal.fulfilled, (state, action: any) => {
        state.isLoading = false;
        console.log(action.payload);
        state.animals.push(action.payload.data);
      })
      .addCase(addAnimal.rejected, (state, action: any) => {
        state.isLoading = false;
      });
  },
});

export const { deleteAnimal, setAnimals, setAnimalCareList } =
  animalsSlice.actions;

export default animalsSlice.reducer;
