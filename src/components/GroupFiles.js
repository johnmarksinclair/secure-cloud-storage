import { useState, useEffect } from "react";
import { Header, Icon } from "semantic-ui-react";
import { Button, Alert } from "react-bootstrap";
import DeleteModal from "../components/DeleteModal";
import {
  // addUserFile,
  // getUserFiles,
  deleteFile,
  // downloadFile,
} from "../api/Calls";

const GroupFiles = ({ group, setSelected }) => {
  const maxfilesize = 50;
  const [keys, setKeys] = useState({});
  const [files, setFiles] = useState([]);
  const [flag, setFlag] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tooLarge, setTooLarge] = useState(false);
  const [deleteModalShow, setDeleteShow] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const handleDeleteShow = (file) => {
    setCurrentFile(file);
    setDeleteShow(true);
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [flag]);

  const updateData = async () => {
    // let userfiles = await getUserFiles(email);
    let fileArr = [];
    // if (userfiles) {
    //   userfiles.forEach((f) => {
    //     fileArr.push(f);
    //   });
    // }
    setFiles(fileArr);
    setKeys(keys);
  };

  const isDuplicate = (passed) => {
    let flag = false;
    files.forEach((f) => {
      //   if (f.filename === email + "&^%" + passed) flag = f;
    });
    return flag;
  };

  const handleUpload = (e) => {
    setUploading(true);
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      if (file.size < maxfilesize * 1024 * 1024) {
        let dupe = isDuplicate(file.name);
        console.log(dupe);
        // addUserFile(file, email, keys.public, dupe).then(() => {
        //   setFlag(!flag);
        //   setUploading(false);
        // });
      } else {
        setUploading(false);
        setTooLarge(true);
        setTimeout(() => setTooLarge(false), 3000);
      }
    }
    e.target.value = null;
  };

  const handleDownload = async (file) => {
    setDownloading(true);
    // downloadFile(file, keys.private).then(() => setDownloading(false));
  };

  const handleDelete = async (file) => {
    handleUpload();
    setDeleteShow(false);
    deleteFile(file).then(() => setFlag(!flag));
  };

  const FileButton = ({ file }) => {
    let displayname = file.filename.split("&^%")[1];
    return (
      <div className="py-1 d-flex align-items-center">
        <div className="overflow-hidden mr-3 text-truncate">{displayname}</div>
        <div className="ml-auto">
          <Button variant="outline-info" onClick={() => handleDownload(file)}>
            Download
          </Button>
        </div>
        <div className="pl-2">
          <Button variant="danger" onClick={() => handleDeleteShow(file)}>
            Delete
          </Button>
        </div>
      </div>
    );
  };

  const DisplayFiles = () => {
    return (
      <div className="h-100 col">
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
      <DeleteModal
        deleteModalShow={deleteModalShow}
        setDeleteShow={setDeleteShow}
        handleDelete={handleDelete}
        file={currentFile}
      />
      <Alert show={downloading} variant="info">
        Decrypting File & Downloading...
      </Alert>
      <Alert show={uploading} variant="info">
        Encrypting File & Uploading...
      </Alert>
      <Alert show={tooLarge} variant="danger">
        File too large! We currently only support files less than {maxfilesize}{" "}
        MB
      </Alert>
      <div className="h-100 d-flex flex-column">
        <div className="row px-3 pt-2">
          <div className="col d-flex ">
            <Button variant="outline-info" onClick={() => setSelected("")}>
              <Icon className="arrow left" />
            </Button>
            <div className="ml-4 d-flex align-items-center">
              <Header>Group Files - {group.name}</Header>
            </div>
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
                onClick={() => document.getElementById("upload").click()}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
        <div className="grow scroll mt-4">
          <DisplayFiles />
        </div>
      </div>
    </div>
  );
};

export default GroupFiles;
