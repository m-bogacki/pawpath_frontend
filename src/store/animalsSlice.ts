import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TAnimal, TAnimalCare } from "../Types/Animal";
import { AnimalAPI } from "../api/client";
import { toast } from "react-toastify";

const animalsInitialState = {
  animals: [],
  isLoading: false,
} as {
  animals: TAnimal[];
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

export const deleteAnimal = createAsyncThunk(
  "animals/delete",
  async (animal: TAnimal, { fulfillWithValue, rejectWithValue }) => {
    try {
      if (!animal.id) throw Error("Missing Animal ID");
      const response = await toast.promise(
        AnimalAPI.deleteAnimal(animal.id),
        {
          success: `${animal.name} has been deleted`,
          error: "Encountered an issue during deleting animal",
          pending: "Deleting...",
        },
        { position: "bottom-right" }
      );
      return fulfillWithValue(response);
    } catch (error: any) {
      return rejectWithValue(error.detail);
    }
  }
);

export const fetchAnimals = createAsyncThunk(
  "animals/",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalAPI.fetchAnimals(),
        {
          error: "Encountered an issue during fetching animals",
          pending: "Fetching Animals...",
        },
        { position: "bottom-right" }
      );
      console.log(response);

      return fulfillWithValue(response);
    } catch (error: any) {
      console.log(error);
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
  },
  extraReducers: (builder) => {
    builder // ADD ANIMALS ACTIONS /////////////////////////////////////////
      .addCase(addAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnimal.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.animals.push(action.payload.data);
      })
      .addCase(addAnimal.rejected, (state, action: any) => {
        state.isLoading = false;
      }) //DELETE ANIMALS ACTIONS /////////////////////////////////////////
      .addCase(deleteAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnimal.fulfilled, (state, action: any) => {
        state.isLoading = false;
        const newAnimals = state.animals.slice();
        const animalToDeleteIndex = newAnimals.indexOf(action.payload);
        newAnimals.splice(animalToDeleteIndex, 1);
        state.animals = newAnimals;
      })
      .addCase(deleteAnimal.rejected, (state, action: any) => {
        state.isLoading = false;
      }) // FETCH ANIMALS ACTIONS /////////////////////////////////////////
      .addCase(fetchAnimals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnimals.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.animals = action.payload.data;
      })
      .addCase(fetchAnimals.rejected, (state, action: any) => {
        state.isLoading = false;
      });
  },
});

export const { setAnimals } = animalsSlice.actions;

export default animalsSlice.reducer;
