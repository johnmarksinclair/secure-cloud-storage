import { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { Row, Col, Button } from "react-bootstrap";
import { Image, Icon } from "semantic-ui-react";
import { isUser, getUser } from "../api/Calls";
import { decryptPrivateKey } from "../api/Crypto";
import Files from "../components/Files";
import Group from "../components/Group";
import NewPasswordModal from "../components/NewPassword";
import PasswordModal from "../components/PasswordModal";
import LogoutModal from "../components/LogoutModal";

const Dash = () => {
  const user = useContext(UserContext);
  const [keys, setKeys] = useState({});
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");
  const [flag, setFlag] = useState(false);
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [logoutModalShow, setLogoutShow] = useState(false);
  const [passwordModalShow, setPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [view, setView] = useState("1");
  const toggleView = (e) => setView(e.target.id);

  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, [user, password, flag]);

  const updateData = async () => {
    let { photoURL, displayName, email } = user;
    setPic(photoURL);
    setName(displayName);
    setAdd(email);
    let userinfo = await isUser(email);
    if (userinfo) {
      if (password === null) return;
      getPassword().then(async () => {
        let userinfo = await getUser(email, password);
        let decpair = await decryptPrivate(userinfo.keys);
        setKeys(decpair);
      });
    } else {
      if (!flag) setNewPasswordShow(true);
      else {
        console.log(password);
        userinfo = await getUser(email, password);
        let decpair = await decryptPrivate(userinfo.keys);
        setKeys(decpair);
      }
    }
  };

  const getPassword = () => {
    return new Promise((resolve) => {
      if (password === "") setPasswordShow(true);
      else if (password === null) resolve();
      else resolve();
    });
  };

  const decryptPrivate = (encpair) => {
    return new Promise(async (resolve) => {
      // console.log(password);
      // console.log(encpair);
      let decpair = encpair;
      decpair = await decryptPrivateKey(encpair, password);
      if (!decpair) {
        setPassword("");
        setIncorrect(true);
        getPassword();
        return;
      }
      // console.log(decpair);
      setPassword(null);
      resolve(decpair);
    });
  };

  return (
    <Col className="h-100">
      <LogoutModal
        logoutModalShow={logoutModalShow}
        setLogoutShow={setLogoutShow}
      />
      <PasswordModal
        passwordModalShow={passwordModalShow}
        setPasswordShow={setPasswordShow}
        setPassword={setPassword}
        incorrect={incorrect}
      />
      <NewPasswordModal
        newPasswordShow={newPasswordShow}
        setNewPasswordShow={setNewPasswordShow}
        setPassword={setPassword}
        setFlag={setFlag}
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
                  id="1"
                  onClick={toggleView}
                  className="w-100 text-info"
                >
                  Files
                </Button>
              </div>
              <div className="pb-2 w-100">
                <Button
                  variant="light"
                  id="2"
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
          {view === "1" ? <Files email={add} keys={keys} /> : <Group />}
        </Col>
      </Row>
    </Col>
  );
};

export default Dash;
