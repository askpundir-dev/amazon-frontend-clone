let str="sdha2";
if(typeof str==="string"){
  console.log(str);
}

let num="1";

console.log(typeof num);
if(typeof num==="number"){
  console.log("i m number");
}
console.log(typeof str);
console.log("ew bro");

let str2="are2";
let value=parseInt(str2);
console.log(typeof NaN);
if(/[0-9]/.test(str)){
  console.log(str);
}







orderSummary.addEventListener("click", (e) => {
  // Always climb to the product container
  const container = e.target.closest("[data-product-container-id]");
  if (!container) return; // not a product click

  const id = container.dataset.productContainerId;
  // const matchingProduct = products.find(product => product.id === id);
// console.log(matchingProduct);

  // Check if clicked on update button (or inside it)
  const updateBtn = e.target.closest(".js-update-btn");
  const deleteBtn=e.target.closest(".delete-quantity-link");
  if (updateBtn) {
    console.log("hello, update button clicked:", updateBtn);
    updateCart(id);

  }
  else if(deleteBtn){
    console.log("hello deleted",deleteBtn);
    deleteFromCart(id);
    showTotalCartQuantity();
  }
  if(e.target.closest(`.js-save-id-${id}`)){
     saveUpdatedQuantity(id);
  }
});


function updateCart(productId){
if(!productId) return;

  cart.forEach(item=>{
    if(item.id===productId){
     
   query(productId);
     
   
      
    }
  });
}

function query(productId){
    if (!productId) return;

const container = document.querySelector(`.js-remove-from-cart-${productId}`);
console.log(container);
if (!container) return;

  const quantityLabel = container.querySelector(".js-prod-quantity");
  const input = container.querySelector(".js-unique");
  const saveBtn = container.querySelector(".js-save-btn");
   quantityLabel.classList.add("js-display-save-and-input");
    saveBtn.classList.add("js-display-save-and-input");
}


function saveUpdatedQuantity(productId) {
  if (!productId) return;

const container = document.querySelector(`.js-remove-from-cart-${productId}`);
console.log(container);
if (!container) return;

  const quantityLabel = container.querySelector(".js-prod-quantity");
  const input = container.querySelector(".js-unique");
  const saveBtn = container.querySelector(".js-save-btn");

  if (input.value === "") {
    input.focus();
    return;
  }

  const updateValue = parseInt(input.value.trim(), 10);
  input.value = "";

  if (!updateValue) return;

  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += updateValue;
    quantityLabel.textContent = item.quantity;

    if (item.quantity <= 0) {
      deleteFromCart(productId);
    }
  }

  showTotalCartQuantity();

  input.classList.remove("js-display-save-and-input");
  saveBtn.classList.remove("js-display-save-and-input");
}


// OPTIMIZED WAY TO USE QUERYSELECTOR 
//USING OBJECTS

const dom = document;

// all your selectors in one place
const selectors = {
  logo: ".amazon-logo",
  cartButton: ".js-cart-btn",
  searchInput: ".js-search",
  productList: ".js-product-list"
};

// auto-build a dom object
const domElements = Object.fromEntries(
  Object.entries(selectors).map(([key, selector]) => [key, dom.querySelector(selector)])
);

console.log(domElements.logo);        // <img class="amazon-logo" ...>
console.log(domElements.searchInput); // <input class="js-search" ...>



// even better with helper function
const selectors = {
  logo: ".amazon-logo",
  cartButton: ".js-cart-btn",
  searchInput: ".js-search",
  productList: ".js-product-list",
  productCards: ".js-product-card"
};

function getDOM(selectors) {  
  return Object.fromEntries(
    Object.entries(selectors).map(([key, selector]) => {
      const element = document.querySelectorAll(selector);
      // if only one element, return it directly instead of NodeList
      return [key, element.length === 1 ? element[0] : element];
    })
  );
}

const domElements = getDOM(selectors);

console.log(domElements.logo);        // <img class="amazon-logo">
console.log(domElements.searchInput); // <input>
console.log(domElements.productCards); // NodeList of all product cards

//MORE OPTIMIZED 

Step 1: Define selectors in one place
// domSelectors.js
const domSelectors = {
  logo: ".amazon-logo",
  search: ".js-search",
  products: ".js-product-card",
  cartBtn: ".js-cart-btn",
  cartCount: ".js-cart-count"
};

export default domSelectors;



⚡ Step 2: Build a DOM Manager
// domManager.js
import domSelectors from "./domSelectors.js";

const DOM = (() => {
  const cache = {};

  function init() {
    Object.entries(domSelectors).forEach(([key, selector]) => {
      const elements = document.querySelectorAll(selector);
      cache[key] = elements.length === 1 ? elements[0] : elements;
    });
  }

  function get(name) {
    return cache[name];
  }

  return {
    init,
    get
  };
})();

export default DOM;

⚡ Step 3: Use it in your app
// app.js
import DOM from "./domManager.js";

document.addEventListener("DOMContentLoaded", () => {
  DOM.init(); // load all elements once

  // now you can access them anywhere
  DOM.get("logo").src = "newLogo.png";
  DOM.get("search").placeholder = "Search Amazon...";

  DOM.get("cartBtn").addEventListener("click", () => {
    console.log("Cart button clicked!");
  });

  console.log(DOM.get("products")); // NodeList of product cards
});


//if queryselector returns null 
//issues:
1. Element not loaded yet
If your script runs in <head> or before the DOM is rendered, querySelector won’t find anything.
✅ Fix: Wrap it in DOMContentLoaded or put your script at the end of <body>:

document.addEventListener("DOMContentLoaded", () => {
  const body = {
    container: document.querySelector('.js-remove-from-cart-dd82ca78-a18b-4e2a-9250-31e67412f98d'),
  };
  console.log(body.container);
});

2. Selector doesn’t match
Make sure the class name is exactly the same in HTML. Even a small typo will return null.

// important
3. Dynamic elements
If you are creating the element later with innerHTML or via JS, then at the time of querySelector it doesn’t exist.
✅ Fix: Select it after you insert it or use event delegation.


function saveUpdatedQuantity(productId, elements) {
  if (!productId) return;

  const { quantityLabel, input, saveBtn } = elements;

  if (input.value === "") {
    input.focus();
    return;
  }

  const updateValue = parseInt(input.value.trim(), 10);
  input.value = "";

  // Ignore NaN or zero
  if (!updateValue) return;

  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += updateValue;
    quantityLabel.textContent = item.quantity;

    if (item.quantity <= 0) {
      deleteFromCart(productId);
    }
  }

  showTotalCartQuantity();

  // Hide save & input UI
  input.classList.remove("js-display-save-and-input");
  saveBtn.classList.remove("js-display-save-and-input");
}


const elements = {
  quantityLabel: document.querySelector(`.js-prod-quantity${productId}`),
  input: document.querySelector(`.js-unique-${productId}`),
  saveBtn: document.querySelector(`.js-save-id-${productId}`)
};

saveUpdatedQuantity(productId, elements);
