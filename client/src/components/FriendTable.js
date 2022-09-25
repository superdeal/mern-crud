import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import DeleteConfirm from "./DeleteConfirm";
import UpdateModal from "./UpdateModal";

const FriendTable = (props) => {

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);

    const [selectedDeletedItem, setSelectedDeletedItem] = useState({});
    const [selectedUpdateItem, setSelectedUpdateItem] = useState({});

    useEffect(() => {
      Axios.get("http://localhost:4000/read")
        .then((response) => {
          if(!response.data)
            alert("The list is empty!");
          else
            props.setFriendList(response.data);
        })
        .catch(e => {
          console.log(e);
          alert(e);
        })
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteFriend = () => {
        setDeleteModalShow(false);
        Axios.delete(`http://localhost:4000/delete/${selectedDeletedItem._id}`)
        .then((response) => {
          if(!response.data)
            alert("Delete Error!");
          else
          {
            props.setFriendList(props.friendList.filter(item => item._id !== selectedDeletedItem._id));
            setSelectedDeletedItem({});
          }
        })
        .catch(e=>{
          console.log(e);
          alert(e);
        });
    };
    
    const updateOneFriend = () => {
        setUpdateModalShow(false);
        Axios.put(`http://localhost:4000/update/`, {id: selectedUpdateItem._id, name: selectedUpdateItem.name, age: selectedUpdateItem.age })
        .then((response) => {
          if(!response.data)
            alert("Update Error!");
          else
            {
              props.setFriendList(props.friendList.map(item => (item._id === response.data._id)?({...item, name: selectedUpdateItem.name, age: selectedUpdateItem.age}):item));
            }
        })
        .catch(e => {
          console.log(e);
          alert(e);
        })
    };

    const friends = props.friendList.map((val) => {
        return (<tr key={val._id}>
            <th className="col-5">{val.name}</th>
            <th className="col-5">{val.age}</th>
            <th className="col-2">
              <div className="btn-group">
                <Button variant="warning" className="w-50" onClick={(e) => {e.preventDefault(); setUpdateModalShow(true); setSelectedUpdateItem(val);}}>Update</Button>
                <Button variant="danger" className="w-50" onClick={(e) => {e.preventDefault(); setDeleteModalShow(true); setSelectedDeletedItem(val);}}>Delete</Button>
              </div>
            </th>
        </tr>)
    });

    return (
      <>
        <Table striped bordered hover variant="dark" className="mt-3 ">
        <thead>
          <tr>
            <th className="col-5">Name</th>
            <th className="col-5">Age</th>
            <th className="col-2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {friends}
        </tbody>
      </Table>

      <UpdateModal show={updateModalShow} onHide={() => {setUpdateModalShow(false); }} onUpdateClick={updateOneFriend} selectedUpdateItem={selectedUpdateItem} setSelectedUpdateItem={setSelectedUpdateItem}></UpdateModal>
      <DeleteConfirm show={deleteModalShow} onHide={() => {setDeleteModalShow(false); setSelectedDeletedItem({});}} onDelete={deleteFriend} selectedDeletedItem={selectedDeletedItem} ></DeleteConfirm>
      </>
    );
};

export default FriendTable