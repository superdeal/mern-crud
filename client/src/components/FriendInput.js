import React from "react";
import Axios  from 'axios';

const FriendInput = (props) => {
    const AddFriend = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:4000/addFriend", {name: props.name, age: props.age})
            .then((response) => {
                if(!response.data)
                    alert("No response data!");
                else
                    props.setFriendList( [...props.friendList, response.data]);
            })
            .catch((e) => {
                console.log(e);
                alert(e);
            });
    }

    return(
        <form className="form-inline">
            <div className="row m-3 text-sm-start">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-3">
                <input type="text" className="form-control mb-2 me-sm-2" id="inputName" aria-describedby="nameHelp" placeholder="Name" onChange={(e) => props.setName(e.target.value)}/>
            </div>
            <label htmlFor="inputAge" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-3">
                <input type="text" className="form-control mb-2 me-sm-2" id="inputAge" placeholder="Age" onChange={(e) => props.setAge(e.target.value)}/>
            </div>
            <div className="col-sm-2"><button type="submit" className="btn btn-primary d-block mx-auto mb-2" onClick={ (e) => AddFriend(e) }>Add</button></div>
            </div>
        </form>
    );
};

export default FriendInput;
