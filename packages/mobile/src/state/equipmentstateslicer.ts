import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface equipmentState {
  name: string;
  isOn: boolean;
}

const initialState: Array<equipmentState> = [];

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    setEquipements: (state, action: PayloadAction<Array<equipmentState>>) => {
      return action.payload;
    },
    changequipmentstate: (state, action: PayloadAction<equipmentState>) => {
      state.forEach((equipment) => {
        if (equipment.name === action.payload.name) {
          equipment.isOn = action.payload.isOn;
        }
      });
    },
  },
});

export const { setEquipements, changequipmentstate } = equipmentSlice.actions;

export default equipmentSlice.reducer;
