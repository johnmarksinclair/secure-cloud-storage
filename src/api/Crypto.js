import { Crypt, RSA } from "hybrid-crypto-js";

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

export const encryptFile = async (data, key) => {
  return new Promise((resolve) => {
    var crypt = new Crypt();
    let enc = crypt.encrypt(key, data);
    resolve(enc);
  });
};

export const decryptFile = async (data, key) => {
  return new Promise((resolve) => {
    var crypt = new Crypt();
    let dec = crypt.decrypt(key, data);
    resolve(dec);
  });
};
