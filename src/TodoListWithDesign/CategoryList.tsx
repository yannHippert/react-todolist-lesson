import { Button, Row, Typography, List } from 'antd';
import { CloseSquareFilled, PlusSquareFilled } from '@ant-design/icons';
import { ICategory, IItem } from './TodoListWithDesign';

const { Title, Text } = Typography;

interface CategoryListProps {
  category: ICategory;
  onAddItem: (categoryName: string) => void;
  onDeleteItem: (categoryName: string, itemId: string) => void;
}

const CategoryList = ({ category, onAddItem, onDeleteItem }: CategoryListProps) => {
  return (
    <List
      key={category.name}
      style={{ width: 'max(30vw, 400px)' }}
      header={
        <Row justify="space-between" align="middle">
          <Title level={2} style={{ marginBottom: 0 }}>
            {category.name}
          </Title>
          <Button type="primary" icon={<PlusSquareFilled />} onClick={() => onAddItem(category.name)}></Button>
        </Row>
      }
      bordered
      dataSource={category.items}
      renderItem={(item: IItem) => (
        <List.Item className="list-item" actions={[<Button type="primary" danger icon={<CloseSquareFilled />} onClick={() => onDeleteItem(category.name, item.id)} />]}>
          <Text>{item.name}</Text>
        </List.Item>
      )}
    />
  );
};

export default CategoryList;
