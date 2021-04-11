import Profile from "../components/Profile";
import Files from "../components/Files";
import { Tab, Row, Col, Nav } from "react-bootstrap";

const Dash = () => {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
      <Col className="h-100">
        <Row className="h-100">
          <Col sm={2} className="">
            <Nav variant="pills" className="flex-column">
              <div className="py-3 text-center">
                <h2>Secure Store</h2>
              </div>
              <Nav.Item>
                <Nav.Link eventKey="profile">
                  <div className="text-center">Profile</div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="files">
                  <div className="text-center">Files</div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10} className="bg-light">
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Profile />
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
