const crypto = require("crypto");
const fs = require("fs");
const nacl = require("tweetnacl");
const utils = require("tweetnacl-util");
const encodeBase64 = utils.encodeBase64;

console.log(__dirname);

const clientPublicKeyPath = "./middlewares/keys/serverKeys/public_key.pem";

const encrypt = (data) => {
  // Generate RSA key pair

  console.log("1");

  const clientPublicKey = fs.readFileSync(clientPublicKeyPath, "utf-8");

  console.log(clientPublicKey);
  console.log("2");

  // Encrypt the data using the RSA public key
  const encrypted = crypto.publicEncrypt(
    {
      key: clientPublicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(JSON.stringify(data))
  );

  console.log("3");

  encrypt_msg = encodeBase64(encrypted);

  console.log("4");

  return encrypted;
};

module.exports = encrypt;
