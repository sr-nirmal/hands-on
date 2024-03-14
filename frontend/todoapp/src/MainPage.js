// Importing useState and useEffect hooks from 'react' library
import { useState, useEffect } from 'react';

// Importing Form component from './Form'
import Form from './Form';

// Importing CSS styles
import './MainPage.css';

// Defining the MainPage component
function MainPage() {
  // State variables for managing todos and the current todo being edited
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: 0,
    title: '',
    description: '',
    deadline: '',
    completed: false,
  });

  // Function to handle input changes in the form
  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  // Function to delete a todo item
  const deleteTodo = async (todoId) => {
    // Constructing request body
    const request_info = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "id": todoId })
    };

    // Sending delete request to the server
    fetch("http://localhost:5000/delete-todo", request_info)
      .then(response => response.json())
      .then(data => {
        setTodos(data["response"]);
        setTodo({
          id: data.size + 1,
          title: '',
          description: '',
          deadline: '',
          completed: false,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Function to handle checkbox change for marking todo as completed
  const handleCheckboxChange = async (todoId) => {
    // Constructing request body
    const request_info = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "id": todoId })
    };

    // Sending request to mark todo as completed to the server
    fetch("http://localhost:5000/completed-todo", request_info)
      .then(response => response.json())
      .then(data => {
        setTodos(data["response"]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Function to set the current todo being edited
  const setCurrent = async (ite_todo) => {
    setTodo(ite_todo);
  };

  // Function to update a todo item
  function updateTodo() {
    // Constructing request body
    const request_info = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "todo": todo })
    };

    // Sending update request to the server
    fetch("http://localhost:5000/update-todo", request_info)
      .then(response => response.json())
      .then(data => {
        setTodos(data["response"]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to handle form submission for creating a new todo item
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Constructing request body
    const request_info = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "todo": todo })
    };

    // Sending request to add a new todo item to the server
    fetch("http://localhost:5000/add-todo", request_info)
      .then(response => response.json())
      .then(data => {
        setTodos(data["response"]);
        setTodo({
          id: data.size + 1,
          title: '',
          description: '',
          deadline: '',
          completed: false,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Function to fetch all todo items from the server
  function getTodos() {
    // Constructing request info
    const request_info = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    };

    // Fetching todo items from the server
    fetch("http://localhost:5000/get-todo", request_info)
      .then(response => response.json())
      .then(data => {
        setTodos(data["response"]);
        setTodo({
          id: data.size + 1,
          title: '',
          description: '',
          deadline: '',
          completed: false,
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Fetching todos from the server on component mount
  useEffect(() => {
    getTodos();
  }, []);

  // Rendering the MainPage component
  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo</h1>
      {/* Rendering the Form component */}
      <Form
        updateTodo={updateTodo}
        todos={todos}
        setTodos={setTodos}
        todo={todo}
        setTodo={setTodo}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />

      {/* Rendering todo items */}
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-details">
              {`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Deadline: ${todo.deadline}, Completed: `}
              <input
                type="checkbox"
                name="completed"
                onChange={() => handleCheckboxChange(todo.id)}
                checked={todo.completed}
                className="todo-checkbox"
              />
            </div>
            <div className="todo-item-buttons">
              <button onClick={() => setCurrent(todo)} className="todo-item-button">Edit</button>
              <button onClick={() => deleteTodo(todo.id)} className="todo-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Exporting the MainPage component as the default export
export default MainPage;
