import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TAnimal, TAnimalCare } from "../Types/Animal";
import { AnimalAPI } from "../api/client";
import { toast } from "react-toastify";

type InitialStateType = {
  animals: TAnimal[];
  viewedAnimal: TAnimal | null;
  isLoading: boolean;
};

const initialState: InitialStateType = {
  animals: [],
  viewedAnimal: null,
  isLoading: false,
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

export const updateAnimal = createAsyncThunk(
  "animals/update",
  async (
    { animalId, animal }: { animalId: number; animal: Partial<TAnimal> },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await toast.promise(
        AnimalAPI.updateAnimal(animalId, animal),
        {
          success: "Updated animal",
          error: "Encountered issue during updating animal",
          pending: "Processing...",
        },
        { position: "bottom-right" }
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.detail);
    }
  }
);

export const updateAnimalCareInstructions = createAsyncThunk(
  "animals/updateCareInstructions",
  async (
    {
      animalId,
      careInstructions,
    }: { animalId: number; careInstructions: Partial<TAnimalCare> },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await toast.promise(
        AnimalAPI.updateCareInstructions(animalId, careInstructions),
        {
          success: "Updated care instructions",
          error: "Encountered issue during updating care instructions",
          pending: "Processing...",
        },
        { position: "bottom-right" }
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      console.log(error);
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
      if (response.status === 204) {
        return fulfillWithValue(animal);
      } else {
        throw Error("Error during deleting animal");
      }
    } catch (error: any) {
      return rejectWithValue(error.detail);
    }
  }
);
export const fetchAnimal = createAsyncThunk(
  "animals/fetch",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalAPI.fetchAnimal(id),
        {
          error: "Encountered an issue during fetching animal",
          pending: "Fetching Animal...",
        },
        { position: "bottom-right" }
      );
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error.detail);
    }
  }
);

export const fetchAnimalList = createAsyncThunk(
  "animals/",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalAPI.fetchAnimalList(),
        {
          error: "Encountered an issue during fetching animals",
          pending: "Fetching Animals...",
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
  initialState,
  reducers: {
    setAnimals(state, action: PayloadAction<TAnimal[]>) {
      state.animals = action.payload;
    },
    setAnimalImage(state, action: PayloadAction<string>) {
      state.viewedAnimal = { ...state.viewedAnimal!, image: action.payload };
      const animalOnList = state.animals.find(
        (animal) => animal.id === state.viewedAnimal?.id
      );
      state.animals = state.animals.map((animal) => {
        if (animal.id === state.viewedAnimal?.id) {
          return { ...animal, image: action.payload };
        }
        return animal;
      });
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
        const animalToDelete = action.payload;
        const newAnimals = state.animals.filter((animal) => {
          return animal.id !== animalToDelete.id;
        });
        state.animals = newAnimals;
        state.isLoading = false;
      })
      .addCase(deleteAnimal.rejected, (state, action: any) => {
        state.isLoading = false;
      }) // FETCH ANIMALS ACTIONS /////////////////////////////////////////
      .addCase(fetchAnimalList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnimalList.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.animals = action.payload.data;
      })
      .addCase(fetchAnimalList.rejected, (state, action: any) => {
        state.isLoading = false;
      })
      .addCase(fetchAnimal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAnimal.fulfilled,
        (state, action: PayloadAction<TAnimal>) => {
          state.viewedAnimal = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchAnimal.rejected, (state, action: any) => {
        state.isLoading = false;
      });
  },
});

export const { setAnimals, setAnimalImage } = animalsSlice.actions;

export default animalsSlice.reducer;
