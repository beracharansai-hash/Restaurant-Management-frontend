import { Link } from "react-router-dom";
import {
  addFavorite,
  getFavorites,
  deleteDish
} from "../services/api";

function DishCard({ dish, onDelete }) {

  const handleFavorite = async () => {

    try {

      const response = await getFavorites();

      const exists = response.data.some(
        (item) => String(item.dishId) === String(dish.id)
      );

      if (exists) {
        alert("Already added to favorites ❤️");
        return;
      }

      await addFavorite({
        dishId: dish.id,
        name: dish.name,
        category: dish.category,
        price: dish.price,
        image: dish.image,
        description: dish.description,
        rating: dish.rating,
        type: dish.type,
        prepTime: dish.prepTime
      });

      alert("Added to favorites ❤️");

    } catch (error) {

      console.error(error);
      alert("Unable to add favorite.");

    }
  };


  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      `Delete "${dish.name}"?`
    );

    if (!confirmDelete) return;

    try {

      await deleteDish(dish.id);

      alert("Dish deleted successfully.");

      if (onDelete) {
        onDelete(dish.id);
      }

    } catch (error) {

      console.error(error);
      alert("Unable to delete dish.");

    }
  };


  return (

    <div className="dish-card">

      <div className="dish-image-wrapper">

        <img
          src={dish.image}
          alt={dish.name}
          className="dish-image"
        />

        <span className="category-badge">
          {dish.category}
        </span>

        <span className="rating-badge">
          ★ {dish.rating}
        </span>

        <button
          className="favorite-button"
          onClick={handleFavorite}
        >
          ♡
        </button>

      </div>

      <div className="dish-content">

        <div className="dish-title-row">

          <h3>{dish.name}</h3>

          <span
            className={
              dish.type === "Veg"
                ? "veg-symbol"
                : "nonveg-symbol"
            }
          >
            ●
          </span>

        </div>

        <p className="dish-description">
          {dish.description}
        </p>

        <div className="dish-info">

          <span>
            ⏱ {dish.prepTime}
          </span>

          <strong>
            ₹{dish.price}
          </strong>

        </div>

        <div className="card-actions">

          <Link
            to={`/dishes/${dish.id}`}
            className="details-button"
          >
            View Details →
          </Link>

          <button
            className="card-favorite-button"
            onClick={handleFavorite}
          >
            ❤️ Favorite
          </button>

        </div>

        <div className="admin-actions">

          <Link
            to={`/edit-dish/${dish.id}`}
            className="edit-button"
          >
            ✏️ Edit
          </Link>

          <button
            className="delete-button"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>

        </div>

      </div>

    </div>

  );
}

export default DishCard;