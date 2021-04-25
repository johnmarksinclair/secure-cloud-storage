import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { Input } from "semantic-ui-react";

const NewPasswordModal = ({
  newPasswordShow,
  setNewPasswordShow,
  setPassword,
  setFlag,
}) => {
  const message =
    "Don't forget this as we do not store it! If you forget this password your files will remain encrypted";
  const [text, setText] = useState(message);
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
      setText("Passwords did not match!");
      setTimeout(() => setText(message), 3000);
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
            <Alert show="true" variant="danger">
              {text}
            </Alert>
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
          <div className="py-3">
            <Button variant="info" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Modal.Header>
    </Modal>
  );
};

export default NewPasswordModal;
