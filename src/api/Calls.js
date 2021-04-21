import { firestore, app } from "../firebase";
import { generateKeys, encryptData, decryptData } from "./Crypto";

const users = firestore.collection("users");
const files = firestore.collection("files");
// const groups = firestore.collection("groups");
const storage = app.storage();
const storageRef = storage.ref();

export const getUser = async (email) => {
  return new Promise((resolve) => {
    let ref = users.doc(email);
    ref.get().then(async (doc) => {
      if (doc.exists) {
        resolve(doc.data().keys);
      } else {
        console.log("new user, generating keys for " + email);
        let pair = await generateKeys();
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

export const addUserFile = async (file, email, key, dupe) => {
  return new Promise(async (resolve) => {
    if (dupe) await deleteFile(dupe);
    let filename = email + "&^%" + file.name;
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(filename);
    let dataurlfile = await fileToDataUrl(file);
    let encdataurl = await encryptData(dataurlfile, key);
    let encfilejson = JSON.parse(encdataurl);
    let str = JSON.stringify(encfilejson);
    fileRef.putString(str).then(() => {
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
  if (snapshot.empty) return;
  snapshot.forEach((doc) => fileArr.push(createFileObj(doc)));
  return fileArr;
};

export const deleteFile = async (file) => {
  return new Promise((resolve) => {
    let ref = storageRef.child(file.filename);
    ref
      .delete()
      .then(() => {
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

export const downloadFile = async (file, key) => {
  return new Promise(async (resolve) => {
    var reader = new FileReader();
    let data = await fetch(file.url);
    let blob = await data.blob();
    reader.readAsText(blob);
    reader.onload = async () => {
      let decdata = await decryptData(reader.result, key);
      let decfile = await dataUrlToFile(decdata.message);
      let fileurl = URL.createObjectURL(decfile);
      // window.open(fileurl);
      let a = document.createElement("a");
      a.href = fileurl;
      a.download = file.filename.split("&^%")[1];
      a.click();
      resolve();
    };
  });
};

export const dataUrlToFile = (dataurl, filename) => {
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

export const fileToDataUrl = (file) => {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
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
