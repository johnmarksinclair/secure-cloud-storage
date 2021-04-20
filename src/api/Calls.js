import { firestore, app } from "../firebase";
import { genKeys, encryptFile, decryptFile } from "./Crypto";

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

export const addUserFile = async (file, email, key) => {
  return new Promise(async (resolve) => {
    let filename = file.name;
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(filename);

    let b64 = await fileToBase64(file);
    let encryptedfile = await base64ToEncryptedFile(b64, filename, key);

    fileRef.put(encryptedfile).then(() => {
      fileRef.getDownloadURL().then(async (url) => {
        let newFile = {
          owner: email,
          name: filename,
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
  return new Promise((resolve) => {
    let ref = storageRef.child(file.filename);
    ref
      .delete()
      .then(async () => {
        files
          .doc(file.id)
          .delete()
          .then(() => resolve());
      })
      .catch(() => {
        files
          .doc(file.id)
          .delete()
          .then(() => resolve());
      });
  });
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const base64ToEncryptedFile = async (dataurl, filename, key) => {
  return new Promise(async (resolve) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let encryptedArr = await encryptFile(u8arr, key);
    u8arr = encryptedArr;
    resolve(new File([u8arr], filename, { type: mime }));
  });
};

export const base64ToDecryptedFile = async (dataurl, filename, key) => {
  return new Promise(async (resolve) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var string = new TextDecoder().decode(u8arr);
    // console.log(string);
    let decrypted = await decryptFile(string, key);
    decrypted = decrypted.message;
    // console.log(decryptedArr);
    u8arr = new TextEncoder().encode(decrypted);
    resolve(new File([u8arr], filename, { type: mime }));
  });
};

export const dataURLtoFile = (dataurl, filename) => {
  return new Promise((resolve) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    resolve(new File([u8arr], filename, { type: mime }));
  });
};

export const createFileObj = (doc) => {
  let fileObj = {
    id: `${doc.id}`,
    owner: `${doc.data().owner}`,
    url: `${doc.data().url}`,
    filename: `${doc.data().name}`,
  };
  return fileObj;
};
