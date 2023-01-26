import { useState } from 'react';
import { Button, Space, Input, Select, Col, Row, Typography, List, Modal, message } from 'antd';
import { CloseSquareFilled, PlusSquareFilled } from '@ant-design/icons';

const { Title, Text } = Typography;

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
  const [itemName, setItemName] = useState<string>('');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  const showAddCategoryModel = () => {
    setIsAddCategoryModalOpen(true);
  };

  const handleConfirmAddCategory = () => {
    if (handleAddCategory()) setIsAddCategoryModalOpen(false);
  };

  const getCategoryIndex = (categories: Array<ICategory>, name: string): number => {
    return categories.findIndex((category: ICategory) => category.name.toLowerCase() === name.toLowerCase());
  };

  const handleAddCategory = (): boolean => {
    if (itemName.trim().length < 1) {
      showError(`The name of a category can not be empty!`);
      return false;
    }

    if (getCategoryIndex(categories, itemName) !== -1) {
      showError(`The category with the name: ${itemName} already exists`);
      return false;
    }

    const newCategories = [...categories];
    newCategories.push({ name: itemName, items: [] });
    setCategories(newCategories);
    setItemName('');

    return true;
  };

  const handleCancelAddCategory = () => {
    setItemName('');
    setIsAddCategoryModalOpen(false);
  };

  const showAddItemModal = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsAddItemModalOpen(true);
  };

  const handleConfirmAddItem = () => {
    if (handleAddItem()) setIsAddItemModalOpen(false);
  };

  const handleCancelAddItem = () => {
    setItemName('');
    setIsAddItemModalOpen(false);
  };

  const handleAddItem = (): boolean => {
    if (selectedCategory.length < 1 || itemName.trim().length < 1) {
      showError('The name of an item can not be empty!');
      return false;
    }

    const newCategories = [...categories];
    console.log(selectedCategory);
    const index = getCategoryIndex(newCategories, selectedCategory);
    console.log(index);
    newCategories[index].items.push({ id: getRandomId(), name: itemName });
    setCategories(newCategories);

    setItemName('');
    return true;
  };

  const getRandomId = () => {
    return (Math.random() + 1).toString(36).substring(2);
  };

  const handleChangeSelectedCategory = (e: any) => {
    setSelectedCategory(e);
  };

  const handleChangeItemName = (e: any) => {
    setItemName(e.target.value);
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

      <Button onClick={showAddCategoryModel}>
        <PlusSquareFilled />
        Add a new category
      </Button>

      <Row justify="space-around" align="top">
        {categories.map((category: ICategory) => (
          <Col span={24 / categories.length} key={category.name}>
            <List
              header={
                <Row justify="space-between">
                  <Title level={2}>{category.name}</Title>
                  <Button type="primary" icon={<PlusSquareFilled />} onClick={() => showAddItemModal(category.name)}></Button>
                </Row>
              }
              bordered
              dataSource={category.items}
              renderItem={(item) => (
                <List.Item actions={[<Button type="primary" danger icon={<CloseSquareFilled />} onClick={() => handleRemoveItem(category.name, item.id)} />]}>
                  <Text>{item.name}</Text>
                </List.Item>
              )}
            />
          </Col>
        ))}
      </Row>

      <Modal title="Add item" open={isAddItemModalOpen} onOk={handleConfirmAddItem} onCancel={handleCancelAddItem}>
        <Space direction="vertical">
          <Text type="secondary">Item name:</Text>
          <Input placeholder="Item name" onChange={handleChangeItemName} value={itemName} />
          <Text type="secondary">Category:</Text>
          <Select
            style={{ width: '100%' }}
            onChange={handleChangeSelectedCategory}
            value={selectedCategory}
            options={categories.map((category: ICategory) => ({ value: category.name, label: category.name }))}
          />
        </Space>
      </Modal>

      <Modal title="Add category" open={isAddCategoryModalOpen} onOk={handleConfirmAddCategory} onCancel={handleCancelAddCategory}>
        <Space direction="vertical">
          <Text type="secondary">Category name:</Text>
          <Input placeholder="Categoryname" onChange={handleChangeItemName} value={itemName} />
        </Space>
      </Modal>
    </div>
  );
};

export default TodoListWidthDesign;
