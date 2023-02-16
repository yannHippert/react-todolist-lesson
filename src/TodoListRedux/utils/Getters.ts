export function getItemByName<Type extends { name: string }>(list: Array<Type>, itemName: string): Type | undefined {
  return list.find(({ name }: Type) => name === itemName);
}
