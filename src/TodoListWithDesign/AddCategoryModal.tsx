import { useState } from 'react';
import { Space, Input, Typography, Modal } from 'antd';
import { ICategory } from './TodoListWithDesign';

const { Text } = Typography;

export interface AddCategoryModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (category: ICategory) => boolean;
}

const AddCategoryModal = ({ isOpen, onCancel, onConfirm, ...props }: AddCategoryModalProps) => {
  const [itemName, setItemName] = useState<string>('');

  const handleConfirmAddItem = () => {
    if (onConfirm({ name: itemName, items: [] })) {
      setItemName('');
    }
  };

  const handleCancelAddItem = () => {
    setItemName('');
    onCancel();
  };

  const handleChangeItemName = (e: any) => {
    setItemName(e.target.value);
  };

  return (
    <Modal title="Add category" open={isOpen} onOk={handleConfirmAddItem} onCancel={handleCancelAddItem}>
      <Space direction="vertical">
        <Text type="secondary">Category name:</Text>
        <Input placeholder="Categoryname" onChange={handleChangeItemName} value={itemName} />
      </Space>
    </Modal>
  );
};

export default AddCategoryModal;
