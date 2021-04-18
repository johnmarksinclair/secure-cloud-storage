import { firestore, app } from "../firebase";
import { RSA } from "hybrid-crypto-js";

const users = firestore.collection("users");
const files = firestore.collection("files");
// const groups = firestore.collection("groups");
const storage = app.storage();
const storageRef = storage.ref();

export const addUser = async (email) => {
  let ref = users.doc(email);
  ref.get().then(async (doc) => {
    if (doc.exists) {
      console.log(doc.data());
      // let pub = doc.data().keys.public;
      // let priv = doc.data().keys.private;
    } else {
      console.log("new user, generating keys for " + email);
      var rsa = new RSA();
      rsa.generateKeyPair((keyPair) => {
        let pair = {
          public: keyPair.publicKey,
          private: keyPair.privateKey,
        };
        let user = {
          keys: pair,
          groups: [],
        };
        // console.log(user);
        users.doc(email).set(user);
      });
    }
  });
};

export const addUserFile = async (doc) => {
  files.add(doc);
};

export const getUserFiles = async (email) => {
  let snapshot = await files.where("owner", "==", email).get();
  let fileArr = [];
  if (snapshot.empty) {
    return;
  }
  snapshot.forEach((doc) => {
    let fileObj = createFileObj(doc);
    fileArr.push(fileObj);
  });
  return fileArr;
};

export const deleteFile = async (file) => {
  let ref = storageRef.child(file.filename);
  ref
    .delete()
    .then(async () => {
      files.doc(file.id).delete();
      console.log("file deleted");
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
  return false;
};

export const createFileObj = (doc) => {
  let fileObj = {
    id: `${doc.id}`,
    owner: `${doc.data().owner}`,
    download: `${doc.data().url}`,
    filename: `${doc.data().name}`,
  };
  return fileObj;
};
