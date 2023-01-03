// Display all Users here staff gets delete button.
import { useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./users.css"
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
    if (Username.staff) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/users/${userId}`, {
              method: "DELETE",
            }).then(() => {
              getAllUsers();
            });
          }}
          className="user_delete"
        >
          Delete
        </button>
      );
    } else {
      return "";
    }
  };
  const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
      .then((response) => response.json())
      .then((UsersArray) => {
        setUsers(UsersArray);
      });
  };

  //conditionally render a popup of the item edit form here
  //toggle from F (default) to T
  //if T (aka button clicked): show edit form

  return (
    <> <div >
    <img className="login-background-picture" src="https://res.cloudinary.com/dsbznhfvn/image/upload/v1671134863/bg2_qlztgp.webp"/>
      {users.map((userObj) => {
        return (
          <div className="users">
          <div className="userDiv" id={userObj.id}>
            {" "}
            <Link to={`/flowers/${userObj.id}`}>{userObj.fullName} </Link>{" "}
            {deleteButton(userObj.id)}
          </div></div>
        );
      })}</div>
    </>
  );
};
