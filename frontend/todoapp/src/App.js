import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from'react';
import axios from 'axios';
import Form from './Form';

function App() {
  const [todos, setTodos] = useState([]);
  const [size, setSize] = useState(0);
  const [todo, setTodo] = useState({
    id: 1,
    title: '',
    description: '',
    deadline: '',
    completed: false,
  });
      
  
  const handleChange = (e) => {
    setTodo({...todo, [e.target.name]: e.target.value});
  };

  const handleCheckboxChange = async (todoId) => {
    let updatedTodoItem;
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        updatedTodoItem = todo.id === todoId ? { ...todo, completed: !todo.completed } : todo;
        console.log(updatedTodoItem.id);
        console.log(updatedTodoItem.completed);
        return updatedTodoItem;
      })
    );
    try {
      // Make post request to server using the correct variable
      await axios.post('http://localhost:5000/update-todo', updatedTodoItem);
    } catch (err) {
      // Log error if any
      console.error('Error updating', err);
      console.log(updatedTodoItem);
    }
  };
  
  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    //  post request to server
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/add-todo',
      data: todo,
    });

    // check if 'response' and 'response.data' are sent back
    if (response && response.data) {
      // print successful response
      console.log('Response:', response.data);

      // when server returns the updated todo
      setTodos([...todos, response.data.todo]);
      setTodo({
        id: response.data.todo.id + 1,
        title: '',
        description: '',
        deadline: '',
        completed: false,
      });
    } else {
      console.error('Invalid response:', response);
    }
  } catch (error) {
    // handle error
    console.error('Error:', error);
    // log error 
    console.log(error.response ? error.response.data : error.message);

    // update local state for testing (remove later)
    setTodos([...todos, todo]);
  }
};


  return (
    <>
      <h1>Todo</h1>
      <Form todos={todos} setTodos={setTodos} todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} handleChange={handleChange} />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Deadline: ${todo.deadline}, Completed: `}
            <input
              type="checkbox"
              name="completed"
              onChange={() => handleCheckboxChange(todo.id)}
              checked={todo.completed}
            />
          </li>
        ))}
      </ul>
    </>

    );
}

export default App;
