# Import necessary modules from Flask framework
from flask import Flask, request, g, jsonify, session
# Import CORS (Cross-Origin Resource Sharing) to handle cross-origin requests
from flask_cors import CORS

# Create a Flask application instance
app = Flask(__name__)
# Apply CORS to the Flask application instance
CORS(app)
# Set a secret key for the Flask application, used for securely signing session cookies
app.secret_key = "sjfsdkfbskbf"
# Initialize an empty list to store todo items
arr = []

# Define a route '/add-todo' with method POST to add a new todo item
@app.route("/add-todo", methods=["POST"])
def add_todo():
    # Retrieve JSON data from the request
    data = request.get_json()
    # Extract 'todo' object from JSON data
    todo = data.get("todo", {})

    # Loop through the list of todo items
    for i in range(len(arr)):
        # Check if the todo item already exists based on its id
        if arr[i]["id"] == todo['id']:
            # Update the existing todo item with new data
            arr[i]["title"] = todo["title"]
            arr[i]["description"] = todo["description"]
            arr[i]["deadline"] = todo["deadline"]
            arr[i]["completed"] = todo["completed"]

            # Construct response dictionary
            response_dict = {"response": arr, "size": len(arr)}
            # Return JSON response
            return jsonify(response_dict)

    # If the todo item doesn't exist, add it to the list
    todo['id'] = len(arr) + 1
    arr.append(todo)
    # Construct response dictionary
    response_dict = {"response": arr, "size": len(arr)}
    # Return JSON response
    return jsonify(response_dict)

# Define a route '/get-todo' with method GET to retrieve all todo items
@app.route("/get-todo", methods=["GET"])
def get_todo():
    # Construct response dictionary containing all todo items and their count
    response_dict = {"response": arr, "size": len(arr)}
    # Return JSON response
    return jsonify(response_dict)

# Define a route '/delete-todo' with method POST to delete a todo item by its id
@app.route("/delete-todo", methods=["POST"])
def delete_todo():
    # Retrieve JSON data from the request
    data = request.get_json()
    # Extract id of the todo item to be deleted
    id = data["id"]

    # Loop through the list of todo items
    for i in range(len(arr)):
        # Find the todo item with matching id
        if arr[i]["id"] == id:
            # Remove the todo item from the list
            arr.pop(i)
            # Construct response dictionary
            response_dict = {"response": arr, "size": len(arr)}
            # Return JSON response
            return jsonify(response_dict)

    # If the todo item is not found, return the current list of todo items
    response_dict = {"response": arr, "size": len(arr)}
    # Return JSON response
    return jsonify(response_dict)

# Define a route '/update-todo' with method POST to update a todo item
@app.route("/update-todo", methods=["POST"])
def update_todo():
    # Retrieve JSON data from the request
    data = request.get_json()
    # Extract the todo item to be updated
    todo = data["todo"]

    # Loop through the list of todo items
    for i in range(len(arr)):
        # Find the todo item with matching id
        if arr[i]["id"] == todo['id']:
            # Update the todo item with new data
            arr[i]["title"] = todo["title"]
            arr[i]["description"] = todo["description"]
            arr[i]["deadline"] = todo["deadline"]
            arr[i]["completed"] = todo["completed"]

            # Construct response dictionary
            response_dict = {"response": arr, "size": len(arr)}
            # Return JSON response
            return jsonify(response_dict)

    # If the todo item is not found, return the current list of todo items
    response_dict = {"response": arr, "size": len(arr)}
    # Return JSON response
    return jsonify(response_dict)

# Define a route '/clear-todo' with method POST to clear all todo items
@app.route("/clear-todo", methods=["POST"])
def clear_todo():
    # Clear the list of todo items
    arr = []
    # Construct response dictionary
    response_dict = {"response": arr, "size": len(arr)}
    # Return JSON response
    return jsonify(response_dict)

# Define a route '/completed-todo' with method POST to mark a todo item as completed
@app.route("/completed-todo", methods=["POST"])
def completed_todo():
    # Retrieve JSON data from the request
    data = request.get_json()
    # Extract id of the todo item to be marked as completed
    id = data["id"]
    # Loop through the list of todo items
    for i in range(len(arr)):
        # Find the todo item with matching id
        if arr[i]["id"] == id:
            # Toggle the 'completed' status of the todo item
            arr[i]["completed"] = not arr[i]["completed"]
            # Construct response dictionary
            response_dict = {"response": arr, "size": len(arr)}
            # Return JSON response
            return jsonify(response_dict)
    # If the todo item is not found, return an error response
    response_dict = {"response": "not found", "size": len(arr)}
    # Return JSON response
    return jsonify(response_dict)

# Run the Flask application
if __name__ == "__main__":
    app.run(debug=True, port=5000)
