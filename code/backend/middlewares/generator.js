const crypto = require("crypto");
const fs = require("fs");

const keyDir = "./middlewares/keys";

if (!fs.existsSync(keyDir)) {
  fs.mkdirSync(keyDir);
}

const publicPath = "./middlewares/keys/serverKeys/public.pem";
const privatePath = "./middlewares/keys/serverKeys/private.pem";

const generateRsaPair = () => {
  // Generate RSA key pair

  const serverPrivateKey = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicExponent: 65537,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  fs.writeFileSync(publicPath, serverPrivateKey.publicKey, "utf8");
  fs.writeFileSync(privatePath, serverPrivateKey.privateKey, "utf8");
};

module.exports = generateRsaPair;
