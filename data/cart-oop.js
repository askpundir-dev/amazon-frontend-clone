import { findMatchingProductWithId } from "../scripts/utils/findMatchingProducts.js";
import { products } from "./products.js";


const cart={
   cartItems,

 loadFromStorage(){
  this.cartItems=JSON.parse(localStorage.getItem('cart-oop'));//||[];

  if(!this.cartItems) this.cartItems=[];
},


 addToCart(productId) {
  
  const cartItem = this.cartItems.find((item) => item.id === productId);
  console.log(cartItem);

  if (cartItem) {
    cartItem.quantity += selectedQuantity; 
  } else {
   this.cartItems.push({
      id: productId,
      quantity: selectedQuantity,
      deliveryOptionId:'1',
    });
  }
  select.value = "1"; 
  saveToStorage();
},


 saveToStorage() {
  localStorage.setItem("cart-oop", JSON.stringify(cartItems));
},

deleteFromCart(productId){
const newCart=[];
this.cartItems.forEach(item => {
  if(item.id !==productId)
  newCart.push(item);
});
this.cartItems=newCart;
console.log(this.cartItems);
 saveToStorage();
},

 getCartTotal(value) {
  if(!value) return null;
  return this.cartItems.reduce((acc, curItem) => acc + curItem[`${value}`]||0, 0);
},

updateDeliveryOptionId(productId,deliveryOptionId){

let matchingProduct=findMatchingProductWithId(this.cartItems,productId);
console.log(matchingProduct);

matchingProduct.deliveryOptionId=deliveryOptionId;

console.log(matchingProduct.deliveryOptionId);
saveToStorage();

},

}
















