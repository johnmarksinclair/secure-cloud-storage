import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { Input } from "semantic-ui-react";

const PasswordModal = ({
  passwordModalShow,
  setPasswordShow,
  setPassword,
  incorrect,
}) => {
  const [input, setInput] = useState("");
  const handleInput = (e) => setInput(e.target.value);
  const handleSubmit = () => {
    if (input.length > 0) {
      setInput("");
      setPasswordShow(false);
      setPassword(input);
    }
  };
  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <Modal show={passwordModalShow} size="sm" centered>
      <Modal.Header>
        <div className="col text-center">
          <Alert show={incorrect} variant="danger">
            Incorrect password!
          </Alert>
          <Modal.Title>
            Enter your password to decrypt your private key
          </Modal.Title>
          <div className="pt-3">
            <Input
              type="password"
              icon="lock"
              placeholder="Password"
              value={input}
              onChange={handleInput}
              onKeyUp={handleKey}
            />
          </div>
          <div className="pt-3 pb-2">
            <Button variant="info" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Modal.Header>
    </Modal>
  );
};

export default PasswordModal;
