import { Button, Row, Typography, List, Space } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ICategory } from '../types/Category';
import { IItem } from '../types/Item';

const { Title, Text } = Typography;

interface CategoryListProps {
  category: ICategory;
  onEditCategory: () => void;
  onAddItem: () => void;
  onEditItem: (categoryId: string, itemId: string) => void;
}

const CategoryList = ({ category, onEditCategory, onAddItem, onEditItem }: CategoryListProps) => {
  return (
    <List
      key={category.name}
      style={{ width: 'max(30vw, 400px)' }}
      header={
        <Row justify="space-between">
          <Title level={2} style={{ marginBottom: 0 }}>
            {category.name}
          </Title>
          <Space>
            <Button type="primary" icon={<EditOutlined />} onClick={onEditCategory}></Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAddItem}></Button>
          </Space>
        </Row>
      }
      bordered
      dataSource={category.items}
      renderItem={(item: IItem) => (
        <List.Item
          className="list-item"
          actions={[<Button type="primary" icon={<EditOutlined />} onClick={() => onEditItem(category.id, item.id)} />]}
        >
          <Text>{item.name}</Text>
        </List.Item>
      )}
    />
  );
};

export default CategoryList;
