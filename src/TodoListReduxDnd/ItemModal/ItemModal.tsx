import { useEffect, useState } from 'react';
import { Space, Input, Typography, Modal, Button, message as PopupMessage } from 'antd';
import { TCategoryId } from '../types/Category';
import { IItem } from '../types/Item';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addItem, deleteItem, updateItem } from '../redux/ToDoListSlice';

const { Text } = Typography;

export interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;

  initialCategoryId?: TCategoryId;
  item?: IItem;
}

const ItemModal = ({ isOpen, onClose, initialCategoryId, item }: ItemModalProps) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setSelectedCategory(initialCategoryId ?? '');
  }, [initialCategoryId]);

  useEffect(() => {
    setItemName(item?.name ?? '');
  }, [item]);

  const handleConfirm = () => {
    try {
      if (item?.id === undefined) {
        dispatch(addItem({ categoryId: selectedCategory, itemData: { name: itemName } }));
      } else {
        dispatch(
          updateItem({
            categoryId: selectedCategory,
            item: { ...item, name: itemName }
          })
        );
      }
      handleClose();
    } catch (e: any) {
      PopupMessage.error(e.cause);
    }
  };

  const handleDelete = () => {
    if (initialCategoryId !== undefined && item?.id !== undefined) {
      dispatch(deleteItem({ categoryId: initialCategoryId, itemId: item?.id }));
      handleClose();
    } else {
      PopupMessage.error(`Unknown item to delete!`);
    }
  };

  const handleClose = () => {
    setItemName('');
    onClose();
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be undone!',
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        handleDelete();
      }
    });
  };

  const handleChangeItemName = (e: any) => {
    setItemName(e.target.value);
  };

  const getTitle = (): string => {
    return (item ? 'Update' : 'Add') + ' item';
  };

  const getFooter = (): Array<any> => {
    const buttons = [
      <Button key="back" onClick={handleClose}>
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
    <Modal title={getTitle()} open={isOpen} onOk={handleConfirm} onCancel={handleClose} footer={getFooter()}>
      <Space direction="vertical">
        <Text type="secondary">Item name:</Text>
        <Input placeholder="Item name" onChange={handleChangeItemName} value={itemName} />
      </Space>
    </Modal>
  );
};

export default ItemModal;
