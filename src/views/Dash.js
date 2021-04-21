import Files from "../components/Files";
import Group from "../components/Group";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { Row, Col, Button } from "react-bootstrap";
import { Image, Icon } from "semantic-ui-react";
import { getUser } from "../api/Calls";
import LogoutModal from "../components/LogoutModal";

const Dash = () => {
  const user = useContext(UserContext);
  const [keys, setKeys] = useState({});
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");
  const [logoutModalShow, setLogoutShow] = useState(false);
  const [view, setView] = useState("files");
  const toggleView = (e) => {
    setView(e.target.id);
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [user]);

  const updateData = async () => {
    // console.log("Dash.js: updateData");
    if (user) {
      let { photoURL, displayName, email } = user;
      setPic(photoURL);
      setName(displayName);
      setAdd(email);
      let pair = await getUser(email);
      setKeys(pair);
    }
  };

  return (
    <Col className="h-100">
      <LogoutModal
        logoutModalShow={logoutModalShow}
        setLogoutShow={setLogoutShow}
      />
      <Row className="h-100">
        <Col md={2} className="bg-info text-light d-flex flex-column">
          <div className="flex-none">
            <div className="pt-4 pb-2 text-center">
              <h2>
                <Icon name="cloud" className="mr-3" />
                Secure Store
              </h2>
            </div>
          </div>
          <div className="grow py-4 d-flex flex-column justify-content-start align-items-center">
            <div className="col d-flex flex-column align-items-center">
              <div className="pb-4 w-100 d-flex flex-row justify-content-center align-items-center space-around">
                <Image src={pic} avatar />
                <span className="ml-2">{name}</span>
              </div>
              <div className="pb-2 w-100">
                <Button
                  variant="light"
                  id="files"
                  onClick={toggleView}
                  className="w-100 text-info"
                >
                  Files
                </Button>
              </div>
              <div className="pb-2 w-100">
                <Button
                  variant="light"
                  id="groups"
                  onClick={toggleView}
                  className="w-100 text-info"
                >
                  Groups
                </Button>
              </div>
              <div className="pb-2 w-100">
                <Button
                  variant="light"
                  className="w-100 text-info"
                  onClick={() => setLogoutShow(true)}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col md={10} className="bg-light text-dark">
          {view === "files" ? <Files email={add} keys={keys} /> : <Group />}
        </Col>
      </Row>
    </Col>
  );
};

export default Dash;
