import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearOrder, getOrder, updateOrderQuantity } from "../services/order";

function Orders() {
  const [order, setOrder] = useState(getOrder);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const refreshOrder = () => setOrder(getOrder());
    window.addEventListener("orderUpdated", refreshOrder);
    return () => window.removeEventListener("orderUpdated", refreshOrder);
  }, []);

  const total = order.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const changeQuantity = (dishId, quantity) => setOrder(updateOrderQuantity(dishId, quantity));

  const placeOrder = () => {
    setPlaced(true);
    clearOrder();
    setOrder([]);
  };

  if (placed) {
    return (
      <section className="orders-page empty-message">
        <h1>Order received!</h1>
        <p>Thank you. Your delicious meal is being prepared.</p>
        <Link to="/dishes" className="order-button order-link">Order More Food</Link>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <div className="orders-header">
        <div><span className="section-tag">YOUR ORDER</span><h1>Ready when you are.</h1></div>
        <Link to="/dishes" className="back-button">Continue Browsing</Link>
      </div>

      {order.length === 0 ? (
        <div className="empty-message">
          <h2>Your order is empty</h2>
          <p>Add something tasty from the menu to get started.</p>
          <Link to="/dishes" className="order-button order-link">Browse Menu</Link>
        </div>
      ) : (
        <div className="order-layout">
          <div className="order-items">
            {order.map((item) => (
              <article className="order-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="order-item-info">
                  <h2>{item.name}</h2><p>₹{item.price} each</p>
                  <div className="quantity-controls">
                    <button onClick={() => changeQuantity(item.id, item.quantity - 1)} aria-label={`Remove one ${item.name}`}>−</button>
                    <strong>{item.quantity}</strong>
                    <button onClick={() => changeQuantity(item.id, item.quantity + 1)} aria-label={`Add one ${item.name}`}>+</button>
                  </div>
                </div>
                <strong>₹{Number(item.price) * item.quantity}</strong>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <h2>Order Summary</h2>
            <div><span>Total</span><strong>₹{total}</strong></div>
            <button className="order-button" onClick={placeOrder}>Place Order</button>
            <button className="clear-order-button" onClick={() => { clearOrder(); setOrder([]); }}>Clear Order</button>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Orders;