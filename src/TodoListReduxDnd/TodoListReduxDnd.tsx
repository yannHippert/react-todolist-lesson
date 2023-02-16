import { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import ItemModal from './ItemModal/ItemModal';
import CategoryList from './CatgeoryList/CategoryList';
import { ICategory, TCategoryId } from './types/Category';
import { IItem } from './types/Item';
import './TodoListReduxDnd.css';
import CategoryModal from './CategoryModal/CategoryModal';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const { Title } = Typography;

const ToDoListRedux = () => {
  const categories = useSelector((state: any) => state.list.categories);

  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [selectedItem, setSelectedItem] = useState<IItem>();
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const handleCategioryModalVisibilty = (isOpen: boolean, categoryId?: TCategoryId) => {
    setIsCategoryModalOpen(isOpen);
    setSelectedCategory(categoryId ? categories.find(({ id }: ICategory) => id === categoryId) : undefined);
  };

  const showAddCategoryModal = () => {
    handleCategioryModalVisibilty(true, undefined);
  };

  const showEditCategoryModal = (categoryId: string) => {
    handleCategioryModalVisibilty(true, categoryId);
  };

  const hideCategoryModal = () => {
    handleCategioryModalVisibilty(false, undefined);
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

  const handleDragEnd = () => {};

  return (
    <div className="container">
      <Title level={1} style={{ textAlign: 'center' }}>
        ToDoListReduxDnd
      </Title>

      <Button onClick={showAddCategoryModal}>
        <PlusSquareFilled />
        Add a new category
      </Button>

      <Space align="start" wrap className="space-flex">
        <DragDropContext onDragEnd={handleDragEnd}>
          {categories.map((category: ICategory, index: number) => (
            <Droppable key={index} droppableId={`${index}`}>
              {() => (
                <CategoryList
                  key={category.id}
                  category={category}
                  onEditCategory={() => showEditCategoryModal(category.id)}
                  onAddItem={() => showAddItemModal(category.id)}
                  onEditItem={showEditItemModal}
                />
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </Space>

      <CategoryModal isOpen={isCategoryModalOpen} category={selectedCategory} onClose={hideCategoryModal} />

      <ItemModal
        isOpen={isItemModalOpen}
        initialCategoryId={selectedCategory?.id}
        item={selectedItem}
        onClose={hideItemModal}
      />
    </div>
  );
};

export default ToDoListRedux;
