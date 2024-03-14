// Importing React library and CSS styles
import React from 'react';
import './Form.css';

// Defining the Form component
function Form({ todo, todos, setTodo, setTodos, handleSubmit, handleChange, updateTodo }) {
  // Rendering the form
  return (
    <div className="form-container">
      {/* Form title */}
      <h2 className="form-title">Create new todo</h2>

      {/* Form with input fields */}
      <form onSubmit={handleSubmit}>
        <div className="form-input-container">
          {/* Input field for todo id */}
          <label htmlFor="title" className="form-label">Todo id:</label>
          <input
            type="text"
            value={todo.id}
            onChange={handleChange}
            name="title"
            className="form-input"
            placeholder="Enter todo id"
          />

          {/* Input field for todo title */}
          <label htmlFor="title" className="form-label">Todo title:</label>
          <input
            type="text"
            value={todo.title}
            onChange={handleChange}
            name="title"
            className="form-input"
            placeholder="Enter todo title"
          />

          {/* Input field for todo description */}
          <label htmlFor="description" className="form-label">Todo description:</label>
          <input
            type="text"
            value={todo.description}
            onChange={handleChange}
            name="description"
            className="form-input"
            placeholder="Enter todo description"
          />

          {/* Input field for todo deadline */}
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

        {/* Submit button for creating todo */}
        <input type="submit" value="Create" className="form-submit" />
      </form>

      {/* Button for updating todo */}
      <button className='form-submit' onClick={updateTodo}> Update </button>
    </div>
  );
}

// Exporting the Form component as the default export
export default Form;
