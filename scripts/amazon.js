import { products } from "../data/products.js";
import {cart, addToCart, saveCart} from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
const productGrid = document.querySelector(".products-grid");
// console.log(productGrid);
//  localStorage.removeItem("cart");

//let cart = JSON.parse(localStorage.getItem("cart")) || [];

//RENDERING ALL PRODUCTS WE HAVE WITH THIS FUNCTION CALL
renderUi(products);
const main=document.querySelector(".main");
const searchBar = document.querySelector(".search-bar");
const focusThemeDiv = document.querySelector(".bar-focus");
// console.log(header);

//ADDING FOCUS THEME WHEN CLICKING ON SearchBar AND REMOVING WHEN CLICKING ANYWHERE OUTSIDE IT
document.addEventListener("click", (event) => {
  if (event.target.closest(".search-bar")) {
    focusThemeDiv.classList.add("search-bar-focus-theme");
  } else {
    focusThemeDiv.classList.remove("search-bar-focus-theme");
  }

  if(event.target.closest(".search-button")){
//  const searchBtn=event.target;
//  console.log(searchBtn);
//  console.log("hello");
 searchProduct();
  }
});

//ADDING A KEYDOWN EVENT ON SEARCHBAR SO I CAN SEARCH BY PRESSING ENTER KEY
searchBar.addEventListener("keydown",(e)=>{
if(e.key==="Enter"){
// console.log(e); 
  e.preventDefault();
 
  searchProduct();
  focusThemeDiv.classList.remove("search-bar-focus-theme"); //REMOVES SEARCHBAR FOCUS THEME WHEN I PRESS ENTER AFTER TYPING PRODUCT NAME
    
}
});

document.addEventListener("scroll", () => {
  
  //REMOVING FOCUS THEME WHEN SCROLLING PAGE
  focusThemeDiv.classList.remove("search-bar-focus-theme");

  //REMOVES IMAGE FROM FULL SCREEN VIEW WHEN I SCROLL
  const overlay = document.querySelector(".image-background");
  if (overlay) overlay.remove();
});


productGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-button")) {
    //const btn = e.target; //CAN DO LIKE THIS 
    // const productId =  btn.dataset.productId;
   
    //OR LIKE THIS NO NEED OF EXTRA VARIABLE
    const productId=e.target.dataset.productId;
    // console.log(productId);
  
    addToCart(productId);
    updateCartQuantity();
  }
  else if(e.target.classList.contains("product-image")){
    openImageFullView(e.target.dataset.imageId);
    
   }
});


function openImageFullView(imageId) {
  const image = document.querySelector(`img[data-image-id="${imageId}"]`);
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

const cartQuantityDiv = document.querySelector(".js-cart-quantity");
// console.log(cartQuantityDiv);

function updateCartQuantity() {
  //WAY 1:
  // let cartQuantity = 0;
  // cart.forEach((item) => (cartQuantity += item.quantity));
  // // console.log(cartQuantity);
  // cartQuantityDiv.innerHTML = cartQuantity;
  
  //WAY 2:
cartQuantityDiv.innerHTML=cart.reduce((acc,curItem)=>acc+=curItem.quantity,0);

}

updateCartQuantity();
saveCart();




function searchProduct(){
   const searchProductArray=[];
  let value=searchBar.value.trim().toLowerCase();
//  console.log(value);

  //USING for LOOP
/*
  for(let i=0;i<products.length;i++){
    // console.log(products);
    for(let j=0;j<products[i].keywords.length;j++){
        console.log(products[i].keywords);
      }
    }
*/

//USING array.forEach() 
products.forEach(product=>{
  // console.log(product);
  // console.log(product.keywords);

  product.keywords.forEach(keyword=>{
//  console.log(keyword);

 if(keyword.toLowerCase().trim().includes(value)){  
  // console.log(keyword);
  // console.log(product);

  //FIND IF PRODUCT ALREADY IN ARRAY SO THAT WE  DON'T DISPLAY SINGLE PRODUCT MULTIPLE TIMES 
  
  //FIRST WAY USING array.find() TO CHECK IF PRODUCT IS ALREADY PRESENT AND ONLY PUSH WHEN NOT PRESENT
  // const productPresent=searchProductArray.find(prod=> prod===product);
  // console.log(productPresent);
  // if(!productPresent)  searchProductArray.push(product);

  //SECOND WAY TO DIRECTLY CHECK ARRAY USING array.includes(product) AND PUSH ONLY WHEN PRODUCT IS NOT PRESENT 
  if(!searchProductArray.includes(product)) searchProductArray.push(product);    
}
});
});

// console.log(searchProductArray);
if(searchProductArray.length)  renderUi(searchProductArray);
  
else {
  productGrid.classList.add('is-empty');
  productGrid.innerHTML = `
    <div class="no-results">
      <img src="/images/no-results.jpg" alt="No results" class="no-results-img">
      <p class="no-results-text">Sorry, we don't have this product in our inventory yet.</p>
      <button class="no-results-btn">Go back to all products</button>
    </div>
  `;
  document.querySelector(".no-results-btn").addEventListener("click", () => {
    renderUi(products); // restore all products
  });
}
searchBar.value="";
}

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



    
   

