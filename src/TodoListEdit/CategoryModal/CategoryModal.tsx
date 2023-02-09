import { ReactElement, useEffect, useState } from 'react';
import { Space, Input, Typography, Modal, Button, message as PopupMessage } from 'antd';
import { ICategory } from '../types/Category';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

export interface CategoryModalProps {
  isOpen: boolean;
  category?: ICategory;
  onCancel: () => void;
  onDelete: () => void;
  onConfirm: (category: { id?: string; name: string }) => boolean;
}

const CategoryModal = ({ isOpen, category, onCancel, onDelete, onConfirm }: CategoryModalProps) => {
  const [itemName, setItemName] = useState<string>('');

  useEffect(() => {
    setItemName(category?.name ?? '');
  }, [category]);

  const handleConfirm = () => {
    if (itemName.trim().length < 1) {
      PopupMessage.error(`The name of a category can not be empty!`);
      return;
    }

    if (onConfirm({ id: category?.id, name: itemName })) setItemName('');
  };

  const handleCancel = () => {
    onCancel();
    setItemName('');
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: 'Do you want to delete this category?',
      icon: <ExclamationCircleFilled />,
      content: 'This action will also remove all of its items and cannot be be undone!',
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        onDelete();
        setItemName('');
      }
    });
  };

  const handleChangeItemName = (e: any) => {
    setItemName(e.target.value);
  };

  const getTitle = (): string => {
    return (category ? 'Update' : 'Add') + ' category';
  };

  const getFooter = (): Array<ReactElement> => {
    const buttons = [
      <Button key="back" onClick={handleCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleConfirm}>
        {category ? 'Update' : 'Create'}
      </Button>
    ];
    if (category !== undefined) {
      buttons.splice(
        1,
        0,
        <Button key="delete" type="primary" danger onClick={showDeleteModal}>
          Delete
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Modal title={getTitle()} open={isOpen} onOk={handleConfirm} onCancel={handleCancel} footer={getFooter()}>
      <Space direction="vertical">
        <Text type="secondary">Category name:</Text>
        <Input placeholder="Category name" onChange={handleChangeItemName} value={itemName} />
      </Space>
    </Modal>
  );
};

export default CategoryModal;
