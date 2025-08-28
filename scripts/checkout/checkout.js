import { cart, deleteFromCart,getCartTotal, updateDeliveryOptionId, saveToStorage } from "../../data/cart.js";
import { getDeliveryDate } from "../utils/deliveryTime.js";
import { deliveryOptions} from "../../data/deliveryOptions.js";
import { getDOM, selectors, query } from "../utils/domSelectors.js";
import {findMatchingProductWithId } from "../utils/findMatchingProducts.js";
import { renderPaymentSummery } from "./paymentSummary.js";
import { renderCartProducts } from "./renderCartProducts.js";
//THIS IS HOW WE LOAD EXTERNAL LIBRARIES IN OUR SCRIPT USING MODULES
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Example usage:
// console.log(dayjs());


// console.log(cart);

const orderSummary=document.querySelector(".js-order-summary");
console.log(orderSummary);



// USNING FUNCTION getDOM FOR QUERING THE DOM
// calling this function when code runs for the first time-- 
//--because these selectors are not unique and they wont change in our program further
//--MORE SIMPLE UNDERSTANDING IS THEY ARE STATIC ELEMENTS EXAMPLE:HEADER,MAIN,HEADER-LOGO,SEARCHBAR,ETC


const domElements = getDOM(selectors);
function  showTotalCheckoutQuantity(){
  const itemsQuantity=getCartTotal('quantity')
// console.log(total);
//SHOWS TOTAL ITEMS AT THE TOP OF THE SCREEN 
domElements.checkOut.innerHTML=`${itemsQuantity} items`;
console.log(domElements);
//SHOWS TOTAL ITEMS IN ORDER SUMMARY
document.querySelector('.order-sumry-total-items').innerHTML=`Items (${itemsQuantity}):`
saveToStorage();
}

renderCartProducts(orderSummary);
renderPaymentSummery();
showTotalCheckoutQuantity();

function showDeliveryDateOfEachOption(matchedOptionObj,id){
 console.log(matchedOptionObj);
 orderSummary.querySelector(`.js-date-div-${id}`).innerText=`Delivery date: ${getDeliveryDate(matchedOptionObj.deliveryDays)}`
 console.log( orderSummary.querySelector(`.js-date-div-${id}`));
}

function removeProductContainer(productId){
   document.querySelector(`.js-remove-from-cart-${productId}`).remove();
}


 function modifyUpdateBtn({id, updateBtn, saveBtn}) {
  const els = query(id);
  console.log(els);
  if (!els) return;
//DISPLAY INPUT-FIELD AND SAVE BUTTON
  els.input.classList.add("js-display-save-and-input");
  saveBtn.classList.add('js-display-save-and-input');
  
  //HIDE QUANTITYLABEL AND UPDATE BUTTON
  els.quantityLabel.classList.add('js-hidden');
  updateBtn.classList.add('js-hidden');
}


 function saveUpdatedQuantity(productId, updateBtn, saveBtn) {
  const els = query(productId);
  if (!els) return;

  const matchingProduct = findMatchingProductWithId(cart, productId);
  const inputValue = parseInt(els.input.value.trim(), 10);

  if (inputValue < 0 || Number.isNaN(inputValue)) {
    els.input.focus();
    console.warn("Invalid Value!");
    return;
  }

  if (inputValue === matchingProduct.quantity) {
    console.log("Quantity unchanged");
hideSave$input({els,updateBtn,saveBtn})
    return;
  }

  matchingProduct.quantity = inputValue;

  if (matchingProduct.quantity === 0) {
    deleteFromCart(productId);
    removeProductContainer(productId);
    showTotalCheckoutQuantity();
    renderPaymentSummery();
    return;
  }

  els.quantityLabel.innerText = matchingProduct.quantity;
hideSave$input({els,updateBtn,saveBtn})


  showTotalCheckoutQuantity();
  renderPaymentSummery();
}
function hideSave$input({els,updateBtn,saveBtn}){

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
  const saveBtn   = container.querySelector(".js-save");
  const deleteBtn = e.target.closest(".delete-quantity-link");
  //IF ELEMENT SELECTED THROUGH QUERYSELECTOR WE CAN TARGET IT LIKE THIS 
  //BUT IT WONT TARGET ANY CHILD OF UPDATE BUTTON
 
  //--UPDATE--
  if (e.target===updateBtn) {
    console.log("Update clicked:", id, updateBtn);
    modifyUpdateBtn({ id, updateBtn, container, saveBtn });
  }
  //TARGETING THIS WAY GIVES ACCESS TO CLICK ANY CHILD INSIDE saveBtn 
 
  // --SAVE--
  if(e.target.closest(`.js-save`)){
    console.log("Save clicked:", id, saveBtn);
    saveUpdatedQuantity(id, updateBtn, saveBtn);  
  }

  //I TARGETED DELETE BUTTON USING e.target.closest()
  //SO I CAN WRITE SIMPLY deleteBtn IN CONDITION TO 
  //CHECK IF IT WAS CLICKED
 
  //  --DELETE--
  else if(deleteBtn){
   console.log("Delete clicked:", id);
    deleteFromCart(id);
    removeProductContainer(id);
    showTotalCheckoutQuantity();
    renderPaymentSummery();
  }
  
  if(e.target.closest(`input[name='delivery-option-${id}'`)){
const deliveryOptionId=e.target.dataset.optionId; const matchedOptionObj= deliveryOptions.find(option=>option.id===deliveryOptionId);
 updateDeliveryOptionId(id,deliveryOptionId);
 showDeliveryDateOfEachOption(matchedOptionObj,id);
  renderPaymentSummery();
  }
});