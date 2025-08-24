import { products } from "../data/products.js";
import { cart, deleteFromCart} from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { saveCart } from "../data/cart.js";

const orderSummary=document.querySelector(".js-order-summary");
console.log(cart);
let summaryHTML="";
console.log(orderSummary);


function findMatchingProduct(cartItem, products) {
  return products.find(product => product.id === cartItem.id);
}


cart.forEach((cartItem) => {

  // console.log(cartItem.id);
  //USING ARRAY.FIND() TO COMPARE THE cartItem.id with product.id
//  let matchingProduct=products.find(product=>product.id===cartItem.id);

 //CREATED A FUNCTION FOR FINDING MATCHING ITEMS BECAUSE THIS CODE IS REPEATED MULTIPLE TIMES
  let matchingProduct=findMatchingProduct(cartItem, products)

 //OR USING forEach() WE CAN DO THIS WAY 
// let matchingProduct;
// products.forEach(product=>{
//   if(product.id===cartItem.id){
//     console.log(product);
//     console.log(product.id);
//     matchingProduct= product;
//   }
//   });

//console.log(matchingProduct);

const html=` <div class="cart-item-container js-remove-from-cart-${matchingProduct.id}" data-product-container-id="${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity:
                    <span class="quantity-label">
                    ${cartItem.quantity}
                    </span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-btn">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"  class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        summaryHTML+=html;
});
console.log(summaryHTML);
orderSummary.innerHTML=summaryHTML;

function  showTotalCartQuantity(){
  const total=cart.reduce((acc,curItem)=>acc+=curItem.quantity,0);
// console.log(total);

//SHOWS TOTAL ITEMS AT THE TOP OF THE SCREEN 
document.querySelector(".js-total-cart-items").innerHTML=`${total} items`;

//SHOWS TOTAL ITEMS IN ORDER SUMMARY
document.querySelector(".order-sumry-total-items").innerHTML=`Items (${total}):`;
}

 showTotalCartQuantity();
//I CAN DO THIS WAY IF I NEED QUANTITY IN MULTIPLE LOCATIONS
// function getCartTotalQuantity(cart){
//   return cart.reduce((acc,cur)=>acc+=cur.quantity,0);
// }
// const quantity=getCartTotalQuantity(cart);
// console.log(quantity);


function totalItemsPrice(){
  let total=0;


}

console.log(cart);
// console.log(cart[0].priceCents);
// const itemsTotal=(cart.reduce((acc,product)=>acc+=product.priceCents,0)/100).toFixed(2);
// document.querySelector(".payment-summary-money").innerHTML=`$${itemsTotal}`

// console.log(itemsTotal);


orderSummary.addEventListener("click", (e) => {
  // Always climb to the product container
  const container = e.target.closest("[data-product-container-id]");
  if (!container) return; // not a product click

  const id = container.dataset.productContainerId;
  const matchingProduct = products.find(product => product.id === id);
// console.log(matchingProduct);

  // Check if clicked on update button (or inside it)
  const updateBtn = e.target.closest(".js-update-btn");
  const deleteBtn=e.target.closest(".delete-quantity-link");
  if (updateBtn) {
    console.log("hello, update button clicked:", updateBtn);
  }
  else if(deleteBtn){
    console.log("hello deleted",deleteBtn);
    deleteFromCart(id);
    document.querySelector(`.js-remove-from-cart-${id}`).remove();
    showTotalCartQuantity();
    saveCart();
  }
});



