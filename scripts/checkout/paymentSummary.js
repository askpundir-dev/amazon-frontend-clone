import { cart} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { findMatchingProductWithId } from "../utils/findMatchingProducts.js";
import { formatCurrency } from "../utils/money.js";
import { findMatchingOption } from "../../data/deliveryOptions.js";

const paymentSummaryElement=document.querySelector('.js-payment-summary');
export function renderPaymentSummery(){
  console.log("I am Rendered");
  let productPriceCents=0;
  let shippingPriceCents=0;
  let totalItems=0;
  cart.forEach(cartItem => {
    const matchingProduct=findMatchingProductWithId(products,cartItem.id);
    totalItems+=cartItem.quantity;

    productPriceCents+= cartItem.quantity*matchingProduct.priceCents;
   
    const deliveryOption=findMatchingOption(cartItem.deliveryOptionId);
    shippingPriceCents+=deliveryOption.priceCents;

  });
const totalBeforeTaxCents=productPriceCents+shippingPriceCents;

const tax=totalBeforeTaxCents*(10/100);

const totalCents=totalBeforeTaxCents+tax;

  const html=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="order-sumry-total-items">Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
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
    paymentSummaryElement.innerHTML=html;   

}