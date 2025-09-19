import { getDeliveryDate } from "../../scripts/utils/deliveryTime.js";
import { findMatchingProduct } from "../../scripts/utils/findMatchingProducts.js";
import { cart } from "./cart-oop.js";
import products from "./products-oop.js";
class Order {
  products;

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.products = JSON.parse(localStorage.getItem("ordered-products")) || [];
  }

  saveToStorage() {
    localStorage.setItem("ordered-products", JSON.stringify(this.products));
  }

  placeYourOrder(totalCents) {
    // const dateToady = getDeliveryDate(); //if no argument is passed gets the today's date
    // console.log(dateToady);

    const deliveryDaysMap = {
      1: "7",
      2: "3",
      3: "1",
    };

    const orderedProds = cart.cartItems.map((prods) => {
      return {
        ...prods,
        deliveryDays: deliveryDaysMap[prods.deliveryOptionId] || 0,
      };
    });

    const orderId = crypto.randomUUID();

    this.products.push({
      orderId,
     // orderPlacedDate: dateToady,
      orderTimestamp: Date.now(),
      orderTotalPrice: totalCents,
      ordered: orderedProds,
    });
    cart.cartItems.splice(0, cart.cartItems.length);
    cart.saveToStorage();
    this.saveToStorage();
    console.log(orderedProducts);
  }
}

const orderedProducts = new Order();

console.log(orderedProducts);

export default orderedProducts;
