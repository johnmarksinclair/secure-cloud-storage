import { firestore } from "../firebase";

const users = firestore.collection("users");
const files = firestore.collection("files");
// const groups = firestore.collection("groups");

export const addUser = async (email) => {
  let ref = await users.doc(email);
  ref.get().then((doc) => {
    if (doc.exists) {
      console.log("user has keys");
      console.log(doc.data());
    } else {
      let keys = generateKeys(email);
      let user = {
        keys: keys,
        groups: [],
      };
      users.doc(email).set(user);
    }
  });
};

const generateKeys = (email) => {
  //todo gen keys
  console.log("generating keys for " + email);
  return {
    public: 1234,
    private: 4321,
  };
};

export const addUserFile = async (doc) => {
  files.add(doc);
};

export const getUserFiles = async (email) => {
  let snapshot = await files.where("owner", "==", email).get();
  let fileArr = [];
  if (snapshot.empty) {
    console.log("no files");
    return;
  }
  snapshot.forEach((doc) => {
    // console.log(doc.data());
    let fileObj = createFileObj(doc);
    // console.log(fileObj);
    fileArr.push(fileObj);
  });
  return fileArr;
};

export const createUserObj = () => {};
export const createFileObj = (doc) => {
  let fileObj = {
    owner: `${doc.data().owner}`,
    download: `${doc.data().url}`,
    filename: `${doc.data().name}`,
  };
  return fileObj;
};
