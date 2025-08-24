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


