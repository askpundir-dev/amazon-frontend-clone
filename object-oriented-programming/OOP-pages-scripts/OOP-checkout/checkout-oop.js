import { cart } from "../../OOP-data-scripts/cart-oop.js";

import { getDeliveryDate } from "../../../scripts/utils/deliveryTime.js";

import { deliveryOptions } from "../../../data/deliveryOptions.js";
import {
  getDOM,
  selectors,
  query,
} from "../../../scripts/utils/domSelectors.js";

import { findMatchingProductWithId } from "../../../scripts/utils/findMatchingProducts.js";

import { renderPaymentSummery } from "./paymentSummary-oop.js";
import { renderCartProducts } from "./renderCartProducts-oop.js";

const orderSummary = document.querySelector(".js-order-summary");
console.log(orderSummary);

const domElements = getDOM(selectors);
function showTotalCheckoutQuantity() {
  const itemsQuantity = cart.getCartTotal("quantity");

  domElements.checkOut.innerHTML = `${itemsQuantity} items`;
  console.log(domElements);

  cart.saveToStorage();
}

renderCartProducts(orderSummary);
renderPaymentSummery();
showTotalCheckoutQuantity();

function showDeliveryDateOfEachOption(matchedOptionObj, id) {
  console.log(matchedOptionObj);
  orderSummary.querySelector(
    `.js-date-div-${id}`
  ).innerText = `Delivery date: ${getDeliveryDate(
    matchedOptionObj.deliveryDays
  )}`;
  console.log(orderSummary.querySelector(`.js-date-div-${id}`));
}

function removeProductContainer(productId) {
  document.querySelector(`.js-remove-from-cart-${productId}`).remove();
}

function modifyUpdateBtn({ id, updateBtn, saveBtn }) {
  const els = query(id);
  console.log(els);
  if (!els) return;
  //DISPLAY INPUT-FIELD AND SAVE BUTTON
  els.input.classList.add("js-display-save-and-input");
  saveBtn.classList.add("js-display-save-and-input");

  //HIDE QUANTITYLABEL AND UPDATE BUTTON
  els.quantityLabel.classList.add("js-hidden");
  updateBtn.classList.add("js-hidden");
}

function saveUpdatedQuantity(productId, updateBtn, saveBtn) {
  const els = query(productId);
  if (!els) return;

  const matchingProduct = findMatchingProductWithId(cart.cartItems, productId);
  const inputValue = parseInt(els.input.value.trim(), 10);

  if (inputValue < 0 || Number.isNaN(inputValue)) {
    els.input.focus();
    console.warn("Invalid Value!");
    return;
  }

  if (inputValue === matchingProduct.quantity) {
    console.log("Quantity unchanged");
    hideSave$input({ els, updateBtn, saveBtn });
    return;
  }

  matchingProduct.quantity = inputValue;

  if (matchingProduct.quantity === 0) {
    cart.deleteFromCart(productId);
    removeProductContainer(productId);
    showTotalCheckoutQuantity();
    renderPaymentSummery();
    return;
  }

  els.quantityLabel.innerText = matchingProduct.quantity;
  hideSave$input({ els, updateBtn, saveBtn });

  showTotalCheckoutQuantity();
  renderPaymentSummery();
}
function hideSave$input({ els, updateBtn, saveBtn }) {
  // Hide save & input
  saveBtn.classList.remove("js-display-save-and-input");
  els.input.classList.remove("js-display-save-and-input");

  // Show update & label
  updateBtn.classList.remove("js-hidden");
  els.quantityLabel.classList.remove("js-hidden");
}
console.log(cart);
renderPaymentSummery();

orderSummary.addEventListener("click", (e) => {
  // Always climb to the product container
  const container = e.target.closest("div[data-product-container-id]");
  // console.log(container);
  if (!container) return; // not a product click

  const id = container.dataset.productContainerId;

  const updateBtn = container.querySelector(".js-update-btn");
  const saveBtn = container.querySelector(".js-save");
  const deleteBtn = e.target.closest(".delete-quantity-link");

  if (e.target === updateBtn) {
    console.log("Update clicked:", id, updateBtn);
    modifyUpdateBtn({ id, updateBtn, container, saveBtn });
  }

  if (e.target.closest(`.js-save`)) {
    console.log("Save clicked:", id, saveBtn);
    saveUpdatedQuantity(id, updateBtn, saveBtn);
     if (!cart.cartItems.length) renderCartProducts();
  } else if (deleteBtn) {
    console.log("Delete clicked:", id);
    cart.deleteFromCart(id);
    removeProductContainer(id);
    showTotalCheckoutQuantity();
    renderPaymentSummery();
    if (!cart.cartItems.length) renderCartProducts();
  }

  if (e.target.closest(`input[name='delivery-option-${id}'`)) {
    const deliveryOptionId = e.target.dataset.optionId;
    const matchedOptionObj = deliveryOptions.find(
      (option) => option.id === deliveryOptionId
    );
    cart.updateDeliveryOptionId(id, deliveryOptionId);
    showDeliveryDateOfEachOption(matchedOptionObj, id);
    renderPaymentSummery();
  }
});
