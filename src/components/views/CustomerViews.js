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
            <h6 className="garden-header">My Garden</h6>

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