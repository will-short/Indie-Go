import time
import requests
import json
with open("data.txt", 'r') as f:
    content = f.readlines()

i = 0
with open('gameData.json', 'a') as j:
    for s in content:
        time.sleep(1)
        data = requests.get(
            'http://store.steampowered.com/api/appdetails/', params={"appids": s})
        jsonData = data.json()
        try:
            actualData = list(jsonData.values())[0]["data"]
            if actualData["type"] == "game":
                try:
                    storedData = {
                        "name": actualData["name"], "description": actualData["short_description"], "price": actualData["price_overview"]["final_formatted"], "image_urls": [actualData["header_image"]] + [url["path_full"] for url in actualData["screenshots"][:4]], "price": actualData["price_overview"]["final_formatted"], "video_url": actualData["movies"][0]["webm"]["max"], "genres": [data['description'] for data in actualData["genres"]]}
                    print(storedData)
                    storedString = json.dumps(storedData)
                    j.write(storedString)
                    j.write('\n')
                except:
                    pass
        except:
            pass
