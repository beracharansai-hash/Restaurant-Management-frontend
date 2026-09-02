import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDishById } from "../services/api";

function DishDetails() {

  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDish = async () => {

      try {

        const response = await getDishById(id);

        setDish(response.data);

      } catch (err) {

        setError("Dish not found.");

      } finally {

        setLoading(false);

      }
    };

    fetchDish();

  }, [id]);

  if (loading) {
    return (
      <div className="status-message">
        Preparing your dish details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  return (
    <div className="details-page">

      <Link to="/dishes" className="back-button">
        ← Back to Menu
      </Link>

      <div className="details-container">

        <div className="details-image-section">

          <img
            src={dish.image}
            alt={dish.name}
          />

          <div className="details-rating">
            ★ {dish.rating}
          </div>

        </div>

        <div className="details-content">

          <span className="details-category">
            {dish.category}
          </span>

          <h1>{dish.name}</h1>

          <div className="price">
            ₹{dish.price}
          </div>

          <p className="details-description">
            {dish.description}
          </p>

          <div className="details-divider"></div>

          <h3>About this dish</h3>

          <div className="detail-item">

            <span>🥘</span>

            <div>
              <strong>Ingredients</strong>
              <p>{dish.ingredients}</p>
            </div>

          </div>

          <div className="detail-item">

            <span>⏱️</span>

            <div>
              <strong>Preparation Time</strong>
              <p>{dish.prepTime}</p>
            </div>

          </div>

          <div className="detail-item">

            <span>
              {dish.type === "Veg" ? "🌱" : "🍗"}
            </span>

            <div>
              <strong>Food Type</strong>
              <p>{dish.type}</p>
            </div>

          </div>

          <button className="order-button">
            Add to Order 🛒
          </button>

        </div>

      </div>

    </div>
  );
}

export default DishDetails;