import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FlowerForm = () => {
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
  /*  TODO: Use the useNavigation() hook so you can redirect
    the user to the ticket list
    */
  const navigate = useNavigate();
  const localFlowerUser = localStorage.getItem("flower_user");
  const flowerUserObject = JSON.parse(localFlowerUser);

  //below is function that will run when submit ticket button is clicked
  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    /* TODO: Create the object to be saved to the API when submit ticket button is pushed */
    const flowerToSendToAPI = {
      userId: flowerUserObject.id,
      name: flower.name,
      feedingSchedule: flower.feedingSchedule,
      sunSchedule: flower.sunSchedule,
      notes: flower.notes,
      imageUrl: flower.imageUrl,
      makePrivate: flower.makePrivate,
    };

    /* TODO: Perform the fetch() to POST the object to the API */
    return fetch(`http://localhost:8088/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flowerToSendToAPI),
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
            placeholder="Full Name"
            value={flower.name}
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
            placeholder="Weekly, Biweekly, Monthly..."
            value={flower.feedingSchedule}
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
            placeholder="Shade, Part Sun, Full Sun..."
            value={flower.sunSchedule}
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
            placeholder="Notes About Your Plant..."
            value={flower.notes}
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
            placeholder="example.com"
            value={flower.imageUrl}
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
            value={flower.makePrivate}
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
        Add Flower
      </button>
    </form>
  );
};
