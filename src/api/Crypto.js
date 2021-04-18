import { Crypt, RSA } from "hybrid-crypto-js";
// var FileReader = require("filereader");

export const encryptFile = async (file, key) => {
  return new Promise(async (resolve, reject) => {
    var crypt = new Crypt();
    var rsa = new RSA();
    let publicKey, privateKey;
    rsa.generateKeyPair((keyPair) => {
      publicKey = keyPair.publicKey;
      privateKey = keyPair.privateKey;
      console.log(file);
      let enc = crypt.encrypt(publicKey, file);
      let json = JSON.parse(enc);
      console.log(json);
      let dec = crypt.decrypt(privateKey, enc);
      console.log(dec);
      resolve(file);
    });
    reject();
  });
};

export const decryptFile = async (file, key) => {};

// todo working message enc
// let message = "hello";
// console.log(message);
// let enc = crypt.encrypt(publicKey, message);
// let json = JSON.parse(enc);
// console.log(json.cipher);
// let dec = crypt.decrypt(privateKey, enc);
// console.log(dec.message);
