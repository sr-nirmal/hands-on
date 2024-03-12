import React from'react';
import './Form.css'
function Form({todo,todos, setTodo, setTodos, handleSubmit, handleChange, updateTodo}) {
 
    return (
      <div className="form-container">
      <h2 className="form-title">Create new todo</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-input-container">
        <label htmlFor="title" className="form-label">Todo id:</label>
          <input
            type="text"
            value={todo.id}
            onChange={handleChange}
            name="title"
            className="form-input"
            placeholder="Enter todo id"
          />
          <label htmlFor="title" className="form-label">Todo title:</label>
          <input
            type="text"
            value={todo.title}
            onChange={handleChange}
            name="title"
            className="form-input"
            placeholder="Enter todo title"
          />

          <label htmlFor="description" className="form-label">Todo description:</label>
          <input
            type="text"
            value={todo.description}
            onChange={handleChange}
            name="description"
            className="form-input"
            placeholder="Enter todo description"
          />

          <label htmlFor="deadline" className="form-label">Todo deadline:</label>
          <input
            type="date"
            value={todo.deadline}
            onChange={handleChange}
            name="deadline"
            className="form-input"
            placeholder="Enter todo deadline"
          />
        </div>

        <input type="submit" value="Create" className="form-submit" />
        
      </form>
      <button className='form-submit' onClick={updateTodo}> Update </button>
    </div>
    );
}
export default Form;