const crypto = require("crypto");
const fs = require("fs");

const keyDir = "./middlewares/keys/serverKeys";

const divisionPublicKeysdir = "./middlewares/keys/divisionPublicKeys/";

const publicPath = "./middlewares/keys/serverKeys/public.pem";
const privatePath = "./middlewares/keys/serverKeys/private.pem";

const generateRsaPair = () => {
  // make Directoreis
  if (!fs.existsSync(keyDir)) {
    fs.mkdirSync(keyDir);
  }
  if (!fs.existsSync(divisionPublicKeysdir)) {
    fs.mkdirSync(divisionPublicKeysdir);
  }

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
