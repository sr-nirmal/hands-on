import React from'react';

function Form({todo,todos, setTodo, setTodos, handleSubmit, handleChange}) {
    return (
        <>
    
      <h2>Create new todo</h2>

      {/* {id : int, title : string, decription : string ,deadline : string , completed : True/False} */}

      <form onSubmit={handleSubmit}>
      <label htmlFor="todo">Todo title: </label>
      <input type="text" value={todo.title} onChange={handleChange} name="title" placeholder="Enter todo title" />
      <label htmlFor="todo">Todo description: </label>
      <input type="text" value={todo.description} onChange={handleChange} name="description" placeholder="Enter todo description" />
      <input type="date" value={todo.deadline} onChange={handleChange} name="deadline" placeholder="Enter todo deadline" />
      <input type="submit" value="Create" />
      </form>
    </>
    );
}
export default Form;