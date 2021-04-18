import { firestore, app } from "../firebase";
import { genKeys } from "./Crypto";

const users = firestore.collection("users");
const files = firestore.collection("files");
// const groups = firestore.collection("groups");
const storage = app.storage();
const storageRef = storage.ref();

export const addUser = async (email) => {
  return new Promise((resolve) => {
    let ref = users.doc(email);
    ref.get().then(async (doc) => {
      if (doc.exists) {
        resolve(doc.data().keys);
      } else {
        console.log("new user, generating keys for " + email);
        let pair = await genKeys();
        let user = {
          keys: pair,
          groups: [],
        };
        users.doc(email).set(user);
        resolve(pair);
      }
    });
  });
};

export const addUserFile = async (file, email) => {
  return new Promise((resolve) => {
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      fileRef.getDownloadURL().then((url) => {
        let newFile = {
          owner: email,
          name: file.name,
          url: url,
        };
        files.add(newFile);
        resolve();
      });
    });
  });
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
  return new Promise((resolve, revoke) => {
    let ref = storageRef.child(file.filename);
    ref
      .delete()
      .then(async () => {
        files.doc(file.id).delete();
        resolve();
      })
      .catch((error) => {
        console.log(error);
        revoke();
      });
  });
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
