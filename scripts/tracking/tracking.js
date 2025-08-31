import {  getCartTotal } from "../../data/cart.js";
import { findMatchingOption } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { getDeliveryDate } from "../utils/deliveryTime.js";
import { findMatchingProduct } from "../utils/findMatchingProducts.js";




// The DOMContentLoaded wrapper is only necessary if our script is in the <head> or runs before the HTML elements it’s trying to access exist.

// document.addEventListener("DOMContentLoaded", ...) → waits until the full HTML is loaded, so that querySelectors don’t return null.

// If our script tag is placed at the end of <body>, after all the DOM elements, then everything exists already and we don’t need DOMContentLoaded

// document.addEventListener("DOMContentLoaded", () => {
//   const packageDetails = getTrackedPackage();
//   if (!packageDetails) return;

//   // render product details
//   packageDetails.forEach(product => {
//     console.log("Product:", product);
//     // add DOM rendering here
//   });
// });

  const orderTrackingElement=document.querySelector('.order-tracking');



function renderTrackedProduct() {
  const product = JSON.parse(localStorage.getItem('trackedPackage')); // now a single object
  if (!product) {
    orderTrackingElement.innerHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
      <div>No package is being tracked right now.</div>
    `;
    return;
  }

  const matchingProduct = findMatchingProduct(products, product);
  const matchingOption = findMatchingOption(product.deliveryOptionId);
  const arrivalDate = getDeliveryDate(matchingOption.deliveryDays);

  // Compute current status
  const currentStatus = getCurrentStatus(product);
  const statuses = ["Preparing", "Shipped", "Delivered"];
  
  const rawPercent=(statuses.indexOf(currentStatus)/(statuses.length-1))*95;
  const progressPercent = 5+rawPercent;

  const orderTrackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${arrivalDate}
    </div>

    <div class="product-info">
      ${matchingProduct.name}
    </div>

    <div class="product-info">
      Quantity: ${product.quantity}
    </div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      ${statuses.map(status => `
        <div class="progress-label ${status === currentStatus ? 'current-status' : ''}">
          ${status}
        </div>
      `).join('')}
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progressPercent}%"></div>
    </div>
  `;

  orderTrackingElement.innerHTML = orderTrackingHTML;
}


function getCurrentStatus(product) {
  const now = Date.now();
  const { preparing, shipped, delivered } = product.statusTimestamps;

  if (now >= delivered) return "Delivered";
  if (now >= shipped) return "Shipped";
  if (now >= preparing) return "Preparing"; // ✅ added preparing
}
const header=document.querySelector('.amazon-header');
header.querySelector('.cart-quantity').innerHTML=`${getCartTotal('quantity')}`
renderTrackedProduct();

header.querySelector('.search-button').onclick=()=>{
  window.location.href='amazon.html';
}
