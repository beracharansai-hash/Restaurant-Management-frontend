import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFavorites,
  removeFavorite
} from "../services/api";

function Favorites() {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {

    try {

      const response = await getFavorites();

      setFavorites(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (id) => {

    try {

      await removeFavorite(id);

      setFavorites(
        favorites.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {

      console.error(error);

    }
  };

  if (loading) {
    return (
      <div className="status-message">
        Loading your favorites...
      </div>
    );
  }

  return (
    <div className="favorites-page">

      <div className="favorites-header">

        <span className="section-tag">
          YOUR COLLECTION
        </span>

        <h1>
          Favourite <span>dishes.</span>
        </h1>

        <p>
          Your hand-picked collection of dishes
          you love the most.
        </p>

      </div>

      {favorites.length === 0 ? (

        <div className="empty-favorites">

          <div className="empty-icon">
            ♡
          </div>

          <h2>
            No favorites yet
          </h2>

          <p>
            Explore our menu and save dishes
            you want to try.
          </p>

          <Link
            to="/dishes"
            className="hero-button"
          >
            Explore Menu →
          </Link>

        </div>

      ) : (

        <div className="favorites-grid">

          {favorites.map((dish) => (

            <div
              className="favorite-card"
              key={dish.id}
            >

              <img
                src={dish.image}
                alt={dish.name}
              />

              <div className="favorite-card-content">

                <span>
                  {dish.category}
                </span>

                <h3>
                  {dish.name}
                </h3>

                <p>
                  {dish.description}
                </p>

                <div className="favorite-bottom">

                  <strong>
                    ₹{dish.price}
                  </strong>

                  <button
                    onClick={() =>
                      handleRemove(dish.id)
                    }
                  >
                    Remove ♡
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;