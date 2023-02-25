import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import TodoListBasic from './TodoListBasic';
import TodoListEdit from './TodoListEdit';
import TodoListWithDesign from './TodoListWithDesign';
import TodoListRedux from './TodoListRedux';
import { Provider } from 'react-redux';
import TodoListReduxStore from './TodoListRedux/redux/store';
import TodoListReduxDndStore from './TodoListReduxDnd/redux/store';
import TodoListReduxDnd from './TodoListReduxDnd';
import QuoteApp from './Examples/DndExample';

const App = () => (
  <div className="app">
    <Navigation />
    <Routes>
      <Route path="/todo-list-basic" element={<TodoListBasic />} />
      <Route path="/todo-list-with-design" element={<TodoListWithDesign />} />
      <Route path="/todo-list-edit" element={<TodoListEdit />} />
      <Route
        path="/todo-list-redux"
        element={
          <Provider store={TodoListReduxStore}>
            <TodoListRedux />
          </Provider>
        }
      />
      <Route
        path="/todo-list-redux-dnd"
        element={
          <Provider store={TodoListReduxDndStore}>
            <TodoListReduxDnd />
          </Provider>
        }
      />
      <Route path="/dnd-example" element={<QuoteApp />} />
      <Route path="*" element={<Navigate to="/todo-list-basic" />} />
    </Routes>
  </div>
);

export default App;
