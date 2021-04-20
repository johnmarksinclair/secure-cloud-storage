import { Header, Icon, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";
import {
  addUserFile,
  getUserFiles,
  deleteFile,
  fileToBase64,
  base64ToDecryptedFile,
} from "../api/Calls";
import DeleteModal from "../components/DeleteModal";
import DupeModal from "../components/DupeModal";
import { Button } from "react-bootstrap";

const Files = ({ email, keys }) => {
  const [files, setFiles] = useState([]);
  const [flag, setFlag] = useState(false);
  const [dupeModalShow, setDupeShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModalShow, setDeleteShow] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const handleDeleteShow = (file) => {
    setCurrentFile(file);
    setDeleteShow(true);
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [flag, keys]);

  const updateData = async () => {
    let userfiles = await getUserFiles(email);
    let fileArr = [];
    if (userfiles) {
      userfiles.forEach((f) => {
        fileArr.push(f);
      });
    }
    setFiles(fileArr);
  };

  const isDuplicate = (passed) => {
    let flag = false;
    files.forEach((f) => {
      if (f.filename === passed) flag = true;
    });
    return flag;
  };

  const handleUpload = async (e) => {
    setLoading(true);
    let file = e.target.files;
    if (file.length > 0) {
      file = e.target.files[0];
      if (isDuplicate(file.name)) {
        setDupeShow(true);
        setLoading(false);
      } else if (file.size / 1000 < 50 * 1024 * 1024) {
        addUserFile(file, email, keys.public).then(() => {
          setFlag(!flag);
          setLoading(false);
        });
      } else {
        console.log("file too large");
        setLoading(false);
      }
    }
    e.target.value = null;
    setLoading(false);

    // console.log(encmessage);
    // let dec = await decryptFile(enc, keys.private);
    // dec = dec.message;
    // let obj = await dataURLtoFile(dec, filename);
    // let objurl = URL.createObjectURL(obj);
    // window.open(objurl);
    // setLoading(false);
  };

  const handleDecrypt = async (e) => {
    let file = e.target.files[0];
    e.target.value = null;
    console.log(file);
    let filename = file.name;
    console.log(filename);
    let b64 = await fileToBase64(file);
    // console.log(b64);
    let decrypted = await base64ToDecryptedFile(b64, filename, keys.private);
    console.log(decrypted);
    let objurl = URL.createObjectURL(decrypted);
    window.open(objurl);

    // let b64 = await fileToBase64(file);
    // console.log(b64);
    // let dec = await decryptFile(b64, keys.private);
    // dec = dec.message;
    // let obj = await dataURLtoFile(dec, file.name);
    // console.log(obj);
    // let objurl = URL.createObjectURL(obj);
    // window.open(objurl);
  };

  const downloadFile = async (file) => {
    window.open(file.url);
  };

  const handleDelete = async (file) => {
    setDeleteShow(false);
    deleteFile(file).then(() => setFlag(!flag));
  };

  const FileButton = ({ file }) => {
    return (
      <div className="py-1 d-flex align-items-center">
        <div className="overflow-hidden mr-3 elip">{file.filename}</div>
        <div className="ml-auto">
          <Button variant="outline-info" onClick={() => downloadFile(file)}>
            <Icon name="arrow alternate circle down outline" />
            Download
          </Button>
        </div>
        <div className="pl-2">
          <Button variant="danger" onClick={() => handleDeleteShow(file)}>
            <Icon name="delete" />
            Delete
          </Button>
        </div>
      </div>
    );
  };

  const DisplayFiles = () => {
    return (
      <div className="h-100 pt-3 col">
        {files.length > 0 ? (
          files.map((f, index) => <FileButton file={f} key={index} />)
        ) : (
          <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <Header icon>
              <Icon name="file outline" />
              No Files
            </Header>
            Add some with the button above
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="vh col py-4">
      <DupeModal dupeModalShow={dupeModalShow} setDupeShow={setDupeShow} />
      <DeleteModal
        deleteModalShow={deleteModalShow}
        setDeleteShow={setDeleteShow}
        handleDelete={handleDelete}
        file={currentFile}
      />
      <Segment placeholder className="h-100">
        <div className="h-100 d-flex flex-column">
          <div className="row px-3 pt-3">
            <div className="col-6 d-flex align-items-center">
              <Header className="text-dark">My Files</Header>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <div className="ml-auto">
                <input
                  type="file"
                  id="upload"
                  className="d-none"
                  onChange={handleUpload}
                />
                <Button
                  className="widebtn"
                  variant="info"
                  onClick={() => {
                    document.getElementById("upload").click();
                  }}
                >
                  {loading ? "Uploading..." : "Upload"}
                </Button>
                <div className="pt-2">
                  <input
                    type="file"
                    id="decinp"
                    className="d-none"
                    onChange={handleDecrypt}
                  />
                  <Button
                    className="widebtn"
                    variant="info"
                    onClick={() => document.getElementById("decinp").click()}
                  >
                    Decrypt
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="grow">
            <DisplayFiles />
          </div>
        </div>
      </Segment>
    </div>
  );
};

export default Files;
