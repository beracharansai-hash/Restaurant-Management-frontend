import { useEffect, useState } from "react";
import FoodCard from "../components/DishCard";
import { getFoods } from "../services/api";

function Menu() {
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        getFoods()
            .then((data) => setFoods(data))
            .catch((error) => console.log(error));
    }, []);

    const categories = ["All", ...new Set(foods.map(food => food.category))];

    const filteredFoods = foods.filter((food) => {
        const matchesSearch = food.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || food.category === category;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="menu-page">

            <h1>Our Menu</h1>

            <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div>
                {categories.map((item) => (
                    <button
                        key={item}
                        onClick={() => setCategory(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="food-container">
                {filteredFoods.map((food) => (
                    <FoodCard
                        key={food.id}
                        food={food}
                    />
                ))}
            </div>

        </div>
    );
}

export default Menu;