import {cart} from "../../OOP-data-scripts/cart-oop.js";
import products from "../../OOP-data-scripts/products-oop.js";
import { findMatchingProductWithId } from "../../../scripts/utils/findMatchingProducts.js";
import orderedProducts from "../../OOP-data-scripts/orderedProducts-oop.js";

import delivery from "../../OOP-data-scripts/deliveryOptions-oop.js";
import { formatCurrency } from "../../../scripts/utils/money.js";

const paymentSummaryElement = document.querySelector(".js-payment-summary");

export function renderPaymentSummery() {
  if (!cart.cartItems.length) return;

  console.log("I am Rendered");
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalItems = 0;
  let matchingProduct;
  cart.cartItems.forEach((cartItem) => {
    matchingProduct = findMatchingProductWithId(products, cartItem.id);
    totalItems += cartItem.quantity;

    productPriceCents += cartItem.quantity * matchingProduct.priceCents;

    const deliveryOption = delivery.findMatchingOption(
      cartItem.deliveryOptionId
    );
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  const tax = totalBeforeTaxCents * (10 / 100);
  console.log(matchingProduct);
  const totalCents = totalBeforeTaxCents + tax;
  paymentSummaryElement.innerHTML = `<div class="payment-summary-title">
Order Summary
</div>

<div class="payment-summary-row">
<div class="order-sumry-total-items">Items (${totalItems}):</div>
<div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
</div>

<div class="payment-summary-row">
<div>Shipping &amp; handling:</div>
<div class="payment-summary-money">
$${formatCurrency(shippingPriceCents)}</div>
</div>

<div class="payment-summary-row subtotal-row">
<div>Total before tax:</div>
<div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
</div>

<div class="payment-summary-row">
<div>Estimated tax (10%):</div>
<div class="payment-summary-money">$${formatCurrency(tax)}</div>
</div>

<div class="payment-summary-row total-row">
<div>Order total:</div>
<div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
</div>

<button class="place-order-button button-primary">
Place your order
</button>`;

  const placeOrderBtn = paymentSummaryElement.querySelector(
    ".place-order-button"
  );
  placeOrderBtn.onclick = () => {
    console.log("order-placed");
    orderedProducts.placeYourOrder(totalCents);
    console.log(orderedProducts);
    setTimeout(() => (window.location.href = "orders.html"), 100);
  };
}