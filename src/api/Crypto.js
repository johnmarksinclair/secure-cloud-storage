import { Crypt, RSA } from "hybrid-crypto-js";

export const generateKeys = () => {
  return new Promise((resolve) => {
    var rsa = new RSA();
    rsa.generateKeyPair((keyPair) => {
      resolve({
        public: keyPair.publicKey,
        private: keyPair.privateKey,
      });
    });
  });
};

export const encryptData = async (data, key) => {
  return new Promise((resolve) => {
    var crypt = new Crypt();
    resolve(crypt.encrypt(key, data));
  });
};

export const decryptData = async (data, key) => {
  return new Promise((resolve) => {
    var crypt = new Crypt();
    resolve(crypt.decrypt(key, data));
  });
};
