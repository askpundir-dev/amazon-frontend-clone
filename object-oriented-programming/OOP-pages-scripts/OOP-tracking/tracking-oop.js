import { cart } from "../../OOP-data-scripts/cart-oop.js";
import { findMatchingOption } from "../../../data/deliveryOptions.js";
import products from "../../OOP-data-scripts/products-oop.js";
import { getDeliveryDate } from "../../../scripts/utils/deliveryTime.js";
import { findMatchingProduct } from "../../../scripts/utils/findMatchingProducts.js";

const orderTrackingElement = document.querySelector(".order-tracking");

const progressMap = {
  Processing: "8%",
  Shipped: "50%",
  "Out For Delivery": "75%",
  Delivered: "100%",
};

function findStatus($Package) {
  console.log($Package);

  const timeDifferenceMs =
    $Package.statusTimestamps.delivered - $Package.statusTimestamps.preparing;
  const estimatedTimeMs =
    $Package.statusTimestamps.preparing + timeDifferenceMs;

  console.log(estimatedTimeMs);

  const timeNowMs = Date.now();
  const orderCreatedAtMs = $Package.placedTimeMs;
  console.log(orderCreatedAtMs);

  const elapsed = timeNowMs - orderCreatedAtMs;

  // Divide into 3 phases
  const phase1End = estimatedTimeMs / 3;
  const phase2End = (2 * estimatedTimeMs) / 3;
  const phase3End = estimatedTimeMs;

  let status;
  if (elapsed < phase1End) {
    status = "Processing";
  } else if (elapsed < phase2End) {
    status = "Shipped";
  } else if (elapsed < phase3End) {
    status = "Out For Delivery";
  } else {
    status = "Delivered";
  }

  return status;
}

function renderTrackedProduct() {
  const product = JSON.parse(localStorage.getItem("trackedPackage"));
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

  const currentStatus = findStatus(product);
  const progressPercent = progressMap[currentStatus];

  const orderTrackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${arrivalDate}
    </div>

    <div class="product-info">${matchingProduct.name}</div>

    <div class="product-info">Quantity: ${product.quantity}</div>

    <img class="product-image" src="${matchingProduct.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${
        currentStatus === "Processing" ? "current-status" : ""
      }">Processing</div>
      <div class="progress-label ${
        currentStatus === "Shipped" ? "current-status" : ""
      }">Shipped</div>
      
      <div class="progress-label ${
        currentStatus === "Delivered" ? "current-status" : ""
      }">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: 0%"></div>
    </div>
  `;

  orderTrackingElement.innerHTML = orderTrackingHTML;

  // ✅ Animate after DOM update
  const progressBar = orderTrackingElement.querySelector(".progress-bar");
  requestAnimationFrame(() => {
    progressBar.style.width = progressPercent;
  });
}

// ✅ Header update
const header = document.querySelector(".amazon-header");
header.querySelector(".cart-quantity").innerHTML = `${cart.getCartTotal(
  "quantity"
)}`;
renderTrackedProduct();

header.querySelector(".search-button").onclick = () => {
  window.location.href = "amazon.html";
};
