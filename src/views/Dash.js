import Files from "../components/Files";
import Group from "../components/Group";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Tab, Row, Col, Nav, Modal, Button } from "react-bootstrap";
import { Image, Icon } from "semantic-ui-react";
import { addUser } from "../api/Calls";

const Dash = () => {
  const user = useContext(UserContext);
  const updateKeys = async (email) => addUser(email);
  var pic = "";
  var name = "";
  var add = "";
  if (user) {
    let { photoURL, displayName, email } = user;
    pic = photoURL;
    name = displayName;
    add = email;
    console.log(add);
    updateKeys(email);
  }
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const ConfirmModal = () => {
    return (
      <Modal show={modalShow} onHide={handleModalClose} size="sm" centered>
        <Modal.Header>
          <div className="col text-center">
            <Modal.Title>Sign Out?</Modal.Title>
            <div className="pt-4 row">
              <div className="col d-flex justify-content-end">
                <Button variant="outline-info" onClick={handleModalClose}>
                  Cancel
                </Button>
              </div>
              <div className="col d-flex justify-content-start">
                <Button variant="info" onClick={() => auth.signOut()}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </Modal.Header>
      </Modal>
    );
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="files">
      <ConfirmModal />
      <Col className="h-100">
        <Row className="h-100">
          <Col md={2} className="bg-info text-light d-flex flex-column">
            <div className="flex-none">
              <div className="pt-4 pb-2 text-center">
                <h2 className="">
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
                    <Nav.Link onClick={handleModalShow} className="pill">
                      <div className="text-center">Sign Out</div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </Col>
          <Col md={10} className="bg-light">
            <Tab.Content>
              <Tab.Pane eventKey="group">
                <Group />
              </Tab.Pane>
              <Tab.Pane eventKey="files">
                <Files email={add} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Col>
    </Tab.Container>
  );
};

export default Dash;
