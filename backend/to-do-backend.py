from flask import Flask, request, g, jsonify
from flask_cors import CORS


app = Flask(__name__)

@app.before_request
def before_request():
    g.todos = []
    pass


@app.route("/add-todo", method = ["POST"])
def add_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    g.todos.append(data['todo'])

    return jsonify(response = "success")


@app.route("/get-todo", method = ["GET"])
def get_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    return jsonify(response = g.todos)


@app.route("/delete-todo", method = ["POST"])
def delete_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    id = data["id"]

    for i in range(len(g.todos)):
        if(i["id"] == id):
            g.todos.pop(i)
            return jsonify(response = "success") 

    return jsonify(response = "not found")



@app.route("/update-todo", method = ["POST"])
def update_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    todo = data["todo"]

    for i in range(len(g.todos)):
        if(i["id"] == id):
            g.todos[i]["title"] = todo["title"]
            g.todos[i]["decription"] = todo["decription"]
            g.todos[i]["deadline"] = todo["deadline"]
            g.todos[i]["completed"] = todo["completed"] 
            return jsonify(response = "success") 

    return jsonify(response = "not found")




