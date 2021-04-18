import Files from "../components/Files";
import Group from "../components/Group";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { Image, Icon } from "semantic-ui-react";
import { addUser } from "../api/Calls";
import LogoutModal from "../components/LogoutModal";

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
    // console.log(add);
    updateKeys(email);
  }
  const [logoutModalShow, setLogoutShow] = useState(false);
  // const light = {
  //   bg: "bg-light",
  //   text: "text-dark",
  //   both: "bg-light text-dark",
  //   header: "text-light,",
  // };
  // const dark = {
  //   bg: "bg-darker",
  //   text: "text-light",
  //   both: "bg-darker text-light",
  //   header: "text-dark",
  // };
  // const [theme, setTheme] = useState(light);
  // const handleTheme = () => {
  //   if (theme.bg === "bg-light") setTheme(dark);
  //   else setTheme(light);
  // };
  const theme = {
    bg: "bg-light",
    text: "text-dark",
    both: "bg-light text-dark",
    header: "text-light,",
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
                {/* <Button variant="light" onClick={handleTheme}>
                  <Icon name="sun outline" />
                </Button> */}
              </div>
            </div>
          </Col>
          <Col md={10} className={theme.both}>
            <Tab.Content>
              <Tab.Pane eventKey="group">
                <Group />
              </Tab.Pane>
              <Tab.Pane eventKey="files">
                <Files email={add} theme={theme} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Col>
    </Tab.Container>
  );
};

export default Dash;
