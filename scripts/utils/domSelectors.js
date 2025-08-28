export const selectors = {
  checkOut:".js-total-cart-items",
  orderTotalItems:'.order-sumry-total-items',
};
// PARAMETER scope=document  DOCUMENT IS DEFAULT VALUE IF WE DONT PASS ANY ARGUMENT IT WILL RUN ON FULL DOCUMNET LIKE- 
//--document.queryselectorAll() but when WE PROVIDE IT ARGUMENT LIKE IN SCOPE WE PROVIDE--
//--const main=document.querySelector(".main");--
//--getDom(selectors,main)-- now IT WILL RUN DIRECTLY FROM MAIN LIKE main.querySelectorAll()
export function getDOM(selectors,scope = document) {  
  return Object.fromEntries(
    Object.entries(selectors).map(([key, selector]) => {
      const element = scope.querySelectorAll(selector);
      // if only one element, return it directly instead of NodeList

      if (element.length === 0) {
        return [key, null]; // safer: no element found
      }

      return [key, element.length === 1 ? element[0] : element];
    })
  );
}



//THIS FUNCTION IS FOR QUERING DOM, USING THIS BECAUSE KEEPING QUERIES TOGETHER OUTSIDE OF---
//---FUNCTION IN WHICH THEY ARE USED, IS A BETTER APPROACH AND MAKES A FUNCTION MORE OPTIMIZED USING OBJECTS
//THIS FUNCTION IS FOR DYNAMIC QUERIES FOR REPEATING ELEMENTS
//like product cards, quantity inputs, save buttons → they exist per product and need a unique identity (productId).
export function query(productId) {
  if (!productId) return null;

  const container = document.querySelector(`.js-remove-from-cart-${productId}`);
  if (!container) return null;

  return {
    container,
    quantityLabel: container.querySelector(`.js-prod-quantity`),
    input: container.querySelector(`.js-quantity-input`),
    saveBtn: container.querySelector('.js-save')
    };
}