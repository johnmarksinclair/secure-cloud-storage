import { Crypt, RSA } from "hybrid-crypto-js";
import CryptoJS from "crypto-js";

const crypt = new Crypt();
const rsa = new RSA();
const aes = CryptoJS.AES;

export const generateKeys = () => {
  return new Promise((resolve) => {
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
    resolve(crypt.encrypt(key, data));
  });
};

export const decryptData = async (data, key) => {
  return new Promise((resolve) => {
    resolve(crypt.decrypt(key, data));
  });
};

export const encryptPrivateKey = async (pair, password) => {
  return new Promise((resolve) => {
    let priv = pair.private;
    let encpriv = aes.encrypt(priv, password).toString();
    resolve({ public: pair.public, private: encpriv });
  });
};

export const decryptPrivateKey = async (pair, password) => {
  return new Promise((resolve) => {
    try {
      let encpriv = pair.private;
      let decrypted = aes.decrypt(encpriv, password);
      decrypted = decrypted.toString(CryptoJS.enc.Utf8);
      resolve({ public: pair.public, private: decrypted });
    } catch (e) {
      resolve(false);
    }
  });
};

// const testaes = (encpair, password) => {
//   let privatekey = encpair.private;
//   console.log(privatekey);
//   let cipher = aes.encrypt(privatekey, password).toString();
//   console.log(">>>cipher\n" + cipher);
//   let decrypted = aes.decrypt(cipher, password).toString(CryptoJS.enc.Utf8);
//   console.log(decrypted);
// };
