import { findMatchingProductWithId } from "../scripts/utils/findMatchingProducts.js";
import { products } from "./products.js";

export let cart =JSON.parse(localStorage.getItem("cart"))||[];



export function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;
  const select = document.querySelector(`.js-product-selector-${product.id}`);
  const selectedQuantity = parseInt(select.value) || 1;
  // console.log(select.value);
  // console.log(typeof selectedQuantity);
  
  // Check if this product already exists in cart
  const cartItem = cart.find((item) => item.id === productId);
  console.log(cartItem);

  //initial value always undefined(falsy value) so it always moves to else block
  //  this condition is truthy only when cart has matching items.
  if (cartItem) {
    cartItem.quantity += selectedQuantity; // ✅ increase existing quantity
  } else {
    cart.push({
      id: product.id,
      quantity: selectedQuantity,
      deliveryOptionId:'1',
    });
  }

  // console.log(cart);

  //THIS MAKES DROPDOWN RESET TO 1 AFTER PRESSING add-to-cart-button
  select.value = "1"; //  console.log(select.value);
  saveCart()
}

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function deleteFromCart(productId){
const newCart=[];
cart.forEach(item => {
  if(item.id !==productId)
  newCart.push(item);
});
cart=newCart;
console.log(cart);
saveCart();
}


export function getCartTotal(value) {
  if(!value) return null;
  return cart.reduce((acc, curItem) => acc + curItem[`${value}`]||0, 0);
}



export function updateDeliveryOptionId(productId,deliveryOptionId){
//CAN DO LIKE THIS:
  //   let matchingProduct;
// cart.forEach(item=>{
//   if(item.id===productId)  matchingProduct=item;
// });
// console.log(matchingProduct);
let matchingProduct=findMatchingProductWithId(cart,productId);
console.log(matchingProduct);

matchingProduct.deliveryOptionId=deliveryOptionId;

console.log(matchingProduct.deliveryOptionId);
saveCart();

}

