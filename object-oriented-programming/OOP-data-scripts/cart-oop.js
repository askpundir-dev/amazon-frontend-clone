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

//generating another object with the same class
export const cart = new Cart("cart-oop"); //this is constructor invocation. It is automatically invoked when we create a new object.
//or we can like this:
// setting local storage key
// cart.localStorageKey='cart-oop'

// cart.loadFromStorage(); handelled by constructor now

// cart.addToCart("101a1f2e-23b3-4cd1-a322-8f61f2c11e01",1)

// console.log(cart);

// const businessCart=new Cart();
// businessCart.addToCart('101a1f2e-23b3-4cd1-a322-8f61f2c11e01');
// console.log(businessCart);


/*
// if i need to import cart from backend 

export function loadCart(callback){

  const xhr=new XMLHttpRequest();
  
  xhr.addEventListener('load',()=>{
    
  xhr.response
  console.log(xhr.response);
  
  callback();
  // console.log('load Cart');
 
   
  });


  //SUPERSIMPLEDEV'S BACKEND
  xhr.open('GET','https://supersimplebackend.dev/cart');

  xhr.send();
 }

*/

//  export default cart;
