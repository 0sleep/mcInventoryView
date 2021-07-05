import flask
from flask import request, jsonify, render_template, url_for
import readNBT
import playerInvToJson

app = flask.Flask(__name__)
app.config["DEBUG"] = True #lets try no debug mode

@app.route('/', methods=['GET'])
def home():
    return render_template("main.html")
@app.route('/api/v1/inventories', methods=['GET']) # return all contents of inventory in a fancy tree
def apiGetInvTree():
    if 'player' in request.args:
        player = str(request.args['player'])
    else:
        return "Error: No player provided"
    
    playerdata = readNBT.getPlayerdata(player)
    # data, count(, index(, name, type
    return "<pre>{}</pre>".format(playerdata[0].get("Inventory").pretty_tree())

@app.route('/api/v1/items', methods=['GET']) # return items only in a json string (make better later)
def apiGetInvItems():
    if 'player' in request.args:
        player = str(request.args['player'])
    else:
        return jsonify({'status':'fail', 'data':"ERR: No player provided"})
    playerdata = readNBT.getPlayerdata(player)
    if type(playerdata)==str: #if its a string, we have failed
        return jsonify({'status':'fail', 'data':playerdata})
    output = playerInvToJson.toJson(playerdata)
    return output
app.run()