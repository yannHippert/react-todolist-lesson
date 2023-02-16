import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './ExampleSlice';

export default configureStore({
    reducer: {
        example: exampleReducer,
    },
});
