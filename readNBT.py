import nbt, requests, json

# GET https://api.mojang.com/users/profiles/minecraft/<username>

def getPlayerdata(username):
    moJson=requests.get('https://api.mojang.com/users/profiles/minecraft/'+username)
    if moJson.status_code != 200:
        #oh no! everything's gone horribly wrong
        return "ERR: Invalid Username"
    uuid=json.loads(moJson.text)['id']
    if uuid:
        fullUUID=uuid[0:8]+"-"+uuid[8:12]+"-"+uuid[12:16]+"-"+uuid[16:20]+"-"+uuid[20:32]
        try:
            nbtfile = nbt.nbt.NBTFile("/home/rootuser/McServer/max_1-17/world/playerdata/{}.dat".format(fullUUID), 'rb')
            return [nbtfile, fullUUID]
        except:
            return "ERR: No UUID file"
    else:
        return "ERR: No uuid returned"
