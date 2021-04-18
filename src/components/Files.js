import { Header, Icon, Segment, Input, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { app } from "../firebase";
import { addUserFile, getUserFiles, deleteFile } from "../api/Calls";
import DeleteModal from "../components/DeleteModal";
import { Modal } from "react-bootstrap";
import { encryptFile } from "../api/Crypto";

const Files = ({ email, theme }) => {
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
  }, [flag]);

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
        // 50mb
        file = await encryptFile(file);
        console.log(file);
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        fileRef.put(file).then(() => {
          fileRef.getDownloadURL().then((url) => {
            let newFile = {
              owner: email,
              name: file.name,
              url: url,
            };
            addUserFile(newFile);
            setFlag(!flag);
          });
        });
      }
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
        <div className="overflow-hidden mr-2">{filename}</div>
        <div className="ml-auto">
          <Button onClick={() => window.open(url)}>
            <Button.Content>
              <Icon name="arrow alternate circle down outline" />
            </Button.Content>
          </Button>
        </div>
        <div className="pl-2">
          <Button color="red" onClick={() => handleDeleteShow(file)}>
            <Button.Content>
              <Icon name="delete" />
            </Button.Content>
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
      <Segment placeholder className={"h-100 " + theme.both}>
        <div className="h-100 d-flex flex-column">
          <div className="row px-3">
            <div className="pt-3 col-xs-12 col-sm-3 d-flex align-items-center">
              <Header className={theme.text}>My Files</Header>
            </div>
            <div className="pt-3 col-xs-12 col-sm-9 d-flex justify-content-center">
              <div className="ml-auto">
                <Input type="file" onChange={(e) => uploadFile(e)} />
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
