import { Button, Row, Typography, List } from 'antd';
import { CloseSquareFilled, PlusSquareFilled } from '@ant-design/icons';
import { ICategory } from './TodoListWithDesign';

const { Title, Text } = Typography;

interface CategoryListProps {
  category: ICategory;
  onAddItem: Function;
  onDeleteItem: Function;
}

const CategoryList = ({ category, onAddItem, onDeleteItem }: CategoryListProps) => {
  return (
    <List
      key={category.name}
      style={{ width: 'max(30vw, 400px)' }}
      header={
        <Row justify="space-between">
          <Title level={2}>{category.name}</Title>
          <Button type="primary" icon={<PlusSquareFilled />} onClick={() => onAddItem(category.name)}></Button>
        </Row>
      }
      bordered
      dataSource={category.items}
      renderItem={(item) => (
        <List.Item actions={[<Button type="primary" danger icon={<CloseSquareFilled />} onClick={() => onDeleteItem(category.name, item.id)} />]}>
          <Text>{item.name}</Text>
        </List.Item>
      )}
    />
  );
};

export default CategoryList;
