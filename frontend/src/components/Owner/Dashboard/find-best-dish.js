export default function findBestDish(orders) {
    const foodItemQuantities = new Map();
  
    
    orders.forEach((order) => {
      order.orderItems.forEach((orderItem) => {
        const { name, quantity } = orderItem;
        if (foodItemQuantities.has(name)) {
          foodItemQuantities.set(name, foodItemQuantities.get(name) + quantity);
        } else {
          foodItemQuantities.set(name, quantity);
        }
      });
    });
  
    // Find the best selling food item
    let bestSellingItem = null;
    let maxQuantity = 0;
  
    foodItemQuantities.forEach((quantity, item) => {
      if (quantity > maxQuantity) {
        maxQuantity = quantity;
        bestSellingItem = item;
      }
    });
  
    return bestSellingItem;
  }
  