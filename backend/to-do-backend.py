from flask import Flask, request, g, jsonify, session
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = "sjfsdkfbskbf"
arr = []

@app.route("/add-todo", methods = ["POST"])
def add_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    # print(data)
    if('todo' not in session):
        session["todo"] = []
    session["todo"].append(data)
    
    print(session['todo'], data)
    dict = {"response" : session['todo'], "size" : len(session['todo'])}
    return jsonify(dict)


@app.route("/get-todo", methods = ["GET"])
def get_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    dict = {"response" : g.todos, "size" : len(g.todos)}
    return jsonify(dict)


@app.route("/delete-todo", methods = ["POST"])
def delete_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    id = data["id"]

    for i in range(len(g.todos)):
        if(i["id"] == id):
            g.todos.pop(i)
            dict = {"response" : g.todos, "size" : len(g.todos)}
            return jsonify(dict)

    dict = {"response" : g.todos, "size" : len(g.todos)}
    return jsonify(dict)




@app.route("/update-todo", methods = ["POST"])
def update_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    todo = data

    for i in range(len(g.todos)):
        if(i["id"] == id):
            g.todos[i]["title"] = todo["title"]
            g.todos[i]["decription"] = todo["decription"]
            g.todos[i]["deadline"] = todo["deadline"]
            g.todos[i]["completed"] = todo["completed"] 

            dict = {"response" : g.todos, "size" : len(g.todos)}
            return jsonify(dict)

            
    return jsonify(response = "not found")


@app.route("/clear-todo", methods = ["POST"])
def clear_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    g.todos = []
    dict = {"response" : g.todos, "size" : len(g.todos)}
    return jsonify(dict)

@app.route("/completed-todo", methods = ["POST"])
def completed_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    print(data)
    id = data["id"]
    for i in range(len(g.todos)):
        if(i["id"] == id):

            i["completed"] = not i["completed"]
            dict = {"response" : g.todos, "size" : len(g.todos)}
            return jsonify(dict)
    dict = {"response" : "not found", "size" : len(g.todos)}
    return jsonify(dict)
    




if __name__ == "__main__":
    
    app.run(debug = True, port = 5000)





