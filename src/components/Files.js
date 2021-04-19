import { Header, Icon, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { addUserFile, getUserFiles, deleteFile } from "../api/Calls";
import DeleteModal from "../components/DeleteModal";
import { Modal, Button } from "react-bootstrap";
import { decryptFile } from "../api/Crypto";
import ReactFileReader from "react-file-reader";

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
      if (f.filename === passed.name) flag = true;
    });
    return flag;
  };

  const DupeModal = () => {
    return (
      <Modal show={dupeModalShow} onHide={() => setDupeShow(false)}>
        <Modal.Header>
          <Modal.Title>Duplicate file detected!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="info" onClick={() => setDupeShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const uploadFile = async (file) => {
    if (file) {
      file = file.fileList[0];
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
  };

  const downloadFile = async (file) => {
    let decrypted = await decryptFile(file.download, keys.private);
    window.open(decrypted.message);
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
      <DupeModal />
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
                <ReactFileReader
                  handleFiles={uploadFile}
                  multipleFiles={false}
                  fileTypes={"."}
                  base64={true}
                >
                  <Button
                    className="widebtn"
                    variant="info"
                    onClick={() => setLoading(true)}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </Button>
                </ReactFileReader>
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
