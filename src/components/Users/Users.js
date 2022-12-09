// Display all Users here staff gets delete button.
import { useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const localUser = localStorage.getItem("flower_user");
  const Username = JSON.parse(localUser);
  useEffect(() => {
    fetch(`http://localhost:8088/users`)
      .then((response) => response.json())
      .then((UsersArray) => {
        setUsers(UsersArray);
      });
  }, []);
  const deleteButton = (userId) => {
    if(Username.staff) {
        return <button
         onClick={() => {
        fetch(`http://localhost:8088/users/${userId}`, {
        method: "DELETE",
    })
        .then(() => {
            getAllUsers()
        }) 
    }} className="user_delete"
    >Delete</button>
    }
    else {
        return ""
    }
}
const getAllUsers = () => {
   return fetch(`http://localhost:8088/users`)
      .then((response) => response.json())
      .then((UsersArray) => {
        setUsers(UsersArray)})
}

  //conditionally render a popup of the item edit form here
  //toggle from F (default) to T
  //if T (aka button clicked): show edit form
  
 return (
<>
 {users.map((userObj) => {return <div id={userObj.id}>{userObj.fullName} {deleteButton(userObj.id)}</div> }
 
 )
  }
</>
 )}