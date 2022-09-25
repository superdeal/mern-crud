import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const DeleteConfirm = (props) => {

    return(
    <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header>
            <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you are going to delete item <b>{props.selectedDeletedItem.name}</b>?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="info" onClick={props.onHide}>Cancel</Button>
            <Button variant="danger" onClick={props.onDelete}>Delete</Button>
        </Modal.Footer>
    </Modal>
    );
};

export default DeleteConfirm