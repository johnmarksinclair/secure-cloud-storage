import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { Input } from "semantic-ui-react";

const NewPasswordModal = ({
  newPasswordShow,
  setNewPasswordShow,
  setPassword,
  setFlag,
}) => {
  const [alert, setAlert] = useState(false);
  const [input, setInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const handleInput = (e) => {
    if (e.target.id === "first") setInput(e.target.value);
    else setSecondInput(e.target.value);
  };
  const handleSubmit = () => {
    if (input.length > 0 && input === secondInput) {
      setNewPasswordShow(false);
      setPassword(input);
      setFlag(true);
    } else {
      setInput("");
      setSecondInput("");
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    }
  };

  return (
    <Modal show={newPasswordShow} size="sm" centered>
      <Modal.Header>
        <div className="col text-center">
          <Modal.Title>
            Enter a password that will be used to encrypt your private key
          </Modal.Title>
          <div className="pt-3">
            <Input
              type="password"
              id="first"
              icon="lock"
              placeholder="Password"
              value={input}
              onChange={handleInput}
            />
          </div>
          <div className="pt-3">
            <Input
              type="password"
              id="second"
              icon="lock"
              placeholder="Password"
              value={secondInput}
              onChange={handleInput}
            />
          </div>
          <div className="pt-3 pb-2">
            <Button variant="info" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          <Alert show={alert} variant="danger">
            Passwords did not match!
          </Alert>
        </div>
      </Modal.Header>
    </Modal>
  );
};

export default NewPasswordModal;
