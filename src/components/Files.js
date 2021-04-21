import { useState, useEffect } from "react";
import { Header, Icon } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import DeleteModal from "../components/DeleteModal";
import DupeModal from "../components/DupeModal";
import { decryptFile } from "../api/Crypto";
import {
  addUserFile,
  getUserFiles,
  deleteFile,
  dataUrlToFile,
} from "../api/Calls";

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

  const handleUpload = (e) => {
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
  };

  const downloadFile = async (file) => {
    var reader = new FileReader();
    let data = await fetch(file.url);
    let blob = await data.blob();
    reader.readAsText(blob);
    reader.onload = async () => {
      let decdata = await decryptFile(reader.result, keys.private);
      let decfile = await dataUrlToFile(decdata.message);
      let fileurl = URL.createObjectURL(decfile);
      // window.open(fileurl);
      let a = document.createElement("a");
      a.href = fileurl;
      a.download = file.filename;
      a.click();
    };
  };

  const handleDelete = async (file) => {
    setDeleteShow(false);
    deleteFile(file).then(() => setFlag(!flag));
  };

  const FileButton = ({ file }) => {
    return (
      <div className="py-1 d-flex align-items-center">
        <div className="overflow-hidden mr-3 text-truncate">
          {file.filename}
        </div>
        <div className="ml-auto">
          <Button variant="outline-info" onClick={() => downloadFile(file)}>
            {/* <div>
              <Icon name="arrow alternate circle down outline" />
            </div> */}
            Download
          </Button>
        </div>
        <div className="pl-2">
          <Button variant="danger" onClick={() => handleDeleteShow(file)}>
            {/* <div>
              <Icon name="delete" />
            </div> */}
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
      <DupeModal dupeModalShow={dupeModalShow} setDupeShow={setDupeShow} />
      <DeleteModal
        deleteModalShow={deleteModalShow}
        setDeleteShow={setDeleteShow}
        handleDelete={handleDelete}
        file={currentFile}
      />
      <div className="h-100 d-flex flex-column">
        <div className="row pl-3 pr-4 py-2">
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
            </div>
          </div>
        </div>
        <div className="grow scroll">
          <DisplayFiles />
        </div>
      </div>
    </div>
  );
};

export default Files;
