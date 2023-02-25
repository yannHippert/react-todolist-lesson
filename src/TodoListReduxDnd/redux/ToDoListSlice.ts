import { createSlice } from '@reduxjs/toolkit';
import { getRandomId } from '../utils/IdGenerator';
import { ICategory, TCategoryId } from '../types/Category';
import { IItem, IItemFields, TItemId } from '../types/Item';
import { getItemById, validateMinLength, validateUniqueName, validateUniqueNameNotSelf } from './validations';
import { reorder } from '../utils/DNDFunction';

interface State {
  categories: Array<ICategory>;
}

export const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState: {
    categories: [
      { id: getRandomId(), name: 'To do', items: [] },
      { id: getRandomId(), name: 'In progress', items: [{ id: getRandomId(), name: 'ToDoListRedux' }] },
      {
        id: getRandomId(),
        name: 'Done',
        items: [
          { id: getRandomId(), name: 'ToDoListBasic' },
          { id: getRandomId(), name: 'ToDoListWithDesign' },
          { id: getRandomId(), name: 'ToDoListEdit' }
        ]
      }
    ]
  },
  reducers: {
    addCatgeory: (state: State, action: { payload: { name: string } }) => {
      validateMinLength(action.payload.name);
      validateUniqueName(state.categories, action.payload.name);

      state.categories.push({
        id: getRandomId(),
        items: [],
        ...action.payload
      });
    },
    updateCategory: (state: State, action: { payload: ICategory }) => {
      validateUniqueNameNotSelf(state.categories, action.payload.name, action.payload);

      state.categories = state.categories.map((category: ICategory) =>
        category.id === action.payload.id ? action.payload : category
      );
    },
    deleteCategory: (state: State, action: { payload: { id: TCategoryId } }) => {
      state.categories = state.categories.filter(({ id }: ICategory) => id !== action.payload.id);
    },
    addItem: (state: State, action: { payload: { categoryId: TCategoryId; itemData: IItemFields } }) => {
      validateMinLength(action.payload.itemData.name);

      const category = getItemById<ICategory>(state.categories, action.payload.categoryId);
      category.items.push({
        id: getRandomId(),
        ...action.payload.itemData
      });
    },
    updateItem: (
      state: State,
      action: { payload: { categoryId: TCategoryId; oldCategoryId?: TCategoryId; item: IItem } }
    ) => {
      validateMinLength(action.payload.item.name);

      const category = getItemById<ICategory>(state.categories, action.payload.categoryId);
      if (action.payload.oldCategoryId !== undefined && action.payload.categoryId !== action.payload.oldCategoryId) {
        const oldCategory = getItemById<ICategory>(state.categories, action.payload.oldCategoryId);
        oldCategory.items = oldCategory.items.filter(({ id }: IItem) => id !== action.payload.item.id);
        category.items.push(action.payload.item);
      } else {
        category.items = category.items.map((item: IItem) =>
          item.id === action.payload.item.id ? action.payload.item : item
        );
      }
    },
    deleteItem: (state: State, action: { payload: { categoryId: TCategoryId; itemId: TItemId } }) => {
      const updatedCategory = getItemById<ICategory>(state.categories, action.payload.categoryId);
      updatedCategory.items = updatedCategory.items.filter(({ id }: IItem) => id !== action.payload.itemId);
    }
  }
});

export const { addCatgeory, updateCategory, deleteCategory, addItem, deleteItem, updateItem } = toDoListSlice.actions;

export default toDoListSlice.reducer;
