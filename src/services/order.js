const ORDER_STORAGE_KEY = "restaurantOrder";

export const getOrder = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const addToOrder = (dish) => {
  const order = getOrder();
  const existingItem = order.find((item) => String(item.id) === String(dish.id));

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    order.push({ ...dish, quantity: 1 });
  }

  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  window.dispatchEvent(new Event("orderUpdated"));
  return order;
};

export const updateOrderQuantity = (dishId, quantity) => {
  const order = getOrder()
    .map((item) => String(item.id) === String(dishId) ? { ...item, quantity } : item)
    .filter((item) => item.quantity > 0);

  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  window.dispatchEvent(new Event("orderUpdated"));
  return order;
};

export const clearOrder = () => {
  localStorage.removeItem(ORDER_STORAGE_KEY);
  window.dispatchEvent(new Event("orderUpdated"));
};