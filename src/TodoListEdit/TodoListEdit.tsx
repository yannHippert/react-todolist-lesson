import { useState } from 'react';
import { Button, Space, Typography, message as PopupMessage } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import ItemModal from './ItemModal/ItemModal';
import CategoryList from './CatgeoryList/CategoryList';
import { ICategory } from './types/Category';
import { IItem, IItemFields } from './types/Item';
import './TodoListEdit.css';
import CategoryModal from './CategoryModal/CategoryModal';
import { getRandomId } from './helpers/IdGenerator';

const { Title } = Typography;

const TodoListEdit = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([
    { id: getRandomId(), name: 'To do', items: [{ id: getRandomId(), name: 'ToDoListRedux' }] },
    { id: getRandomId(), name: 'In progress', items: [{ id: getRandomId(), name: 'ToDoListEdit' }] },
    {
      id: getRandomId(),
      name: 'Done',
      items: [
        { id: getRandomId(), name: 'ToDoListBasic' },
        { id: getRandomId(), name: 'ToDoListWithDesign' }
      ]
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [selectedItem, setSelectedItem] = useState<IItem>();
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const showAddCategoryModal = () => {
    setSelectedCategory(undefined);
    setIsCategoryModalOpen(true);
  };

  const showEditCategoryModal = (categoryId: string) => {
    setSelectedCategory(categories.find(({ id }: ICategory) => id === categoryId));
    setIsCategoryModalOpen(true);
  };

  const hideCategoryModal = () => {
    setSelectedCategory(undefined);
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = () => {
    const newCategories = [...categories];
    const categoryIndex = newCategories.findIndex(({ id }: ICategory) => id === selectedCategory!.id);
    newCategories.splice(categoryIndex, 1);
    setCategories(newCategories);
    hideCategoryModal();
  };

  const handleConfirmCategory = ({ id: categoryId, name: categoryName }: { id?: string; name: string }): boolean => {
    const newCategories = [...categories];
    let categoryIndex = newCategories.findIndex(({ id }: ICategory) => id === categoryId);
    if (categoryIndex !== -1 && newCategories[categoryIndex].name === categoryName) {
      hideCategoryModal();
      return true;
    }

    if (newCategories.find(({ name }: ICategory) => name === categoryName) !== undefined) {
      showError(`The category with the name: ${categoryName} already exists`);
      return false;
    }

    if (categoryIndex !== -1) {
      newCategories[categoryIndex].name = categoryName;
    } else {
      newCategories.push({ id: getRandomId(), name: categoryName, items: [] });
    }

    setCategories(newCategories);
    hideCategoryModal();
    return true;
  };

  const showAddItemModal = (categoryId: string) => {
    setSelectedCategory(categories.find(({ id }: ICategory) => id === categoryId));
    setIsItemModalOpen(true);
  };

  const showEditItemModal = (categoryId: string, itemId: string) => {
    const category = categories.find(({ id }: ICategory) => id === categoryId);
    setSelectedCategory(category);
    setSelectedItem(category!.items.find(({ id }: IItem) => id === itemId));
    setIsItemModalOpen(true);
  };

  const hideItemModal = () => {
    setSelectedCategory(undefined);
    setSelectedItem(undefined);
    setIsItemModalOpen(false);
  };

  const handleConfirmItem = (categoryId: string, itemFields: IItemFields): boolean => {
    const newCategories = [...categories];
    const categoryIndex = newCategories.findIndex(({ id }: ICategory) => id === categoryId);

    if (selectedItem === undefined) {
      newCategories[categoryIndex].items.push({ id: getRandomId(), ...itemFields });
      setCategories(newCategories);
      hideItemModal();
      return true;
    }

    if (selectedCategory?.id && categoryId !== selectedCategory.id) {
      const oldCategoryIndex = newCategories.findIndex(({ id }: ICategory) => id === selectedCategory.id);
      const itemIndex = newCategories[oldCategoryIndex].items.findIndex(({ id }: IItem) => id === selectedItem!.id);
      const [item] = newCategories[oldCategoryIndex].items.splice(itemIndex, 1);
      newCategories[categoryIndex].items.push({ ...item, ...itemFields });
    } else {
      const itemIndex = newCategories[categoryIndex].items.findIndex(({ id }: IItem) => id === selectedItem!.id);
      const item = newCategories[categoryIndex].items[itemIndex];
      newCategories[categoryIndex].items[itemIndex] = {
        ...item,
        ...itemFields
      };
    }

    setCategories(newCategories);
    hideItemModal();
    return true;
  };

  const handleDeleteItem = () => {
    const newCategories = [...categories];
    const categoryIndex = newCategories.findIndex(({ id }: ICategory) => id === selectedCategory!.id);
    const itemIndex = newCategories[categoryIndex].items.findIndex(({ id }: IItem) => id === selectedItem!.id);
    newCategories[categoryIndex].items.splice(itemIndex, 1);
    setCategories(newCategories);
    hideItemModal();
  };

  const showError = (message: string) => {
    PopupMessage.error(message);
  };

  return (
    <div className="container">
      <Title level={1} style={{ textAlign: 'center' }}>
        ToDoListEdit
      </Title>

      <Button onClick={showAddCategoryModal}>
        <PlusSquareFilled />
        Add a new category
      </Button>

      <Space align="start" wrap className="space-flex">
        {categories.map((category: ICategory) => (
          <CategoryList
            category={category}
            onEditCategory={() => showEditCategoryModal(category.id)}
            onAddItem={() => showAddItemModal(category.id)}
            onEditItem={showEditItemModal}
          />
        ))}
      </Space>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        category={selectedCategory}
        onCancel={hideCategoryModal}
        onDelete={handleDeleteCategory}
        onConfirm={handleConfirmCategory}
      />

      <ItemModal
        isOpen={isItemModalOpen}
        categories={categories}
        initialCategory={selectedCategory}
        item={selectedItem}
        onCancel={hideItemModal}
        onDelete={handleDeleteItem}
        onConfirm={handleConfirmItem}
      />
    </div>
  );
};

export default TodoListEdit;
