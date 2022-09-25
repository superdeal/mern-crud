import React from "react";
import { Button, Modal } from "react-bootstrap";

const UpdateModal = (props) => {

    return(
    <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header>
            <Modal.Title>Update Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div>
                    <label htmlFor="updateName">Name</label>
                    <div><input type="text" id="updateName" value={props.selectedUpdateItem.name} onChange={(e) => props.setSelectedUpdateItem({...props.selectedUpdateItem, name: e.target.value})}/></div>
                </div>
                <div>
                    <label htmlFor="updateAge">Age</label>
                    <div><input type="text" id="updateAge" value={props.selectedUpdateItem.age} onChange={(e) => props.setSelectedUpdateItem({...props.selectedUpdateItem, age: e.target.value})}/></div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="info" onClick={props.onHide}>Cancel</Button>
            <Button variant="danger" onClick={props.onUpdateClick}>Update</Button>
        </Modal.Footer>
    </Modal>
    );
};

export default UpdateModal;