import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDishes } from "../services/api";
import DishCard from "../components/DishCard";

function Dishes() {

  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    loadDishes();

  }, []);

  const loadDishes = async () => {

    try {

      setLoading(true);

      const response = await getDishes();

      setDishes(response.data);

      setError("");

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load menu. Make sure JSON Server is running."
      );

    } finally {

      setLoading(false);

    }
  };


  const categories = [
    "All",
    ...new Set(
      dishes.map((dish) => dish.category)
    )
  ];


  const filteredDishes = dishes.filter((dish) => {

    const matchesSearch =
      dish.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      dish.category === category;

    return matchesSearch && matchesCategory;

  });


  const handleDelete = (id) => {

    setDishes((currentDishes) =>
      currentDishes.filter(
        (dish) => dish.id !== id
      )
    );

  };


  return (

    <div className="dishes-page">

      <section className="menu-header">

        <div>

          <span className="section-tag">
            OUR MENU
          </span>

          <h1>
            Something delicious
            <br />
            <span>for everyone.</span>
          </h1>

        </div>

        <div className="menu-header-right">

          <p>
            From comfort classics to exciting new
            flavours, find your next favourite dish.
          </p>

          <Link
            to="/add-dish"
            className="add-new-button"
          >
            + Add New Dish
          </Link>

        </div>

      </section>


      <section className="menu-controls">

        <div className="search-box">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search for a dish..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="category-list">

          {categories.map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category-button selected"
                  : "category-button"
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </section>


      {loading && (

        <div className="status-message">

          <h3>
            Loading delicious food... 🍽️
          </h3>

        </div>

      )}


      {error && !loading && (

        <div className="error-message">

          <h3>
            Something went wrong 😕
          </h3>

          <p>{error}</p>

          <button
            className="category-button selected"
            onClick={loadDishes}
          >
            Try Again
          </button>

        </div>

      )}


      {!loading && !error && (

        <section className="dish-grid">

          {filteredDishes.length > 0 ? (

            filteredDishes.map((dish) => (

              <DishCard
                key={dish.id}
                dish={dish}
                onDelete={handleDelete}
              />

            ))

          ) : (

            <div className="empty-message">

              <span>🍽️</span>

              <h2>
                No dishes found
              </h2>

              <p>
                Try another search or category.
              </p>

              <button
                className="category-button selected"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show All Dishes
              </button>

            </div>

          )}

        </section>

      )}

    </div>

  );
}

export default Dishes;