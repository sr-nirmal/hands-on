from flask import Flask, request, g, jsonify, session
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = "sjfsdkfbskbf"
arr = []




@app.route("/add-todo", methods = ["POST"])
def add_todo():
    data = request.get_json()
    todo = data.get("todo", {})  # Extract 'todo' from JSON data

    for i in range(len(arr)):
        if(arr[i]["id"] == todo['id']):
            arr[i]["title"] = todo["title"]
            arr[i]["description"] = todo["description"]
            arr[i]["deadline"] = todo["deadline"]
            arr[i]["completed"] = todo["completed"] 

            dict = {"response" : arr, "size" : len(arr)}
            return jsonify(dict)


    todo['id'] = len(arr) + 1
    arr.append(todo)
    print(arr)
    response_dict = {"response": arr, "size": len(arr)}
    return jsonify(response_dict)


@app.route("/get-todo", methods = ["GET"])
def get_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    dict = {"response" : arr, "size" : len(arr)}
    print(arr)
    return jsonify(dict)


@app.route("/delete-todo", methods = ["POST"])
def delete_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    id = data["id"]

    for i in range(len(arr)):
        if(arr[i]["id"] == id):
            arr.pop(i)
            dict = {"response" : arr, "size" : len(arr)}
            return jsonify(dict)

    dict = {"response" : arr, "size" : len(arr)}
    return jsonify(dict)




@app.route("/update-todo", methods = ["POST"])
def update_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    todo = data["todo"]
    print("in update todo -> ", todo)
    for i in range(len(arr)):
        if(arr[i]["id"] == todo['id']):
            arr[i]["title"] = todo["title"]
            arr[i]["description"] = todo["description"]
            arr[i]["deadline"] = todo["deadline"]
            arr[i]["completed"] = todo["completed"] 

            dict = {"response" : arr, "size" : len(arr)}
            return jsonify(dict)

            
    dict = {"response" : arr, "size" : len(arr)}
    return jsonify(dict)


@app.route("/clear-todo", methods = ["POST"])
def clear_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    arr = []
    dict = {"response" : arr, "size" : len(arr)}
    return jsonify(dict)

@app.route("/completed-todo", methods = ["POST"])
def completed_todo():
    # {id : int, title : string, decription : string ,deadline : string , completed : True/False}
    data = request.get_json()
    print(data)
    id = data["id"]
    for i in range(len(arr)):
        if(arr[i]["id"] == id):
            print(id, arr[i])
            arr[i]["completed"] = not arr[i]["completed"]
            dict = {"response" : arr, "size" : len(arr)}
            return jsonify(dict)
    dict = {"response" : "not found", "size" : len(arr)}
    return jsonify(dict)
    




if __name__ == "__main__":
    
    app.run(debug = True, port = 5000)





