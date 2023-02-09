import { IItem } from './Item';

export interface ICategory {
  id: string;
  name: string;
  items: Array<IItem>;
}
