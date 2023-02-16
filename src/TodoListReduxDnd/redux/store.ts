import { configureStore } from '@reduxjs/toolkit';
import toDoListReducer from './ToDoListSlice';

export default configureStore({
  reducer: {
    list: toDoListReducer
  }
});
