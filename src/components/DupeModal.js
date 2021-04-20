import { Modal, Button } from "react-bootstrap";

const DupeModal = ({ dupeModalShow, setDupeShow }) => {
  return (
    <Modal show={dupeModalShow} onHide={() => setDupeShow(false)}>
      <Modal.Header>
        <Modal.Title>Duplicate file detected!</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="info" onClick={() => setDupeShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DupeModal;
