// import { orderedProducts } from "../../data/orderedProducts.js";
import { orderedProducts } from "../checkout/paymentSummary.js";
import { getDeliveryDate } from "../utils/deliveryTime.js";
import { formatCurrency } from "../utils/money.js";
import { cart, getCartTotal } from "../../data/cart.js";
import { findMatchingProduct } from "../utils/findMatchingProducts.js";
import { products } from "../../data/products.js";
import { findMatchingOption } from "../../data/deliveryOptions.js";
console.log(getDeliveryDate());

console.log(orderedProducts);
const main=document.querySelector('.main');

console.log(main);
const ordersGrid=main.querySelector('.orders-grid');
console.log(ordersGrid);

console.log(orderedProducts);
function renderOrderedProducts(){
  let ordersGridHTML='';
  // const dateToady=getDeliveryDate();
  orderedProducts.forEach(date=>{
  console.log(date.ordered);
  
  const html=`  <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${date.orderPlacedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(date.orderTotalPrice)}</div>
              </div>
            </div>


            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>

          <div class="order-details-grid">
          ${orderDetailsHTML(date)}
           </div>

        </div>` 
    
ordersGridHTML+=html;
  });
  ordersGrid.innerHTML=ordersGridHTML;
  console.log(ordersGrid.innerHTML);
}


const cartQuantityIcon=document.querySelector('.cart-quantity');
function cartQuantity(){
  cartQuantityIcon.innerHTML=getCartTotal('quantity');
}



function orderDetailsHTML(date){
let orderDetailsGridHTML=''
date.ordered.forEach(order=>{
  console.log(order);
  const matchingProduct=findMatchingProduct(products,order);
  const matchedOption=findMatchingOption(order.deliveryOptionId);
  const arrivalDate=getDeliveryDate(matchedOption.deliveryDays);
  console.log(arrivalDate);

  console.log(matchedOption);
  console.log(matchingProduct);
orderDetailsGridHTML+=` 
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
               ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivalDate}
              </div>
              <div class="product-quantity">
                Quantity: ${order.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `;
});
return orderDetailsGridHTML;
}

renderOrderedProducts();
cartQuantity();