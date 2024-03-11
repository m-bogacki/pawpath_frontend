import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TAnimalCare, TOffer } from "../Types/Animal";
import { AnimalCareAPI } from "../api/client";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

const initialState = {
  animalCareList: [],
  viewedAnimalCare: null,
  isLoading: false,
} as {
  animalCareList: TAnimalCare[];
  viewedAnimalCare: TAnimalCare | null;
  isLoading: boolean;
};

export const fetchAnimalCareList = createAsyncThunk(
  "animalsCare/fetchList",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalCareAPI.fetchAnimalCareList(),
        {
          error:
            "Encountered an issue during fetching animal care advertisements",
          pending: "Fetching advertisements...",
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

export const fetchAnimalCare = createAsyncThunk(
  "animalsCare/fetch",
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalCareAPI.fetchAnimalCare(id),
        {
          error:
            "Encountered an issue during fetching animal care advertisement",
          pending: "Fetching advertisement...",
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

export const addAnimalCare = createAsyncThunk(
  "animalsCare/create",
  async (animalCare: TAnimalCare, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalCareAPI.createAnimalCare(animalCare),
        {
          success: "Added new animal care advertisement",
          error:
            "Encountered an issue during creating animal care advertisements",
          pending: "Creating advertisement...",
        },
        { position: "bottom-right" }
      );
      console.log(response);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error.detail);
    }
  }
);
export const deleteAnimalCare = createAsyncThunk(
  "animalsCare/delete",
  async (animalCare: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalCareAPI.deleteAnimalCare(animalCare),
        {
          success: "Deleted new animal care advertisement",
          error:
            "Encountered an issue during deletion animal care advertisements",
          pending: "Creating advertisement...",
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

export const makeOffer = createAsyncThunk(
  "animalsCare/make-offer",
  async (
    {
      animalCareId,
      description,
    }: { animalCareId: number; description: Partial<TOffer> },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await toast.promise(
        AnimalCareAPI.makeOffer(animalCareId, description),
        {
          success: "Sent Offer successfully",
          error:
            "Encountered an issue during sending offer to animal care advertisement",
          pending: "Sending Offer...",
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

export const acceptOffer = createAsyncThunk(
  "animalsCare/accept-offer",
  async (offerId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalCareAPI.acceptOffer(offerId),
        {
          success: "Accepted Offer successfully",
          error:
            "Encountered an issue during accepting offer to animal care advertisement",
          pending: "Accepting Offer...",
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
export const declineOffer = createAsyncThunk(
  "animalsCare/decline-offer",
  async (offerId: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await toast.promise(
        AnimalCareAPI.declineOffer(offerId),
        {
          success: "Declined Offer successfully",
          error:
            "Encountered an issue during declining offer to animal care advertisement",
          pending: "Declining Offer...",
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
/**
 * Represents the animal care slice of the store.
 */
/**
 * Slice for managing animal care state.
 */
const animalCareSlice = createSlice({
  name: "animalCare",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ANIMAL CARE OBJECTS /////////////////////////////////////////
      .addCase(fetchAnimalCareList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnimalCareList.fulfilled, (state, action) => {
        state.animalCareList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAnimalCareList.rejected, (state) => {
        state.isLoading = false;
      }) /// ADD ANIMAL CARE OBJECT /////////////////////////////////////
      .addCase(addAnimalCare.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addAnimalCare.fulfilled, (state, action) => {
        console.log(action);
        state.animalCareList.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addAnimalCare.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAnimalCare.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteAnimalCare.fulfilled, (state, action) => {
        state.animalCareList = state.animalCareList.filter(
          (animalCare) => animalCare.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteAnimalCare.rejected, (state) => {
        state.isLoading = false;
      })
      // FETCH SINGLE ANIMAL CARE OBJECT /////////////////////////////////
      .addCase(fetchAnimalCare.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAnimalCare.fulfilled,
        (state, action: PayloadAction<TAnimalCare>) => {
          state.isLoading = false;
          state.viewedAnimalCare = action.payload;
        }
      )
      .addCase(fetchAnimalCare.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(makeOffer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(makeOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(state.viewedAnimalCare);
        const newOffers = [...state.viewedAnimalCare!.offers, action.payload];
        state.viewedAnimalCare = {
          ...state.viewedAnimalCare!,
          offers: newOffers,
        };
      })
      .addCase(makeOffer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(acceptOffer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(acceptOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        const newOffers = state.viewedAnimalCare!.offers.map((offer) => {
          if (offer.id === action.payload.id) {
            return action.payload;
          }
          return offer;
        });
        state.viewedAnimalCare = {
          ...state.viewedAnimalCare!,
          status: "Ongoing",
          offers: newOffers,
        };
      })
      .addCase(acceptOffer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(declineOffer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(declineOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        const newOffers = state.viewedAnimalCare!.offers.filter(
          (offer) => offer.id !== action.payload.id
        );
        state.viewedAnimalCare = {
          ...state.viewedAnimalCare!,
          offers: newOffers,
        };
      })
      .addCase(declineOffer.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = animalCareSlice.actions;

export default animalCareSlice.reducer;
