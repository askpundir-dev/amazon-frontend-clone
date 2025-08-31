import { products } from "../data/products.js";
import { addToCart, saveToStorage, getCartTotal } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import {searchProduct} from "../data/searchedProducts.js";
const productGrid = document.querySelector(".products-grid");
// console.log(productGrid);


//RENDERING ALL PRODUCTS WE HAVE WITH THIS FUNCTION CALL
renderUi(products);

export const main=document.querySelector(".main");
 const searchBar = document.querySelector(".search-bar");
export const focusThemeDiv = document.querySelector(".bar-focus");
console.log(searchBar, focusThemeDiv);

//ADDING FOCUS THEME WHEN CLICKING ON SearchBar AND REMOVING WHEN CLICKING ANYWHERE OUTSIDE IT
document.addEventListener("click", (event) => {
  if (event.target.closest(".search-bar")) {
    focusThemeDiv.classList.add("active");
  } else {
    focusThemeDiv.classList.remove("active");
  }

  if(event.target.closest(".search-button")){
//  const searchBtn=event.target;
//  console.log(searchBtn);
//  console.log("hello");
 searchProduct({searchBar,productGrid,renderUi});
 searchBar.blur();
  }
});

//ADDING A KEYDOWN EVENT ON SEARCHBAR SO I CAN SEARCH BY PRESSING ENTER KEY
searchBar.addEventListener("keydown",(e)=>{
if(e.key==="Enter"){
// console.log(e); 
  e.preventDefault();
 
  searchProduct({searchBar,productGrid,renderUi});
  focusThemeDiv.classList.remove("active"); //REMOVES SEARCHBAR FOCUS THEME WHEN I PRESS ENTER AFTER TYPING PRODUCT NAME
    searchBar.blur();
}
});

document.addEventListener("scroll", () => {
  
  //REMOVING FOCUS THEME WHEN SCROLLING PAGE
  focusThemeDiv.classList.remove("active");

  //REMOVES IMAGE FROM FULL SCREEN VIEW WHEN I SCROLL
  const overlay = document.querySelector(".image-background");
  if (overlay) overlay.remove();
});



//TO DISPLAY Added MESSAGE WHEN CLICKING ADD TO CART BUTTON
const addToCartMsgTimeouts = {};
function showAddToCartMessage(productId){
//CLEARING PREVIOUS TIMEOUT
  clearTimeout(addToCartMsgTimeouts[productId]);

  const messageContainer = productGrid.querySelector(
    `div[data-message-id="${productId}"]`
  );
  // console.log(messageContainer);
 if (!messageContainer) return;

  messageContainer.classList.add("display-message");
 
  addToCartMsgTimeouts[productId]  = setTimeout(() => {
    messageContainer.classList.remove("display-message");
  }, 1200);
  console.log(addToCartMsgTimeouts);
}

productGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-button")) {
    //const btn = e.target; //CAN DO LIKE THIS 
    // const productId =  btn.dataset.productId;
   
    //OR LIKE THIS NO NEED OF EXTRA VARIABLE
    const productId=e.target.dataset.productId;
    const productSelectorEle=productGrid.querySelector(`.js-product-selector-${productId}`)
    const isAdded=addToCart(productId,productSelectorEle.value);
    console.log(isAdded);
    if(isAdded) productSelectorEle.value=1;
    showAddToCartMessage(productId);
    showTotalCartQuantity();
  }
  else if(e.target.classList.contains("product-image")){
    openImageFullView(e.target.dataset.imageId);
    
   }
});


function openImageFullView(imageId) {
  const image = productGrid.querySelector(`img[data-image-id="${imageId}"]`);
  if (!image) return;

  // clone the image so we don't mess with the original
  const clonedImage = image.cloneNode(true);
  clonedImage.classList.add("js-image-full-view");

  const overlay = document.createElement("div");
  overlay.classList.add("image-background");
  overlay.innerHTML = `
    <div class="product-pic-container"></div>
  `;

  overlay.querySelector(".product-pic-container").appendChild(clonedImage);

  // Close when clicking outside
  overlay.addEventListener("click", (e) =>{
    if(!e.target.dataset.imageId)
    overlay.remove()
  } );
  main.after(overlay);
}

function showCartQuantity(){
  const cartQuantityIcon=document.querySelector('.cart-quantity');
  cartQuantityIcon.textContent=getCartTotal('quantity');
}
showCartQuantity()
saveToStorage();


 function renderUi(array){
  // if(array.length){}
  productGrid.classList.remove('is-empty');
  let productHTML="";
array.forEach(product=>{
  const html=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}" alt="${product.name}" data-image-id=${product.id}>
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${
                product.rating.stars * 10
              }.png" alt="${product.rating.stars}">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select name="prod-quantity" class="js-product-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart" data-message-id="${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
        productHTML+=html;
});
productGrid.innerHTML=productHTML;
}



    
   

