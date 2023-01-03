//"homepage" displays all items before filtering
import { useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Flowers.css";

export const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();
  const localUser = localStorage.getItem("flower_user");
  const userobj = JSON.parse(localUser);
  useEffect(() => {
    fetch(`http://localhost:8088/plants?userId=${userobj.id}`)
      .then((response) => response.json())
      .then((plantsArray) => {
        setPlants(plantsArray);
      });
  }, []);
  const navigateToPlantDetails = (plantId) => {
    navigate(`/${plantId}`);
  };

  return (
    
    <div >
        <img className="login-background-picture" src="https://res.cloudinary.com/dsbznhfvn/image/upload/v1671134863/bg2_qlztgp.webp"/>
    
    
    <div className="card-container">
      {plants.map((plantObj) => {
        return (
          <div className="flip-card" key={plantObj.id}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src={plantObj.imageUrl}
                    alt={plantObj.name}
                    className="plant-img"
                  />
                </div>
                <div className="flip-card-back">
                  <div className="plant-name">Name: {plantObj.name}</div>
                  <div className="plant-name">
                    Water: {plantObj.feedingSchedule}
                  </div>
                  <div className="plant-name">Sun: {plantObj.sunSchedule}</div>
                  <div className="plant-name">Notes: {plantObj.notes}</div>
                  <div>
                    {" "}
                    {userobj ? (
                      <div>
                        <button
                          className="plant-edit"
                          onClick={() => navigate(`/edit/${plantObj.id}`)}
                        >
                          Edit
                        </button>

                        <button
                          className="plant-delete"
                          onClick={(evt) => {
                            evt.preventDefault();
                            fetch(
                              `http://localhost:8088/plants/${plantObj.id}`,
                              {
                                method: "DELETE",
                              }
                            )
                              .then((response) => response.json())
                              .then(() =>
                                fetch(
                                  `http://localhost:8088/plants?userId=${userobj.id}`
                                )
                              )
                              .then((response) => response.json())
                              .then((response) => setPlants(response));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div></div>
  );
};
