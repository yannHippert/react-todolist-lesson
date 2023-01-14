import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import TodoListBasic from './TodoListBasic';
import TodoListDragAndDrop from './TodoListDragAndDrop';
import TodoListRedux from './TodoListRedux';
import TodoListWithDesign from './TodoListWithDesign';

const App = () => (
    <div className="app">
        <Navigation />
        <Routes>
            <Route path="/todo-list-basic" element={<TodoListBasic />} />
            <Route path="/todo-list-with-design" element={<TodoListWithDesign />} />
            <Route path="/todo-list-drag-and-drop" element={<TodoListDragAndDrop />} />
            <Route path="/todo-list-redux" element={<TodoListRedux />} />
            <Route path="*" element={<Navigate to="/todo-list-basic" />} />
        </Routes>
    </div>
);

export default App;
