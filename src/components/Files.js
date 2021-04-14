import { Header, Icon, Segment, Input, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
const FileReader = require("filereader");

const Files = () => {
  const [files, setFiles] = useState([]);
  // const [fileURLs, setFileURLs] = useState([]);
  const [selected, setSelected] = useState(null);
  var fr = new FileReader();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [files]);

  const updateData = async () => {
    console.log(files);
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      let arr = [];
      files.forEach((f) => {
        arr.push(f);
      });
      arr.push(file);
      // console.log(arr);
      setFiles(arr);
      setSelected(file);
      console.log(selected);
      fr.readAsDataURL(file);
    }
  };

  fr.onload = (e) => {
    let file = e.target.result;
    console.log("FR");
    console.log(fr.readAsDataURL(file));
  };

  const FileButton = ({ file }) => {
    // console.log(file);
    let name = file.name;
    let type = file.type;
    return (
      <div className="py-1 d-flex align-items-center">
        <div>
          {name} - {type}
        </div>
        <div className="ml-auto">
          <Button
            onClick={() => {
              // download(file);
              console.log(`downloading ${name}`);
            }}
          >
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
      <div className="h-100 pt-3">
        {files.length > 0 ? (
          <div className="col h-100">
            {files.map((f) => (
              <FileButton file={f} key={f.name} />
            ))}
          </div>
        ) : (
          <div className="h-100 col d-flex flex-column justify-content-center align-items-center">
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
