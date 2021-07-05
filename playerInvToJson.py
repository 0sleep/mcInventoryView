
def toJson(nbtfile):
    output = {'status':'success', 'data':[], 'uuid':nbtfile[1]} #dict that is actually a list, dicts suck for iteration
    for item in nbtfile[0]["Inventory"].tags:
        currItem = {'Slot':int(item['Slot'].value),
                            'id':str(item['id'].value),
                            'Count':int(item['Count'].value),
                            'Enchanted':checkEnchanted(item)}
        output['data'].append(currItem)
    return output

def checkEnchanted(item):
    try:
        unused=item["tag"]["Enchantments"]
        return True
    except KeyError:
        return False