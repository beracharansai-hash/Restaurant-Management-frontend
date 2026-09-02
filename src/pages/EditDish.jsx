import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDishById,
  updateDish
} from "../services/api";

function EditDish() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [dish, setDish] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    ingredients: "",
    rating: "",
    type: "Veg",
    prepTime: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadDish = async () => {

      try {

        const response = await getDishById(id);

        setDish(response.data);

      } catch (err) {

        console.error(err);
        setError("Unable to load dish.");

      } finally {

        setLoading(false);

      }
    };

    loadDish();

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setDish({
      ...dish,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !dish.name ||
      !dish.category ||
      !dish.price ||
      !dish.image ||
      !dish.description ||
      !dish.ingredients ||
      !dish.prepTime
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {

      await updateDish(id, {
        ...dish,
        price: Number(dish.price),
        rating: Number(dish.rating)
      });

      alert("Dish updated successfully! ✅");

      navigate("/dishes");

    } catch (err) {

      console.error(err);

      setError("Unable to update dish.");

    }
  };

  if (loading) {
    return (
      <div className="status-message">
        Loading dish...
      </div>
    );
  }

  return (
    <div className="add-dish-page">

      <div className="add-dish-header">

        <span className="section-tag">
          MENU MANAGEMENT
        </span>

        <h1>
          Edit <span>dish.</span>
        </h1>

        <p>
          Update the details of your restaurant dish.
        </p>

      </div>

      <form
        className="dish-form"
        onSubmit={handleSubmit}
      >

        <div className="form-row">

          <div className="form-group">

            <label>Dish Name</label>

            <input
              name="name"
              value={dish.name}
              onChange={handleChange}
              placeholder="Dish name"
            />

          </div>

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={dish.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Starters">Starters</option>
              <option value="Pizza">Pizza</option>
              <option value="Biryani">Biryani</option>
              <option value="Main Course">Main Course</option>
              <option value="Burgers">Burgers</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
              <option value="South Indian">South Indian</option>
            </select>

          </div>

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Price (₹)</label>

            <input
              type="number"
              name="price"
              value={dish.price}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Preparation Time</label>

            <input
              name="prepTime"
              value={dish.prepTime}
              onChange={handleChange}
              placeholder="20 mins"
            />

          </div>

        </div>

        <div className="form-group">

          <label>Image URL</label>

          <input
            name="image"
            value={dish.image}
            onChange={handleChange}
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Rating</label>

            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              name="rating"
              value={dish.rating}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Food Type</label>

            <select
              name="type"
              value={dish.type}
              onChange={handleChange}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>

          </div>

        </div>

        <div className="form-group">

          <label>Description</label>

          <textarea
            name="description"
            rows="4"
            value={dish.description}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Ingredients</label>

          <textarea
            name="ingredients"
            rows="3"
            value={dish.ingredients}
            onChange={handleChange}
          />

        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <div className="form-buttons">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/dishes")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-dish-button"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditDish;