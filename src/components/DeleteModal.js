import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({
  deleteModalShow,
  setDeleteShow,
  handleDelete,
  file,
}) => {
  return (
    <Modal
      show={deleteModalShow}
      onHide={() => setDeleteShow(false)}
      size="sm"
      centered
    >
      <Modal.Header>
        <div className="col text-center">
          <Modal.Title>Are you sure you want to delete this file?</Modal.Title>
          <div className="pt-2">This action cannot be undone</div>
          <div className="pt-4 row">
            <div className="col d-flex justify-content-end">
              <Button
                variant="outline-info"
                onClick={() => setDeleteShow(false)}
              >
                Cancel
              </Button>
            </div>
            <div className="col d-flex justify-content-start">
              <Button variant="danger" onClick={() => handleDelete(file)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal.Header>
    </Modal>
  );
};

export default DeleteModal;
