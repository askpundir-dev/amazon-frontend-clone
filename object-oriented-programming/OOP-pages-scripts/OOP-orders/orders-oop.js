import orderedProducts from "../../OOP-data-scripts/orderedProducts-oop.js";
import { getDeliveryDate } from "../../../scripts/utils/deliveryTime.js";
import { formatCurrency } from "../../../scripts/utils/money.js";
import { cart } from "../../OOP-data-scripts/cart-oop.js";
import { findMatchingProduct } from "../../../scripts/utils/findMatchingProducts.js";
import products from "../../OOP-data-scripts/products-oop.js";
import { findMatchingOption } from "../../../data/deliveryOptions.js";

console.log(getDeliveryDate());
console.log(orderedProducts);

// console.log(orderedProducts);
const main = document.querySelector(".main");

// console.log(main);
const ordersGrid = main.querySelector(".orders-grid");
// console.log(ordersGrid);

function renderOrderedProducts() {
  // sort newest first by orderPlacedDate
  const sortedProducts = [...orderedProducts.products].sort(
    (a, b) => b.orderTimestamp - a.orderTimestamp
  );

  if (sortedProducts.length === 0) {
    main.innerHTML = `
<div class="no-orders-container">
<h2>You haven’t placed any orders yet</h2>
<p>No previous orders found.</p>
<a href="amazon.html" class="no-orders-btn">View Products</a>
</div>
`;
    return;
  }

  let ordersGridHTML = "";
  sortedProducts.forEach((product) => {
    const html = `
<div class="order-container" data-order-id='${product.orderId}'>
<div class="order-header">
<div class="order-header-left-section">
<div class="order-date">
<div class="order-header-label">Order Placed:</div>
<div>${product.orderPlacedDate}</div>
</div>
<div class="order-total">
<div class="order-header-label">Total:</div>
<div>$${formatCurrency(product.orderTotalPrice)}</div>
</div>
</div>

<div class="order-header-right-section">
<div class="order-header-label">Order ID:</div>
<div>${product.orderId}</div>
</div>
</div>

<div class="order-details-grid">
${orderDetailsHTML(product)}
</div>
</div>`;

    ordersGridHTML += html;
  });

  ordersGrid.innerHTML = ordersGridHTML;
}

const cartQuantityIcon = document.querySelector(".cart-quantity");
function showCartQuantity() {
  cartQuantityIcon.textContent = cart.getCartTotal("quantity");
}

function orderDetailsHTML(product) {
  let orderDetailsGridHTML = "";
  product.ordered.forEach((item) => {
    console.log(item);
    const matchingProduct = findMatchingProduct(products, item);
    const matchedOption = findMatchingOption(item.deliveryOptionId);
    const arrivalDate = getDeliveryDate(matchedOption.deliveryDays);
    // console.log(arrivalDate);

    // console.log(matchedOption);
    // console.log(matchingProduct);
    orderDetailsGridHTML += ` 
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
Quantity: ${item.quantity}
</div>
<button class="buy-again-button button-primary" data-buy-again-id='${matchingProduct.id}'>
<img class="buy-again-icon" src="images/icons/buy-again.png">
<span class="buy-again-message">Buy it again</span>
</button>
</div>

<div class="product-actions">
<a href="tracking.html"> 
<button class="track-package-button button-secondary" data-track-package-id=${matchingProduct.id}>
Track package
</button>
</a>
</div>
`;
  });
  return orderDetailsGridHTML;
}

renderOrderedProducts();
showCartQuantity();

ordersGrid.addEventListener("click", (e) => {
  console.log("heyy");
  const container = e.target.closest(".order-container");
  console.log(container);
  if (!container) return null;
  const orderId = container.dataset.orderId;
  console.log(orderId);

  const buyItAgainBtn = e.target.closest(".buy-again-button");
  const trackPackageBtn = e.target.closest(".track-package-button");
  if (buyItAgainBtn) {
    const productId = buyItAgainBtn.dataset.buyAgainId;
    console.log(buyItAgainBtn);
    console.log(productId);
    cart.addToCart(productId);
    showCartQuantity();
  }
  if (trackPackageBtn) {
    console.log("hello");
    console.log(e.target);
    const packageId = trackPackageBtn.dataset.trackPackageId;
    trackPackaging(packageId, orderId);
  }
});

function trackPackaging(packageId, orderId) {
  let trackPackage = null; // store single product

  for (const products of orderedProducts.products) {
    if (products.orderId !== orderId) continue;
    for (const item of products.ordered) {
      if (item.id === packageId) {
        const placedTime = Date.now();
        const deliveryDays = item.deliveryDays || 5;
        const halfDelivery =
          placedTime + (deliveryDays * 24 * 60 * 60 * 1000) / 2;
        const deliveryTime = placedTime + deliveryDays * 24 * 60 * 60 * 1000;

        trackPackage = {
          ...item,
          statusTimestamps: {
            preparing: placedTime,
            shipped: halfDelivery,
            delivered: deliveryTime,
          },
        };

        break; // exit inner loop
      }
    }
    if (trackPackage) break; // exit outer loop if found
  }

  if (trackPackage) {
    console.log(trackPackage);
    localStorage.setItem("trackedPackage", JSON.stringify(trackPackage));
  }
}

document.querySelector(".search-button").onclick = () => {
  window.location.href = "amazon.html";
};
