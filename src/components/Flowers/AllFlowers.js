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
  //conditionally render a popup of the item edit form here
  //toggle from F (default) to T
  //if T (aka button clicked): show edit form
  const navigateToPlantDetails = (plantId) => {
    navigate(`/${plantId}`);
  };
  return (

    <div className="plants-container">
      {plants.map((plantObj) => {
        return (
        <div className="plant-card" key={plantObj.id}>
          <img
            src={plantObj.imageUrl}
            alt={plantObj.name}
            className="plant-img"
            onClick={() => {
              navigateToPlantDetails(plantObj.id);
            }}
          />
          <div className="plant-name">Name: {plantObj.name}</div>
          <div className="plant-name">
            Feeding Schedule: {plantObj.feedingSchedule}
          </div>
          <div className="plant-name">Sun Schedule: {plantObj.sunSchedule}</div>
          <div className="plant-name">Notes: {plantObj.notes}</div>
         
          <>   
      {
    
          userobj
            ? <div>
                <Link className="plant-edit" to={`/edit/${plantObj.id}`}>
                Edit
              </Link> <br/>
            
              <button className="plant-delete"
            onClick={(evt) => {
                evt.preventDefault()
                fetch (`http://localhost:8088/plants/${plantObj.id}`, {
                        method: "DELETE"
                    })
                        .then(response => response.json())
                        .then (() => fetch (`http://localhost:8088/plants`))
                        .then(response => response.json())
                        .then(response =>
                            setPlants(response))
                    }}>Delete</button></div>
               
            : "" 
          
            }
              </>
        
        </div>)
      })}
    </div>

  );
};
