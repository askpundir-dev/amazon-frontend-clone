// import { orderedProducts } from "../../data/orderedProducts.js";
import { orderedProducts } from "../checkout/paymentSummary.js";
import { getDeliveryDate } from "../utils/deliveryTime.js";
import { formatCurrency } from "../utils/money.js";
import { getCartTotal, addToCart } from "../../data/cart.js";
import { findMatchingProduct } from "../utils/findMatchingProducts.js";
import { products } from "../../data/products.js";
import { findMatchingOption } from "../../data/deliveryOptions.js";
console.log(getDeliveryDate());

// console.log(orderedProducts);
const main=document.querySelector('.main');

// console.log(main);
const ordersGrid=main.querySelector('.orders-grid');
// console.log(ordersGrid);

function renderOrderedProducts() {
  // sort newest first by orderPlacedDate
  const sortedOrders = [...orderedProducts].sort((a, b) => b.orderTimestamp - a.orderTimestamp);

  if (sortedOrders.length === 0) {
    main.innerHTML = `
    <div class="no-orders-container">
      <h2>You haven’t placed any orders yet</h2>
      <p>No previous orders found.</p>
      <a href="amazon.html" class="no-orders-btn">View Products</a>
    </div>
  `;
    return; 
  }

  let ordersGridHTML = '';
  sortedOrders.forEach(order => {
    const html = `
      <div class="order-container" data-order-id='${order.orderId}'>
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderPlacedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.orderTotalPrice)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${orderDetailsHTML(order)}
        </div>
      </div>`;
    
    ordersGridHTML += html;
  });

  ordersGrid.innerHTML = ordersGridHTML;
}



const cartQuantityIcon=document.querySelector('.cart-quantity');
function showCartQuantity(){
  cartQuantityIcon.textContent=getCartTotal('quantity');
}



function orderDetailsHTML(order){
let orderDetailsGridHTML=''
order.ordered.forEach(product=>{
  console.log(product);
  const matchingProduct=findMatchingProduct(products,product);
  const matchedOption=findMatchingOption(product.deliveryOptionId);
  const arrivalDate=getDeliveryDate(matchedOption.deliveryDays);
  // console.log(arrivalDate);

  // console.log(matchedOption);
  // console.log(matchingProduct);
orderDetailsGridHTML+=` 
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
               ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivalDate}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary" data-buy-again-id='${matchingProduct.id}'>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html"> 
                <button class="track-package-button button-secondary" data-track-package-id=${matchingProduct.id}>
                  Track package
                </button>
              </a>
            </div>
          `;
});
return orderDetailsGridHTML;
}

renderOrderedProducts();
showCartQuantity();


ordersGrid.addEventListener('click',(e)=>{
  console.log('heyy');
  const container=e.target.closest('.order-container');
  console.log(container);
  if(!container) return null;
  const orderId=container.dataset.orderId;
  console.log(orderId);
 
  const buyItAgainBtn=e.target.closest('.buy-again-button');
  const trackPackageBtn=e.target.closest('.track-package-button');
  if(buyItAgainBtn){
  const productId=buyItAgainBtn.dataset.buyAgainId
  console.log(buyItAgainBtn);
  console.log(productId);
    addToCart(productId);
    showCartQuantity()
  }
  if(trackPackageBtn){
   console.log('hello');
   console.log(e.target);
   const packageId= trackPackageBtn.dataset.trackPackageId;
   trackPackaging(packageId);
  }
});


// function trackPackaging(packageId) {
//   // localStorage.removeItem('trackedPackage');
//   let trackPackage = [];

//   orderedProducts.forEach(order => {
//     order.ordered.forEach(product => {
//       if (product.id === packageId) {
//         trackPackage.push(product);
//       }
//     });
//   });

//   // overwrites old data with new one
//   console.log(trackPackage);
//   localStorage.setItem('trackedPackage', JSON.stringify(trackPackage));
// }

function trackPackaging(packageId) {
  let trackPackage = null; // store single product

  for (const order of orderedProducts) {
    for (const product of order.ordered) {
      if (product.id === packageId) {
        const placedTime = Date.now();
        const deliveryDays = product.deliveryDays || 5;
        const halfDelivery = placedTime + (deliveryDays * 24 * 60 * 60 * 1000) / 2;
        const deliveryTime = placedTime + deliveryDays * 24 * 60 * 60 * 1000;

        trackPackage = {
          ...product,
          statusTimestamps: {
            preparing: placedTime,
            shipped: halfDelivery,
            delivered: deliveryTime
          }
        };

        break; // exit inner loop
      }
    }
    if (trackPackage) break; // exit outer loop if found
  }

  if (trackPackage) {
    console.log(trackPackage);
    localStorage.setItem('trackedPackage', JSON.stringify(trackPackage));
  }
}


document.querySelector('.search-button').onclick=()=>{
  window.location.href='amazon.html';
}
