import { ReactElement, useEffect, useState } from 'react';
import { Space, Input, Typography, Modal, Button, message as PopupMessage } from 'antd';
import { ICategory } from '../types/Category';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addCatgeory, deleteCategory, updateCategory } from '../redux/ToDoListSlice';

const { Text } = Typography;

export interface CategoryModalProps {
  isOpen: boolean;
  category?: ICategory;
  onClose: () => void;
}

const CategoryModal = ({ isOpen, category, onClose }: CategoryModalProps) => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState<string>('');

  useEffect(() => {
    setItemName(category?.name ?? '');
  }, [category]);

  const handleConfirm = () => {
    try {
      if (category?.id !== undefined) {
        dispatch(updateCategory({ ...category, name: itemName }));
      } else {
        dispatch(addCatgeory({ name: itemName }));
      }
      handleClose();
    } catch (e: any) {
      PopupMessage.error(e.cause);
    }
  };

  const handleDelete = () => {
    if (category?.id !== undefined) {
      dispatch(deleteCategory({ id: category.id }));
      handleClose();
    } else {
      PopupMessage.error(`Unknown category to delete!`);
    }
  };

  const handleClose = () => {
    setItemName('');
    onClose();
  };

  const showDeleteModal = () => {
    Modal.confirm({
      title: 'Do you want to delete this category?',
      icon: <ExclamationCircleFilled />,
      content: 'This action will also remove all of its items and cannot be be undone!',
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
    return (category ? 'Update' : 'Add') + ' category';
  };

  const getFooter = (): Array<ReactElement> => {
    const buttons = [
      <Button key="back" onClick={handleClose}>
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
    <Modal title={getTitle()} open={isOpen} onOk={handleConfirm} onCancel={handleClose} footer={getFooter()}>
      <Space direction="vertical">
        <Text type="secondary">Category name:</Text>
        <Input placeholder="Category name" onChange={handleChangeItemName} value={itemName} />
      </Space>
    </Modal>
  );
};

export default CategoryModal;
