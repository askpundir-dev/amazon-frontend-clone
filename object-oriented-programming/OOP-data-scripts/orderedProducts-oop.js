import { getDeliveryDate } from "../../scripts/utils/deliveryTime.js";
import {cart} from "./cart-oop.js";
import { cartIsEmpty } from "../OOP-pages-scripts/OOP-checkout/renderCartProducts-oop.js";
import { renderCartProducts } from "../OOP-pages-scripts/OOP-checkout/renderCartProducts-oop.js";

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
    const dateToady = getDeliveryDate(); //if no argument is passed gets the today's date
    console.log(dateToady);
    let orderedProds = [...cart.cartItems];
    const orderId = crypto.randomUUID();

    this.products.push({
      orderId,
      orderPlacedDate: dateToady,
      orderTimestamp: Date.now(),
      orderTotalPrice: totalCents,
      ordered: orderedProds,
    });
    cart.cartItems.splice(0, cart.cartItems.length);
    cart.saveToStorage();
    cartIsEmpty();
    renderCartProducts();
    this.saveToStorage();
    console.log(orderedProducts);
  }
}

const orderedProducts = new Order();

console.log(orderedProducts);

export default orderedProducts;
