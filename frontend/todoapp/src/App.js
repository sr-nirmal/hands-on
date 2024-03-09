import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from'react';
import axios from 'axios';
import Form from './Form';

function App() {
  const [todos, setTodos] = useState([]);
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

  const handleCheckboxChange = (todoId) => {
    let updatedTodo;
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const updatedTodo = todo.id === todoId ? { ...todo, completed: !todo.completed } : todo;
        console.log(updatedTodo.id);
        console.log(updatedTodo.completed);
        return updatedTodo;
      })
    );
    try{
      //make post request to server
      axios.post('http://localhost:5000/update-todo', updatedTodo);
    } catch(err){
      //log error if any
      console.error('Error updating',err);
      console.log(updatedTodo);
    }
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    //make post request to server
    await axios.post('http://localhost:5000/add-todo', todo);
    //updating local state
    setTodos([...todos, todo]);
    
  } catch(err){
    //log error if any
     
    console.log('Error posting',err);
    console.log(todo);

    //updating local state - FOR TESTING (REMOVE LATER)
    setTodos([...todos, todo]);
    console.log(todo);
    //resetting form fields
    setTodo({
      id: todo.id + 1,
      title: '',
      description: '',
      deadline: '',
      completed: false,
    });
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
