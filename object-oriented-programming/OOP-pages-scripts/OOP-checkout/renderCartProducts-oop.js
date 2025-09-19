import { cart } from "../../OOP-data-scripts/cart-oop.js";
import { findMatchingProduct } from "../../../scripts/utils/findMatchingProducts.js";
import products from "../../OOP-data-scripts/products-oop.js";
import {
  findMatchingOption,
  deliveryOptions,
} from "../../../data/deliveryOptions.js";
import { getDeliveryDate } from "../../../scripts/utils/deliveryTime.js";

import { formatCurrency } from "../../../scripts/utils/money.js";

export function renderCartProducts(orderSummary) {
  if (cart.cartItems.length) {
    let summaryHTML = "";
    const sortedProducts = cart.cartItems.sort(
      (a, b) => b.addToCartTimeMs - a.addToCartTimeMs
    );
    sortedProducts.forEach((cartItem) => {
      let matchingProduct = findMatchingProduct(products, cartItem);
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = findMatchingOption(deliveryOptionId);
      const html = `<div class="cart-item-container js-remove-from-cart-${
        matchingProduct.id
      }" data-product-container-id="${matchingProduct.id}">
<div class="delivery-date js-date-div-${matchingProduct.id}">
Delivery date: ${getDeliveryDate(deliveryOption.deliveryDays)}
</div>

<div class="cart-item-details-grid">
<img class="product-image"
src="${matchingProduct.image}">

<div class="cart-item-details">
<div class="product-name">
${matchingProduct.name}
</div>
<div class="product-price">
${matchingProduct.getPriceCents()}
</div>
<div class="product-quantity">
<span>
Quantity:
<span class="quantity-label js-prod-quantity">
${cartItem.quantity}
</span>
<input type="number" class="quantity-input js-quantity-input" value='${
        cartItem.quantity
      }'>
</span>
<span class="update-quantity-link link-primary js-update-btn">
Update
</span>
<span class="save-quantity-link link-primary js-save">Save</span>

<span class="delete-quantity-link link-primary">
Delete
</span>
</div>
</div>

<div class="delivery-options">
<div class="delivery-options-title">
Choose a delivery option:
</div>
${deliveryOptionsHTML(matchingProduct, cartItem)}
</div>
</div>
</div>
</div>`;
      summaryHTML += html;
    });
    //console.log(summaryHTML);
    orderSummary.innerHTML = summaryHTML;

    function deliveryOptionsHTML(matchingProduct, cartItem) {
      if (!matchingProduct && !cartItem) return;
      let html = "";
      deliveryOptions.forEach((option) => {
        const deliveryDate = getDeliveryDate(option.deliveryDays);
        const priceString =
          option.priceCents === 0
            ? "FREE Shipping"
            : `$${formatCurrency(option.priceCents)} - Shipping`;
        const isChecked = option.id === cartItem.deliveryOptionId;

        html += `<div class="delivery-option">
<input type="radio" ${
          isChecked ? "checked" : ""
        } class="delivery-option-input js-option-${option.id}"
name="delivery-option-${matchingProduct.id}" data-option-id='${option.id}'>
<div>
<div class="delivery-option-date">
${deliveryDate}
</div>
<div class="delivery-option-price">
${priceString}
</div>
</div>
</div>`;
      });
      return html;
    }
  } else {
    cartIsEmpty();
  }
}

function cartIsEmpty() {
  const header = document.querySelector(".checkout-header");
  const main = document.querySelector(".main");
  const bgOverlay = document.querySelector(".cart-background-color");
  bgOverlay.classList.remove("js-hidden");
  header.style.backgroundColor = "rgb(109 116 120)";
  header.querySelector(".js-total-cart-items").style.color = "#FFEB3B";
  header.querySelector(".checkout-header-right-section").style.filter =
    "brightness(0.2)";
  if (!main) return;

  if (!cart.length) {
    main.innerHTML = `
<div class="empty-cart-image-container">
<img class="empty-cart-image" src="images/cart-is-empty.svg" alt="empty-cart">
</div>
<div class="cart-text-link-container">
<p class="empty-cart-text"> Your Amazon Cart is empty</p> 
<a class="empty-Cart-link" href="amazon.html">Go Back To Home Page</a>
</div>
`;
    main.classList.add("js-cart-is-empty");
    main.classList.remove("main");
  }
}
