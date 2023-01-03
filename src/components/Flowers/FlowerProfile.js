//"homepage" displays all items before filtering
import { useEffect, useId, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Flowers.css";
export const FlowerProfile = () => {
  const { userId } = useParams();
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const navigate = useNavigate();
  const localUser = localStorage.getItem("flower_user");
  const userobj = JSON.parse(localUser);
  useEffect(() => {
    fetch(`http://localhost:8088/plants?userId=${userId}`)
      .then((response) => response.json())
      .then((plantsArray) => {
        const publicPlants = plantsArray.filter(
          (plant) => plant.makePrivate === false
        );
        setPlants(publicPlants);
        //setPlants(plantsArray);
      });
  }, []);
  //conditionally render a popup of the item edit form here
  //toggle from F (default) to T
  //if T (aka button clicked): show edit form
  const navigateToFlowerProfile = (plantId) => {
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
            <div className="plant-name">
              Sun: {plantObj.sunSchedule}
            </div>
            <div className="plant-name">Notes: {plantObj.notes}</div>
          </div>
          </div></div>
        </div>);
      })}
    </div></div>
  );
};
