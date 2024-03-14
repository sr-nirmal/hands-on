// Importing logo image and CSS styles
import logo from './logo.svg';
import './App.css';

// Importing React hooks
import { useState, useEffect } from 'react';

// Importing MainPage component
import MainPage from './MainPage';

// Defining the App component
function App() {
  return (
    // Rendering the MainPage component inside a div
    <div>
      <MainPage />
    </div>
  );
}

// Exporting the App component as the default export
export default App;
