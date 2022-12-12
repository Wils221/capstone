import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export const FlowerEdit = () => {
    const {flowerId} = useParams()
   // const [flower, setFlower]= useState({})
 /* TODO: Add the correct default properties to the
    initial state object
    */
    const [flower, update] = useState({
      name: "",
      feedingSchedule: "",
      sunSchedule: "",
      notes: "",
      imageUrl: "",
      makePrivate: false,
    });

useEffect(()=>{
    fetch(`http://localhost:8088/plants?id=${flowerId}`)
    .then(res => res.json())
    .then((data)=>{update(data[0])})
},[flowerId] )
  
  /*  TODO: Use the useNavigation() hook so you can redirect
    the user to the ticket list
    */
  const navigate = useNavigate();
  const localFlowerUser = localStorage.getItem("flower_user");
  const flowerUserObject = JSON.parse(localFlowerUser);

  //below is function that will run when submit ticket button is clicked
  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    /* TODO: Perform the fetch() to PUT the object to the API */
    return fetch(`http://localhost:8088/plants/${flowerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flower),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/home");
      });
  };

  return (
    <form className="FlowerForm">
      <h2 className="FlowerForm__title">New Flower</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            defaultValue={flower.name}
            onChange={(event) => {
              const copy = { ...flower };
              copy.name = event.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="feedingSchedule">Feeding Schedule:</label>
          <input
            required
            type="text"
            className="form-control"
            defaultValue={flower.feedingSchedule}
            onChange={(event) => {
              const copy = { ...flower };
              copy.feedingSchedule = event.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="sunSchedule">Sun Schedule:</label>
          <input
            required
            type="text"
            className="form-control"
            defaultValue={flower.sunSchedule}
            onChange={(event) => {
              const copy = { ...flower };
              copy.sunSchedule = event.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <input
            required
            type="text"
            className="form-control"
            defaultValue={flower.notes}
            onChange={(event) => {
              const copy = { ...flower };
              copy.notes = event.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imgUrl">Image URL: </label>
          <input
            required
            id="imgUrl"
            type="text"
            className="form-control"
            defaultValue={flower.imageUrl}
            onChange={(event) => {
              const copy = { ...flower }
              copy.imageUrl = event.target.value
              update(copy)
            }}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Mark Private:</label>
          <input
            type="checkbox"
            defaultValue={flower.makePrivate}
            onChange={(event) => {
              const copy = { ...flower };
              copy.makePrivate = event.target.checked;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Edit Flower
      </button>
    </form>
  );
};
