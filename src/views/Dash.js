import Files from "../components/Files";
import Group from "../components/Group";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Image, Icon } from "semantic-ui-react";
import { addUser } from "../api/Calls";
import LogoutModal from "../components/LogoutModal";

const Dash = () => {
  const user = useContext(UserContext);
  const [keys, setKeys] = useState({});
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");
  const [logoutModalShow, setLogoutShow] = useState(false);

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [user]);

  const updateData = async () => {
    console.log("Dash.js: updateData");
    if (user) {
      let { photoURL, displayName, email } = user;
      setPic(photoURL);
      setName(displayName);
      setAdd(email);
      let pair = await addUser(email);
      setKeys(pair);
    }
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="files">
      <LogoutModal
        logoutModalShow={logoutModalShow}
        setLogoutShow={setLogoutShow}
      />
      <Col className="h-100">
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
              <div className="col">
                <div className="pb-4 w-100 d-flex flex-row justify-content-center align-items-center space-around">
                  <Image src={pic} avatar />
                  <span className="ml-2">{name}</span>
                </div>
                <Nav
                  variant="pills"
                  defaultActiveKey="files"
                  className="flex-column"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="files" className="pill">
                      <div className="text-center">Files</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="group" className="pill">
                      <div className="text-center">Groups</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => setLogoutShow(true)}
                      className="pill"
                    >
                      <div className="text-center">Sign Out</div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </Col>
          <Col md={10} className="bg-light text-dark">
            <Tab.Content>
              <Tab.Pane eventKey="group">
                <Group />
              </Tab.Pane>
              <Tab.Pane eventKey="files">
                <Files email={add} keys={keys} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Col>
    </Tab.Container>
  );
};

export default Dash;
