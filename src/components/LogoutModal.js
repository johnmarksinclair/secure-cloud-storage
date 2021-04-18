import { Modal, Button } from "react-bootstrap";
import { auth } from "../firebase";

const LogoutModal = ({ logoutModalShow, setLogoutShow }) => {
  return (
    <Modal
      show={logoutModalShow}
      onHide={() => setLogoutShow(false)}
      size="sm"
      centered
    >
      <Modal.Header>
        <div className="col text-center">
          <Modal.Title>Sign Out?</Modal.Title>
          <div className="pt-4 row">
            <div className="col d-flex justify-content-end">
              <Button
                variant="outline-info"
                onClick={() => setLogoutShow(false)}
              >
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

export default LogoutModal;
