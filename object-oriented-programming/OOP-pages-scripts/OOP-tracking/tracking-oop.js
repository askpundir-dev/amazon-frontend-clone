import { cart } from "../../OOP-data-scripts/cart-oop.js";
import { findMatchingOption } from "../../../data/deliveryOptions.js";
import products from "../../OOP-data-scripts/products-oop.js";
import { getDeliveryDate } from "../../../scripts/utils/deliveryTime.js";
import { findMatchingProduct } from "../../../scripts/utils/findMatchingProducts.js";

const orderTrackingElement = document.querySelector(".order-tracking");

function renderTrackedProduct() {
  const product = JSON.parse(localStorage.getItem("trackedPackage")); // now a single object
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

  const rawPercent =
    (statuses.indexOf(currentStatus) / (statuses.length - 1)) * 95;
  const progressPercent = 5 + rawPercent;

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
${statuses
  .map(
    (status) => `
<div class="progress-label ${status === currentStatus ? "current-status" : ""}">
${status}
</div>
`
  )
  .join("")}
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
const header = document.querySelector(".amazon-header");
header.querySelector(".cart-quantity").innerHTML = `${cart.getCartTotal(
  "quantity"
)}`;
renderTrackedProduct();

header.querySelector(".search-button").onclick = () => {
  window.location.href = "amazon.html";
};
