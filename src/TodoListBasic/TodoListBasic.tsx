import React, { useState } from 'react';
import TodoListColumn from './TodoListColumn';
import './TodoListBasic.css';

export interface ICategory {
  name: string;
  items: Array<string>;
}

const TodoListBasic = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([
    { name: 'To do', items: [] },
    { name: 'In progress', items: [] },
    { name: 'Done', items: [] },
  ]);
  const [selectedCat, setSelectedCat] = useState<string>(categories[0].name);
  const [itemName, setItemName] = useState<string>('');

  const handleOnChangeSelectedCat = (e: any) => {
    setSelectedCat(e.target.value);
  };

  const hanldeOnChangeItemName = (e: any) => {
    setItemName(e.target.value);
  };

  const hanldeOnKeyDown = (e: any) => {
    if (e.key === 'Enter') handleOnSubmit();
  };

  const handleOnSubmit = () => {
    if (selectedCat.length < 1 || itemName.length < 1) return;

    const newCategories = [...categories];
    const index = newCategories.findIndex(
      (category: ICategory) => category.name === selectedCat
    );
    newCategories[index].items.push(itemName);
    setCategories(newCategories);

    setItemName('');
    setSelectedCat(categories[0].name);
  };

  return (
    <div className="container">
      <h1 className="title">TodoListBasic</h1>
      <div className="form">
        <input
          type="text"
          onChange={hanldeOnChangeItemName}
          onKeyDown={hanldeOnKeyDown}
          value={itemName}
        />
        <select
          name="category"
          id="category"
          onChange={handleOnChangeSelectedCat}
          value={selectedCat}>
          {categories.map((category: ICategory) => (
            <option value={category.name} key={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleOnSubmit}>Add item</button>
      </div>
      <div className="todo-list-table">
        {categories.map((category: ICategory) => (
          <TodoListColumn category={category} key={category.name} />
        ))}
      </div>
    </div>
  );
};

export default TodoListBasic;
