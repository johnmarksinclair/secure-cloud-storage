import Files from "../components/Files";
import Group from "../components/Group";
import { useState } from "react";
import { Tab, Row, Col, Nav, Modal, Button } from "react-bootstrap";
import { Image, Icon } from "semantic-ui-react";

const Dash = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const ConfirmModal = () => {
    return (
      <Modal show={modalShow} onHide={handleModalClose} size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary">Sign Out</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="files">
      <ConfirmModal />
      <Col className="h-100">
        <Row className="h-100">
          <Col sm={2} className="d-flex flex-column">
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
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                    avatar
                  />
                  <span className="ml-2">Username</span>
                </div>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="files">
                      <div className="text-center">Files</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="group">
                      <div className="text-center">Groups</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handleModalShow}>
                      <div className="text-center">Sign Out</div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </Col>
          <Col sm={10} className="bg-light">
            <Tab.Content>
              <Tab.Pane eventKey="group">
                <Group />
              </Tab.Pane>
              <Tab.Pane eventKey="files">
                <Files />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Col>
    </Tab.Container>
  );
};

export default Dash;
