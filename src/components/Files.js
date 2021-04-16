import { Header, Icon, Segment, Input, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { app } from "../firebase";
import { addUserFile, getUserFiles } from "../api/Calls";

const Files = ({ email }) => {
  const [files, setFiles] = useState([]);
  const [flag, setFlag] = useState(false);

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
      setFiles(fileArr);
    }
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        fileRef.getDownloadURL().then((url) => {
          let newFile = { owner: email, name: file.name, url: url };
          addUserFile(newFile);
          console.log("added file to storage and firestore");
          setFlag(!flag);
        });
      });
    }
  };

  const FileButton = ({ file }) => {
    let name = file.filename;
    let url = file.download;
    return (
      <div className="py-1 d-flex align-items-center">
        <div className="overflow-hidden">{name}</div>
        <div className="ml-auto">
          <Button onClick={() => window.open(url)}>
            <Button.Content>
              <Icon name="arrow alternate circle down outline" />
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
      <Segment placeholder className="h-100">
        <div className="h-100 d-flex flex-column">
          <div className="row px-4">
            <div className="pt-3 col-xs-12 col-sm-3 d-flex align-items-center">
              <Header>My Files</Header>
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
