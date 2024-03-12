
import {useState, useEffect} from 'react';
import axios from 'axios';
import Form from './Form';
import './MainPage.css'

function MainPage() {
    const [todos, setTodos] = useState([]);
    const [size, setSize] = useState(0);
    const [todo, setTodo] = useState({
      id : 0,
      title: '',
      description: '',
      deadline: '',
      completed: false,
    });
    const [toggle, setToggle] = useState(0);
        
    
    const handleChange = (e) => {
        setTodo({...todo, [e.target.name]: e.target.value});
        };

    const deleteTodo = async (todoId) => {


        const request_info = {method : "POST",
                                    mode : 'cors',
                                    headers : {
                                        'Content-Type': 'application/json'
                                    },
                                    body : JSON.stringify({"id" : todoId})
                                }
    fetch("http://localhost:5000/delete-todo",request_info)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setTodos(data["response"])
        setTodo({
            id : data.size + 1,
            title: '',
            description: '',
            deadline: '',
            completed: false,
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });

    };

    const handleCheckboxChange = async (todoId) => {


        const request_info = {method : "POST",
                                    mode : 'cors',
                                    headers : {
                                        'Content-Type': 'application/json'
                                    },
                                    body : JSON.stringify({"id" : todoId})
                                }
    fetch("http://localhost:5000/completed-todo",request_info)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setTodos(data["response"])
    })
    .catch(error => {
        console.error('Error:', error);
    });

    };

    const setCurrent = async (ite_todo) => {
        setTodo(ite_todo);
    }

    function updateTodo(){
        console.log("update invoked");
        const request_info = {method : "POST",
                                        mode : 'cors',
                                        headers : {
                                            'Content-Type': 'application/json'
                                        },
                                        body : JSON.stringify({"todo" : todo})
                                    }
        fetch("http://localhost:5000/update-todo",request_info)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTodos(data["response"])
            console.log(todos)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const request_info = {method : "POST",
                                        mode : 'cors',
                                        headers : {
                                            'Content-Type': 'application/json'
                                        },
                                        body : JSON.stringify({"todo" : todo})
                                    }
        fetch("http://localhost:5000/add-todo",request_info)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTodos(data["response"])
            setTodo({
                id : data.size + 1,
                title: '',
                description: '',
                deadline: '',
                completed: false,
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
  
    function getTodos(){

        const request_info = {method : "GET",
                                    mode : 'cors',
                                    headers : {
                                        'Content-Type': 'application/json'
                                    },
                                }
        fetch("http://localhost:5000/get-todo", request_info)
        .then(response => response.json())
        .then(data => {
            setTodos(data["response"])
            
            todo.id = data["size"] +1;
            setTodo({
                id : data.size + 1,
                title: '',
                description: '',
                deadline: '',
                completed: false,
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  
    if(toggle === 0){
      getTodos();
      setToggle(1);
    }
  
    return (
        <div className="todo-container">
        <h1 className="todo-title">Todo</h1>
        <Form updateTodo={updateTodo} todos={todos} setTodos={setTodos} todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} handleChange={handleChange} />
    
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
  
  export default MainPage;


 