const verify = (signature, message, divisionName) => {
  console.log("called");
  const public_key_path = `./middlewares/keys/divisionPublicKeys/${divisionName}_public_key.pem`;
  console.log(public_key_path);

  const clientPublicKey = fs.readFileSync(public_key_path, "utf-8");
  console.log(clientPublicKey);

  console.log(signature);
  console.log(message);
  console.log(divisionName);

  // Verify the signature
  const verified = crypto
    .createVerify("SHA256")
    .update(decrypt_msg)
    .verify(clientPublicKey, signature);

  if (verified) {
    res.status(200).send("The signature is valid.");
  } else {
    res.status(401).send("The signature is not valid.");
  }
};

module.exports = verify;
