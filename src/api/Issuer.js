import { Crypt } from "hybrid-crypto-js";
import { firestore } from "../firebase";
const issuer = firestore.collection("issuer");

// export const initIssuerKeys = () => {
//   var rsa = new RSA();
//   rsa.generateKeyPair((keyPair) => {
//     let pair = {
//       public: keyPair.publicKey,
//       private: keyPair.privateKey,
//     };
//     issuer.doc("issuer").set(pair);
//   });
// };
// returns issuer public key for cert gen
const getIssuerPublicKey = () => {
  return new Promise((resolve) => {
    issuer
      .doc("issuer")
      .get()
      .then((doc) => {
        resolve(doc.data().public);
      });
  });
};
// returns issuer private key for cert verif
const getIssuerPrivateKey = () => {
  return new Promise((resolve) => {
    issuer
      .doc("issuer")
      .get()
      .then((doc) => {
        resolve(doc.data().private);
      });
  });
};
// encrypt user pub key with issuer public key
export const generateUserCert = (publicKey, email) => {
  return new Promise(async (resolve) => {
    let key = await getIssuerPublicKey();
    // console.log(key);
    let message = { public: publicKey, email: email };
    var crypt = new Crypt();
    let enc = crypt.encrypt(key, message);
    resolve(enc);
  });
};
// decrypt user cert with issuer private key
export const extractPublicKeyFromCert = (cert) => {
  return new Promise(async (resolve, reject) => {
    let key = await getIssuerPrivateKey();
    var crypt = new Crypt();
    let dec = crypt.decrypt(key, cert);
    let certjson = JSON.parse(dec.message);
    let publicKey = certjson.public;
    resolve(publicKey);
  });
};
