import { createSlice } from '@reduxjs/toolkit';

interface State {
    name: string;
}

export const exampleSlice = createSlice({
    name: 'example',
    initialState: {
        name: 'MOrgan',
    },
    reducers: {
        setName: (state: State, action: { payload: string }) => {
            state.name = action.payload;
        },
    },
});

export const { setName } = exampleSlice.actions;

export default exampleSlice.reducer;
