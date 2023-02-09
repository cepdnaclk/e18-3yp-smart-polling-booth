from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.exceptions import InvalidSignature
import requests
import json
import struct

with open("server_public_key.pem", "rb") as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read(),
        backend=default_backend()
    )

with open("private_key.pem", "rb") as key_file:
    private_key = serialization.load_pem_private_key(
        key_file.read(),
        password=None,
        backend=default_backend()
    )

# Encrypt the message using the public key
obj = {
    "party": "party-0",
    "divisionID": "63c6f44fc7c1579fcad93934"
}

message = json.dumps(obj).encode()

print(message)

signature = private_key.sign(
    message,
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH
    ),
    hashes.SHA256()
)

encrypted_message = public_key.encrypt(
    message,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)


def decrypt(encrypted_message):

    print(encrypted_message)
    # Read the private key from file
    with open("private_key.pem", "rb") as key_file:
        private_key = serialization.load_pem_private_key(
            key_file.read(),
            password=None,
            backend=default_backend()
        )

    print(private_key)
    # Decrypt the message
    original_message = private_key.decrypt(
        encrypted_message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return original_message.decode()


print(signature)
print("---------")
print(encrypted_message)


# Get the sizes of the signature and the encrypted message
signature_size = len(signature)
encrypted_message_size = len(encrypted_message)


print(signature_size)
print("---------")
print(encrypted_message_size)

# Pack the sizes into a byte representation
signature_size_bytes = struct.pack("i", signature_size)
encrypted_message_size_bytes = struct.pack("i", encrypted_message_size)

print(signature_size_bytes)
print("---------")
print(encrypted_message_size_bytes)

# Concatenate the sizes, the signature and the encrypted message
signed_and_encrypted_data = signature_size_bytes + \
    encrypted_message_size_bytes + signature + encrypted_message

# Send the encrypted message to the server
headers = {"Content-type": "application/octet-stream", "division": "Badulla"}
response = requests.post('http://localhost:4000/votes/addwithEncrypt',
                         data=encrypted_message, headers=headers)

print("--------------")
print(response.content)
