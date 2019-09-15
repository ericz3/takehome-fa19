from typing import Tuple

from flask import Flask, jsonify, request, Response
import mockdb.mockdb_interface as db

app = Flask(__name__)


def create_response(
    data: dict = None, status: int = 200, message: str = ""
) -> Tuple[Response, int]:
    """Wraps response in a consistent format throughout the API.
    
    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response
    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself
    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int, which is what flask expects for a response
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")

    response = {
        "code": status,
        "success": 200 <= status < 300,
        "message": message,
        "result": data,
    }
    return jsonify(response), status


"""
~~~~~~~~~~~~ API ~~~~~~~~~~~~
"""


@app.route("/")
def hello_world():
    return create_response({"content": "hello world!"})


@app.route("/mirror/<name>")
def mirror(name):
    data = {"name": name}
    return create_response(data)

@app.route("/contacts", methods=['GET'])
def get_all_contacts():
    contacts = db.get('contacts')
    args = request.args
    if "hobby" in args:
        hobby = args["hobby"]
        filtered_contacts = [c for c in contacts if c['hobby'] == hobby]
        if not filtered_contacts:
            return create_response(status=404, message="No contact with this hobby exists")
        return create_response({"contacts": filtered_contacts})
    return create_response({"contacts": contacts})

@app.route("/contacts/<id>", methods=['DELETE'])
def delete_contact(id):
    if db.getById('contacts', int(id)) is None:
        return create_response(status=404, message="No contact with this id exists")
    db.deleteById('contacts', int(id))
    return create_response(message="Contact deleted")

@app.route("/contacts/<id>", methods=['GET'])
def get_contact(id):
    if db.getById('contacts', int(id)) is None:
        return create_response(status=404, message="No contact with this id exists")
    return create_response(db.getById('contacts', int(id)))

@app.route("/contacts", methods=['POST'])
def post_contact():
    data = request.json
    if not "name" in data:
        return create_response(status=422, message="A name must be provided")
    if not "nickname" in data:
        return create_response(status=422, message="A nickname must be provided")
    if not "hobby" in data:
        return create_response(status=422, message="A hobby must be provided")
    db.create('contacts', data)
    return create_response(data, status=201)

@app.route("/contacts/<id>", methods=['PUT'])
def update_contact(id):
    if db.getById('contacts', int(id)) is None:
        return create_response(status=404, message="No contact with this id exists")
    data = request.json
    keys = list(data.keys())
    for key in keys:
        if (key != "name") and (key != "hobby"):
            del data[key]
    db.updateById('contacts', int(id), data)
    return create_response(db.getById('contacts', int(id)), status=201)



"""
~~~~~~~~~~~~ END API ~~~~~~~~~~~~
"""
if __name__ == "__main__":
    app.run(port=8080, debug=True)