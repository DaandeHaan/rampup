import { createSlice } from "@reduxjs/toolkit";

export const contextSlice = createSlice({
	name: "context",
	initialState: {
		colorTheme: "dark",
		title: "Feed",
	},
	reducers: {
		updateColorTheme: (state, action) => {
			state.colorTheme = action.payload;
		},
		updateTitle: (state, action) => {
			state.title = action.payload;
		},
	},
});

export const { updateColorTheme, updateTitle } = contextSlice.actions;

export default contextSlice.reducer;
