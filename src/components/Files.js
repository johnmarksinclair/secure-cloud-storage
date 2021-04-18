import { Header, Icon, Segment, Input } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { addUserFile, getUserFiles, deleteFile } from "../api/Calls";
import DeleteModal from "../components/DeleteModal";
import { Modal, Button } from "react-bootstrap";
import { encryptFile } from "../api/Crypto";

const Files = ({ email, keys }) => {
  const [files, setFiles] = useState([]);
  const [flag, setFlag] = useState(false);
  const [deleteModalShow, setDeleteShow] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const handleDeleteShow = (file) => {
    setCurrentFile(file);
    setDeleteShow(true);
  };
  const [dupeModalShow, setDupeShow] = useState(false);

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
      if (f.filename === passed.name) flag = true;
    });
    return flag;
  };

  const DupeModal = () => {
    return (
      <Modal show={dupeModalShow} onHide={() => setDupeShow(false)}>
        <Modal.Header>
          <Modal.Title>Duplicate file detected!</Modal.Title>
          <Button onClick={() => setDupeShow(false)}>Close</Button>
        </Modal.Header>
      </Modal>
    );
  };

  const uploadFile = async (e) => {
    let file = e.target.files[0];
    if (file) {
      if (isDuplicate(file)) setDupeShow(true);
      else if (file.size < 50 * 1024 * 1024) {
        file = await encryptFile(file, keys);
        await addUserFile(file, email);
        setFlag(!flag);
      } else console.log("file too large");
    }
    e.target.value = null;
  };

  const handleDelete = async (file) => {
    setDeleteShow(false);
    deleteFile(file);
    setTimeout(function () {
      setFlag(!flag);
    }, 1000);
  };

  const FileButton = ({ file }) => {
    let filename = file.filename;
    let url = file.download;
    return (
      <div className="py-1 d-flex align-items-center">
        <div className="overflow-hidden mr-3 elip">{filename}</div>
        <div className="ml-auto">
          <Button variant="outline-info" onClick={() => window.open(url)}>
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
          files.map((f) => <FileButton file={f} key={f.name} />)
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
      <DupeModal />
      <DeleteModal
        deleteModalShow={deleteModalShow}
        setDeleteShow={setDeleteShow}
        handleDelete={handleDelete}
        file={currentFile}
      />
      <Segment placeholder className="h-100 bg-light text-dark">
        <div className="h-100 d-flex flex-column">
          <div className="row px-3">
            <div className="pt-3 col-xs-12 col-sm-3 d-flex align-items-center">
              <Header className="text-dark">My Files</Header>
            </div>
            <div className="pt-3 col-xs-12 col-sm-9 d-flex justify-content-center">
              <div className="ml-auto">
                <Input
                  style={{ display: "none" }}
                  type="file"
                  id="hiddenFileInput"
                  onChange={(e) => uploadFile(e)}
                />
                <Button
                  className="widebtn"
                  variant="info"
                  onClick={() => {
                    document.getElementById("hiddenFileInput").click();
                  }}
                >
                  Upload
                </Button>
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
