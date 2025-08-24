import { products } from "./products.js";
export let cart =JSON.parse(localStorage.getItem("cart"))||[];



export function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;
  const select = document.querySelector(`.js-product-selector-${product.id}`);
  const selectedQuantity = parseInt(select.value) || 1;
  // console.log(select.value);
  // console.log(typeof selectedQuantity);
  showAddToCartMessage(productId);
  // Check if this product already exists in cart
  const cartItem = cart.find((item) => item.id === productId);

  //initial value always undefined(falsy value) so it always moves to else block
  //  this condition is truthy only when cart has matching items.
  if (cartItem) {
    cartItem.quantity += selectedQuantity; // ✅ increase existing quantity
  } else {
    cart.push({
      id: product.id,
      quantity: selectedQuantity,
    });
  }

  // console.log(cart);

  //THIS MAKES DROPDOWN RESET TO 1 AFTER PRESSING add-to-cart-button

  select.value = "1"; //  console.log(select.value);
  saveCart()
}

const addToCartMsgTimeouts = {};
export function showAddToCartMessage(productId){
//CLEARING PREVIOUS TIMEOUT
  clearTimeout(addToCartMsgTimeouts[productId]);

  //TO DISPLAY Added MESSAGE WHEN CLICKING ADD TO CART BUTTON
  const messageContainer = document.querySelector(
    `div[data-message-id="${productId}"]`
  );
  // console.log(messageContainer);
 if (!messageContainer) return;

  messageContainer.classList.add("display-message");
 
  addToCartMsgTimeouts[productId]  = setTimeout(() => {
    messageContainer.classList.remove("display-message");
  }, 1200);
  console.log(addToCartMsgTimeouts);
}


export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
