import requests
import json
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa


with open("public_key.pem", "rb") as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read(),
        backend=default_backend()
    )

public_pem = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)

sharable_key = public_pem.decode()

data = {"public_key": sharable_key, "division": "Badulla"}

sharable_obj = json.dumps(data, indent=4)

headers = {'Content-Type': 'application/json'}
response = requests.post('http://localhost:4000/divisions/initialize',
                         data=sharable_obj, headers=headers)

obj = json.loads(response.content.decode())

print(obj["serverPublicKey"])

with open("server_public_key.pem", "w") as key_file:
    key_file.write(obj["serverPublicKey"])
