import { Link, NavLink } from "react-router-dom";

function Navbar() {

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  return (
    <nav className="navbar">

      <div className="nav-container">

        <Link to="/" className="logo">
          🍴 Foodie<span>Hub</span>
        </Link>

        <div className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dishes"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Menu
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            ❤️ Favorites
          </NavLink>

          {loggedInUser ? (

            <>
              <Link
                to="/add-dish"
                className="add-nav-button"
              >
                + Add Dish
              </Link>

              <span className="welcome-user">
                Hi, {loggedInUser.name}
              </span>

              <Link
                to="/logout"
                className="nav-button"
              >
                Logout
              </Link>
            </>

          ) : (

            <>
              <Link
                to="/login"
                className="nav-link"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="nav-button"
              >
                Sign Up
              </Link>
            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;