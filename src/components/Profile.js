import { Header, Icon, Segment, Input } from "semantic-ui-react";
import { useState } from "react";
import Group from "./Group";
// import person from "../assets/person.svg";

const Profile = () => {
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState("");

  const FileButton = ({ file }) => {
    console.log(file);
    return (
      <div>
        test
        <div>{file.name}</div>
      </div>
    );
  };

  const DisplayFiles = () => {
    if (files.length > 0) {
      return (
        <div className="col h-100 bg-warning">
          {files.map((f) => (
            <FileButton file={f} key={f.name} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <Header icon>
            <Icon name="file outline" />
            No Files
          </Header>
          Add some with the button above
        </div>
      );
    }
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setUpload(file);
    //todo
    let arr = files;
    arr.push(upload);
    setFiles(arr);
    if (upload) console.log("uploaded");
  };

  return (
    <div className="col vh py-4">
      <div className="row py-4">
        <div className="col">
          <Group />
        </div>
      </div>
      <div className="row py-4">
        <div className="col">
          <Segment placeholder>
            <div className="col">
              <div className="row">
                <div className="mr-auto">
                  <Header icon>My Files</Header>
                </div>
                <div className="">
                  <Input type="file" onChange={(e) => uploadFile(e)} />
                </div>
              </div>
              <div className="row mt-4">
                <DisplayFiles />
              </div>
            </div>
          </Segment>
        </div>
      </div>
    </div>
  );
};

export default Profile;
