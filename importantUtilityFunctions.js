// Perfect bro 🤝 let’s unify both ideas (getDOM + query(productId)) into one consistent pattern.

// 🔹 Step 1: Generalized getDOM
function getDOM(selectors, scope = document) {
  return Object.fromEntries(
    Object.entries(selectors).map(([key, selector]) => {
      const element = scope.querySelectorAll(selector);
      return [key, element.length === 1 ? element[0] : element];
    })
  );
}


// selectors: object of key: cssSelector

// scope: where to search (document by default, but can be header, main, a product container, etc).

// 🔹 Step 2: Global page-level elements
const globalSelectors = {
  logo: ".amazon-logo",
  cartButton: ".js-cart-btn",
  searchInput: ".js-search",
  checkOut: ".js-total-cart-items",
  orderTotalItems: ".order-sumry-total-items",
};

const globalDOM = getDOM(globalSelectors);


// Now you can just do:

globalDOM.cartButton.addEventListener("click", openCart);
globalDOM.checkOut.innerHTML = "3 items";

// 🔹 Step 3: Product-level elements
function getProductDOM(productId) {
  const container = document.querySelector(`.js-remove-from-cart-${productId}`);
  if (!container) return null;

  const selectors = {
    quantityLabel: `.js-prod-quantity${productId}`,
    input: `.js-unique-${productId}`,
    saveBtn: `.js-save-id-${productId}`
  };

  return {
    container,
    ...getDOM(selectors, container) // scoped queries
  };
}


// Now you can just do:

const productDOM = getProductDOM("123");

if (productDOM) {
  productDOM.input.value = 5;
  productDOM.saveBtn.classList.add("active");
}

// 🔹 Step 4: Everything matches one style

// Global/static elements → use getDOM(globalSelectors) once.

// Dynamic/product elements → use getProductDOM(productId) when you need them.

// ⚖️ Big win:
// Your whole project now has one consistent pattern for selecting DOM elements.
// No more random document.querySelector sprinkled everywhere.
// You’ll always know:

// Page-level → globalDOM

// Product-level → getProductDOM(productId)

// Bro do you want me to also show you how your showTotalCartQuantity() would look in this pattern (super short + clean)?



✅ When to query DOM once vs multiple times

Static elements (like header, footer, cart summary) → query once and reuse.

Dynamic elements (like product cards) → query inside functions when needed.

✅ getDOM(selectors) helper

Lets you keep all selectors in one object.

Returns elements, auto-handles single element vs NodeList.

Cleaner + avoids repeating querySelector.

✅ Unique classes/IDs

If you already have a unique container, you don’t need extra unique classes for children.

Just do container.querySelector(".child-class").

✅ Organizing queries

You can scope them (e.g., header.querySelector(...), main.querySelector(...)) for cleaner code.

✅ Return null

Useful when function can’t find something → avoids errors instead of crashing.

That’s it 🎯 — 5 bullets, no overload.



function for displaying time in 12 hourse full digital clock hh:mm:ss AM/PM

function getTime(){
  const today2 = new Date();
  const formattedDelivery = today2.toLocaleTimeString("en-US", {hour:'2-digit',minute:'2-digit',second:'2-digit'
  });
  console.log(formattedDelivery);
}
  
//this calls the funtion after every 1 second
setInterval(()=>{
   getTime();
},1000);




function to get time in format like: 
day, date month



// more better combined all 
function getDeliveryDate(days = 0) {
  const today = new Date();
  today.setDate(today.getDate() + days);

  const formatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric" //"2-digit"
  });

  return `${formatted}`;
}

// Example usage:
console.log(getDeliveryDate());     // today
console.log(getDeliveryDate(4));    // 4 days later
console.log(getDeliveryDate(7));    // 7 days later



// //1.for today🗑️
// function getTodayMessage() {
//   const today = new Date();

//   const formatted = today.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric"
//   });

//   return `Delivery by: ${formatted}`;
// }

// console.log(getTodayMessage()); // Delivery by: Sunday, August 24


// // 2.for adding days ❓🎇
// function addDays(date, days) {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// }

// const today = new Date();
// const deliveryDate = addDays(today, 4);

// const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
//   weekday: "long",
//   month: "long",
//   day: "numeric"
// });

// console.log("Delivery by:", formattedDelivery);



// const nextWeek = addDays(today, 7);

// console.log(nextWeek.toLocaleDateString("en-US", {
//   weekday: "long",
//   month: "long",
//   day: "numeric"
// }));


