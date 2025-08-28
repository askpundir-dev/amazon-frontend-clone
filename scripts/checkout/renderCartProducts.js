import { cart } from "../../data/cart.js";
import { findMatchingProduct } from "../utils/findMatchingProducts.js";
import { products } from "../../data/products.js";
import { findMatchingOption, deliveryOptions } from "../../data/deliveryOptions.js";
import { getDeliveryDate } from "../utils/deliveryTime.js";
import { formatCurrency } from "../utils/money.js";

export function renderCartProducts(orderSummary){

let summaryHTML="";

cart.forEach((cartItem) => {

  // console.log(cartItem.id);
  //USING ARRAY.FIND() TO COMPARE THE cartItem.id with product.id
//  let matchingProduct=products.find(product=>product.id===cartItem.id);

 //CREATED A FUNCTION FOR FINDING MATCHING ITEMS BECAUSE THIS CODE IS REPEATED MULTIPLE TIMES
  let matchingProduct=findMatchingProduct(products,cartItem);

 //OR USING forEach() WE CAN DO THIS WAY 
// let matchingProduct;
// products.forEach(product=>{
//   if(product.id===cartItem.id){
//     console.log(product);
//     console.log(product.id);
//     matchingProduct= product;
//   }
//   });

// console.log(matchingProduct);
const deliveryOptionId=cartItem.deliveryOptionId;
const deliveryOption=findMatchingOption(deliveryOptionId);
const html=` <div class="cart-item-container js-remove-from-cart-${matchingProduct.id}" data-product-container-id="${matchingProduct.id}">
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
                 $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity:
                    <span class="quantity-label js-prod-quantity">
                    ${cartItem.quantity}
                    </span>
                    <input type="number" class="quantity-input js-quantity-input" value='${cartItem.quantity}'>
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
                     ${deliveryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
        </div>`;
        summaryHTML+=html;
      
});
//console.log(summaryHTML);
orderSummary.innerHTML=summaryHTML;

function deliveryOptionsHTML(matchingProduct,cartItem){

  if(!matchingProduct&&!cartItem) return;
  let html='';
  deliveryOptions.forEach(option=>{
  const deliveryDate=getDeliveryDate(option.deliveryDays);
  const priceString=option.priceCents===0?
  'FREE Shipping':
  `$${formatCurrency(option.priceCents)} - Shipping`;
  const isChecked=option.id===cartItem.deliveryOptionId;
  // console.log(priceString);
  // const someHtml=`${option.priceCents===0?'Free Shipping':'$'+formatCurrency(option.priceCents)+' - Shipping'}`
  // console.log(someHtml);
            html+=`<div class="delivery-option">
                              <input type="radio" ${isChecked?'checked':''} class="delivery-option-input js-option-${option.id}"
                                name="delivery-option-${matchingProduct.id}" data-option-id='${option.id}'>
                              <div>
                                <div class="delivery-option-date">
                                  ${deliveryDate}
                                </div>
                                <div class="delivery-option-price">
                                ${priceString}
                                </div>
                              </div>
                            </div>`
  });
  return html;
}
}