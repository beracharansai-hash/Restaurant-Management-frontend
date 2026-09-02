import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            ✦ GOOD FOOD • GOOD MOOD
          </span>

          <h1>
            Your cravings,
            <br />
            <span>our kitchen.</span>
          </h1>

          <p>
            Discover delicious dishes prepared with fresh
            ingredients and served with a whole lot of love.
          </p>

          <Link to="/dishes" className="hero-button">
            Explore Our Menu →
          </Link>

        </div>

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="floating-card">
            <span>⭐</span>
            <div>
              <strong>4.9/5</strong>
              <small>Customer Rating</small>
            </div>
          </div>

          <div className="food-emoji">
            🍛
          </div>

        </div>

      </section>

      <section className="home-features">

        <div>
          <span>🥘</span>
          <h3>Fresh Ingredients</h3>
          <p>Quality ingredients in every dish.</p>
        </div>

        <div>
          <span>👨‍🍳</span>
          <h3>Expert Chefs</h3>
          <p>Prepared by passionate chefs.</p>
        </div>

        <div>
          <span>⚡</span>
          <h3>Quick Service</h3>
          <p>Great food without the long wait.</p>
        </div>

      </section>

    </div>
  );
}

export default Home;