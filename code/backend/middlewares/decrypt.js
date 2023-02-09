const crypto = require("crypto");
const fs = require("fs");

const privatePath = "./middlewares/keys/serverKeys/private.pem";

const decrypt = (cipher_message) => {
  const privateKey = fs.readFileSync(privatePath, "utf8");
  console.log(privateKey);

  const decrypted_message = crypto
    .privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      cipher_message
    )
    .toString();

  return decrypted_message;
};

module.exports = decrypt;
