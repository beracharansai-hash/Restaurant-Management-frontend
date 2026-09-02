import axios from "axios";

const API = axios.create({
  baseURL: "https://restaurant-management-system-backend-mqnt.onrender.com/"
});

// Dishes
export const getDishes = () => API.get("/dishes");

export const getDishById = (id) =>
  API.get(`/dishes/${id}`);

export const addDish = (dish) =>
  API.post("/dishes", dish);

export const updateDish = (id, dish) =>
  API.put(`/dishes/${id}`, dish);

export const deleteDish = (id) =>
  API.delete(`/dishes/${id}`);

// Users
export const getUsers = () =>
  API.get("/users");

export const createUser = (user) =>
  API.post("/users", user);

// Favorites
export const getFavorites = () =>
  API.get("/favorites");

export const addFavorite = (dish) =>
  API.post("/favorites", dish);

export const removeFavorite = (id) =>
  API.delete(`/favorites/${id}`);

export default API;