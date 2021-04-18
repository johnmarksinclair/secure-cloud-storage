import { Crypt, RSA } from "hybrid-crypto-js";
// var FileReader = require("filereader");

export const genKeys = () => {
  return new Promise((resolve) => {
    var rsa = new RSA();
    rsa.generateKeyPair((keyPair) => {
      let pair = {
        public: keyPair.publicKey,
        private: keyPair.privateKey,
      };
      resolve(pair);
    });
  });
};

export const encryptFile = async (file, keys) => {
  return new Promise((resolve) => {
    console.log(keys);
    var crypt = new Crypt();
    let message = "hello";
    let enc = crypt.encrypt(keys.public, message);
    let dec = crypt.decrypt(keys.private, enc);
    console.log(message);
    let json = JSON.parse(enc);
    console.log(json.cipher);
    console.log(dec.message);
    resolve(file);
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
