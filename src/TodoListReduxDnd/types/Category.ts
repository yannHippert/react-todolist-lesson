import { IItem } from './Item';

export type TCategoryId = string;

export interface ICategoryFields {
  name: string;
  items: Array<IItem>;
}

export interface ICategory extends ICategoryFields {
  id: TCategoryId;
}
