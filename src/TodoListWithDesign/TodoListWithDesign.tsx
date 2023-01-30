import { useState } from 'react';
import { Button, Space, Typography, message } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import AddItemModal from './AddItemModal';
import AddCategoryModal from './AddCategoryModal';
import CategoryList from './CategoryList';
import './TodoListWithDesign.css';

const { Title } = Typography;

export interface IItem {
  id: string;
  name: string;
}

export interface ICategory {
  name: string;
  items: Array<IItem>;
}

const TodoListWidthDesign = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([
    { name: 'To do', items: [] },
    { name: 'In progress', items: [] },
    { name: 'Done', items: [] }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].name);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const showAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const getIndexByName = (items: Array<{ name: string }>, name: string): number => {
    return items.findIndex((item: { name: string }) => item.name.toLowerCase() === name.toLowerCase());
  };

  const handleAddCategory = (category: ICategory): boolean => {
    if (category.name.trim().length < 1) {
      showError(`The name of a category can not be empty!`);
      return false;
    }

    if (getIndexByName(categories, category.name) !== -1) {
      showError(`The category with the name: ${category.name} already exists`);
      return false;
    }

    setCategories([...categories, category]);
    setIsAddCategoryModalOpen(false);
    return true;
  };

  const showAddItemModal = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsAddItemModalOpen(true);
  };

  const handleAddItem = ({ categoryName, item }: { categoryName: string; item: IItem }): boolean => {
    if (item.name.trim().length < 1) {
      showError('The name of an item can not be empty!');
      return false;
    }

    const newCategories = [...categories];
    const index = getIndexByName(newCategories, categoryName);
    // Should not be possible
    if (index < 0) {
      showError(`The category with the name ${categoryName} could not be found!`);
      setIsAddItemModalOpen(false);
      return false;
    }

    newCategories[index].items = [...newCategories[index].items, item];
    setCategories(newCategories);
    setIsAddItemModalOpen(false);
    return true;
  };

  const handleRemoveItem = (categoryName: string, itemId: string) => {
    const newCategories = [...categories];
    const categoryIndex = newCategories.findIndex((category: ICategory) => category.name === categoryName);
    const itemIndex = newCategories[categoryIndex].items.findIndex((item: IItem) => item.id === itemId);
    newCategories[categoryIndex].items.splice(itemIndex, 1);
    setCategories(newCategories);
  };

  const showError = (errorMessage: string) => {
    message.error(errorMessage);
  };

  return (
    <div className="container">
      <Title level={1} style={{ textAlign: 'center' }}>
        ToDoListWithDesign
      </Title>

      <Button onClick={showAddCategoryModal}>
        <PlusSquareFilled />
        Add a new category
      </Button>

      <Space align="start" wrap className="space-flex">
        {categories.map((category: ICategory) => (
          <CategoryList category={category} onAddItem={() => showAddItemModal(category.name)} onDeleteItem={handleRemoveItem} />
        ))}
      </Space>

      <AddItemModal
        isOpen={isAddItemModalOpen}
        categories={categories}
        initialCategory={selectedCategory}
        onCancel={() => {
          setIsAddItemModalOpen(false);
        }}
        onConfirm={handleAddItem}
      />

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onCancel={() => {
          setIsAddCategoryModalOpen(false);
        }}
        onConfirm={handleAddCategory}
      />
    </div>
  );
};

export default TodoListWidthDesign;
