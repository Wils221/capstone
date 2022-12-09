import { Outlet, Route, Routes } from "react-router-dom";
import { AllPlants } from "../Flowers/AllFlowers";
import { FlowerForm } from "../Flowers/AddFlowerForm";
import { AllUsers } from "../Users/Users";


export const CustomerViews = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <>
            <h1>Flower Power</h1>
            <div>My Garden</div>

            <Outlet />
          </>
        }
      >
      <Route index element={<AllPlants />} />
      </Route>
      <Route path="/FlowerForm" element={<FlowerForm />}></Route>
      <Route path="/users" element={<AllUsers />}></Route>
    </Routes>
  );
};
