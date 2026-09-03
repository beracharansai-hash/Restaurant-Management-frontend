import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dishes from "../pages/Dishes";
import DishDetails from "../pages/DishDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";
import AddDish from "../pages/AddDish";
import EditDish from "../pages/EditDish";
import Orders from "../pages/Orders";

function AppRoutes() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/dishes" element={<Dishes />} />

      <Route
        path="/dishes/:id"
        element={<DishDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/logout"
        element={<Logout />}
      />

      <Route
        path="/favorites"
        element={<Favorites />}
      />

      <Route path="/orders" element={<Orders />} />

      <Route
        path="/add-dish"
        element={<AddDish />}
      />

      <Route
        path="/edit-dish/:id"
        element={<EditDish />}
      />

    </Routes>
  );
}

export default AppRoutes;