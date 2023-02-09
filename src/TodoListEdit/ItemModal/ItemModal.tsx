import { useEffect, useState } from 'react';
import { Space, Input, Select, Typography, Modal, Button, message as PopupMessage } from 'antd';
import { ICategory } from '../types/Category';
import { IItem, IItemFields } from '../types/Item';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { Text } = Typography;

export interface ItemModalProps {
  isOpen: boolean;
  categories: Array<ICategory>;
  onCancel: () => void;
  onDelete: () => void;
  onConfirm: (categoryId: string, itemFields: IItemFields) => boolean;

  initialCategory?: ICategory;
  item?: IItem;
}

const ItemModal = ({ isOpen, categories, onCancel, onDelete, onConfirm, initialCategory, item }: ItemModalProps) => {
  const [itemName, setItemName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(initialCategory?.id ?? '');
  }, [initialCategory]);

  useEffect(() => {
    setItemName(item?.name ?? '');
  }, [item]);

  const handleConfirm = () => {
    if (itemName.trim().length < 1) {
      PopupMessage.error(`The name of an item can not be empty!`);
      return;
    }

    if (onConfirm(selectedCategory, { name: itemName })) setItemName('');
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone!',
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        onDelete();
        setItemName('');
      }
    });
  };

  const handleCancel = () => {
    onCancel();
    setItemName('');
  };

  const handleChangeItemName = (e: any) => {
    setItemName(e.target.value);
  };

  const handleChangeSelectedCategory = (e: any) => {
    setSelectedCategory(e);
  };

  const getTitle = (): string => {
    return (item ? 'Update' : 'Add') + ' item';
  };

  const getFooter = (): Array<any> => {
    const buttons = [
      <Button key="back" onClick={handleCancel}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleConfirm}>
        {item ? 'Update' : 'Create'}
      </Button>
    ];
    if (item !== undefined) {
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
        <Text type="secondary">Item name:</Text>
        <Input placeholder="Item name" onChange={handleChangeItemName} value={itemName} />
        <Text type="secondary">Category:</Text>
        <Select
          style={{ width: '100%' }}
          onChange={handleChangeSelectedCategory}
          value={selectedCategory}
          options={categories.map((category: ICategory) => ({
            value: category.id,
            label: category.name
          }))}
        />
      </Space>
    </Modal>
  );
};

export default ItemModal;
