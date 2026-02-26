import requests

response = requests.post("http://localhost:8080/entry", json= { "type": "ingredient", "name": "Lettuce", "cookTime": 1 })
print(response.json())