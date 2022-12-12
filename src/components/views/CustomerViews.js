import { Outlet, Route, Routes } from "react-router-dom";
import { AllPlants } from "../Flowers/AllFlowers";
import { FlowerForm } from "../Flowers/AddFlowerForm";
import { FlowerEdit } from "../Flowers/FlowerEdit";
import { AllUsers } from "../Users/Users";
import { FlowerProfile } from "../Flowers/FlowerProfile";

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
      <Route path="/edit/:flowerId" element={<FlowerEdit />}></Route>
      <Route path="/users" element={<AllUsers />}></Route>
      <Route path="/flowers/:userId" element={<FlowerProfile />}></Route>
    </Routes>
  );
};