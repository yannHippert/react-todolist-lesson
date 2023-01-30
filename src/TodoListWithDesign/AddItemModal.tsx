import { useEffect, useState } from 'react';
import { Space, Input, Select, Typography, Modal } from 'antd';
import { ICategory } from './TodoListWithDesign';

const { Text } = Typography;

export interface AddItemModalProps {
  isOpen: boolean;
  categories: Array<ICategory>;
  initialCategory: string;
  onCancel: Function;
  onConfirm: Function;
}

const AddItemModal = ({ isOpen, categories, onCancel, onConfirm, initialCategory, ...props }: AddItemModalProps) => {
  const [itemName, setItemName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleConfirmAddItem = () => {
    if (
      onConfirm({
        categoryName: selectedCategory,
        item: {
          id: getRandomId(),
          name: itemName
        }
      })
    ) {
      setItemName('');
    }
  };

  const getRandomId = () => {
    return (Math.random() + 1).toString(36).substring(2);
  };

  const handleCancelAddItem = () => {
    setItemName('');
    onCancel();
  };

  const handleChangeItemName = (e: any) => {
    setItemName(e.target.value);
  };

  const handleChangeSelectedCategory = (e: any) => {
    setSelectedCategory(e);
  };

  return (
    <Modal title="Add item" open={isOpen} onOk={handleConfirmAddItem} onCancel={handleCancelAddItem}>
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
  );
};

export default AddItemModal;
