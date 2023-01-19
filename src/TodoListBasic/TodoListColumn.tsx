import { ICategory } from './TodoListBasic';

export interface ITodoListColumnProps {
  category: ICategory;
}

const TodoListColumn = ({ category }: ITodoListColumnProps) => {
  return (
    <div className="todo-list-column">
      <h2>{category.name}</h2>
      <div className="todo-list-items">
        {category.items.map((item: string, index: number) => (
          <div key={category.name + '-' + index} className="todo-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListColumn;
