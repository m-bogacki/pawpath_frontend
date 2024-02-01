import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TAnimal, TAnimalCare } from "../Types/Animal";
import { AnimalAPI } from "../api/client";
import { toast } from "react-toastify";

const initialState = {
  animalCareList: [],
  isLoading: false,
} as {
  animalCareList: TAnimalCare[];
  isLoading: boolean;
};

export const fetchAnimalCareList = createAsyncThunk(
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

const animalCareSlice = createSlice({
  name: "animalCare",
  initialState,
  reducers: {
    setAnimalCareList(state, action: PayloadAction<TAnimalCare[]>) {
      state.animalCareList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder // ADD ANIMAL CARE OBJECTS /////////////////////////////////////////
      .addCase(fetchAnimalCareList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnimalCareList.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.animalCareList = action.payload.data;
      })
      .addCase(fetchAnimalCareList.rejected, (state, action: any) => {
        state.isLoading = false;
      });
  },
});

export const { setAnimalCareList } = animalCareSlice.actions;

export default animalCareSlice.reducer;
