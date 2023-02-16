import { Provider, useDispatch, useSelector } from 'react-redux';
import { setName } from './ExampleSlice';
import store from './store';

export default () => {
  return (
    <Provider store={store}>
      <Display />
      <Level0 />
    </Provider>
  );
};

const Display = () => {
  const name = useSelector((state: any) => state.example.name);

  return <div>{name}</div>;
};

const Level0 = () => {
  return <Level1 />;
};

const Level1 = () => {
  return <Level2 />;
};

const Level2 = () => {
  return <Level3 />;
};

const Level3 = () => {
  const dispatch = useDispatch();
  const name = useSelector((state: any) => state.example.name);

  const handleOnChange = (e: any) => {
    dispatch(setName(e.target.value));
  };

  return <input value={name} onChange={handleOnChange} />;
};
