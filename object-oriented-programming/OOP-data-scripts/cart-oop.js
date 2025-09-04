import { findMatchingProductWithId } from "../../scripts/utils/findMatchingProducts.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItems) this.cartItems = [];
  }

  addToCart(productId, quantityToAdd = 1) {
    if (!productId) return null;

    const selectedQuantity = parseInt(quantityToAdd);
    const cartItem = this.cartItems.find((item) => item.id === productId);

    if (cartItem) {
      cartItem.quantity += selectedQuantity;
    } else {
      this.cartItems.push({
        id: productId,
        orderTimestamp: Date.now(),
        quantity: selectedQuantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
    return 1;
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  deleteFromCart(productId) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    console.log(this.cartItems);
    this.saveToStorage();
  }

  getCartTotal(value) {
    if (!value) return null;
    return this.cartItems.reduce(
      (acc, curItem) => acc + (curItem[value] || 0),
      0
    );
  }

  updateDeliveryOptionId(productId, deliveryOptionId) {
    let matchingProduct = findMatchingProductWithId(this.cartItems, productId);
    if (!matchingProduct) return;

    matchingProduct.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

export const cart = new Cart("cart-oop"); //this is constructor invocation. It is automatically invoked when we create a new object.
