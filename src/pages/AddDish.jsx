import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDish } from "../services/api";

function AddDish() {

  const navigate = useNavigate();

  const [dish, setDish] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    ingredients: "",
    rating: "4.5",
    type: "Veg",
    prepTime: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setDish({
      ...dish,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !dish.name ||
      !dish.category ||
      !dish.price ||
      !dish.image ||
      !dish.description ||
      !dish.ingredients ||
      !dish.prepTime
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {

      await addDish({
        ...dish,
        price: Number(dish.price),
        rating: Number(dish.rating)
      });

      alert("New dish added successfully! 🍽️");

      navigate("/dishes");

    } catch (error) {

      console.error(error);

      setError(
        "Unable to add dish. Make sure JSON Server is running."
      );

    }
  };

  return (
    <div className="add-dish-page">

      <div className="add-dish-header">

        <span className="section-tag">
          RESTAURANT MANAGEMENT
        </span>

        <h1>
          Add a new <span>dish.</span>
        </h1>

        <p>
          Add something delicious to your restaurant menu.
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
              placeholder="Example: Tandoori Chicken"
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={dish.category}
              onChange={handleChange}
            >
              <option value="">
                Select category
              </option>

              <option value="Starters">
                Starters
              </option>

              <option value="Pizza">
                Pizza
              </option>

              <option value="Biryani">
                Biryani
              </option>

              <option value="Main Course">
                Main Course
              </option>

              <option value="Burgers">
                Burgers
              </option>

              <option value="Desserts">
                Desserts
              </option>

              <option value="Beverages">
                Beverages
              </option>

              <option value="South Indian">
                South Indian
              </option>

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
              placeholder="250"
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
            placeholder="https://example.com/food.jpg"
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Rating</label>

            <select
              name="rating"
              value={dish.rating}
              onChange={handleChange}
            >
              <option value="4">4.0</option>
              <option value="4.2">4.2</option>
              <option value="4.5">4.5</option>
              <option value="4.7">4.7</option>
              <option value="4.8">4.8</option>
              <option value="4.9">4.9</option>
              <option value="5">5.0</option>
            </select>

          </div>

          <div className="form-group">

            <label>Food Type</label>

            <select
              name="type"
              value={dish.type}
              onChange={handleChange}
            >
              <option value="Veg">
                Veg
              </option>

              <option value="Non-Veg">
                Non-Veg
              </option>

            </select>

          </div>

        </div>

        <div className="form-group">

          <label>Description</label>

          <textarea
            name="description"
            value={dish.description}
            onChange={handleChange}
            placeholder="Describe your dish..."
            rows="4"
          />

        </div>

        <div className="form-group">

          <label>Ingredients</label>

          <textarea
            name="ingredients"
            value={dish.ingredients}
            onChange={handleChange}
            placeholder="Chicken, garlic, ginger, spices..."
            rows="3"
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
            + Add Dish
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddDish;