export type TItemId = string;

export interface IItemFields {
  name: string;
}

export interface IItem extends IItemFields {
  id: TItemId;
}
