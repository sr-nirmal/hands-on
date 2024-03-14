import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing ReactDOM from 'react-dom/client'

import './index.css'; // Importing CSS styles

import AddTodoForm from './App'; // Importing the AddTodoForm component from './App'

// Creating a root using Concurrent Mode
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the AddTodoForm component wrapped in React.StrictMode
root.render(
  <React.StrictMode>
    <AddTodoForm />
  </React.StrictMode>
);
