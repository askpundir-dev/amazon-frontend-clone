import { products } from "./products.js";
import { searchBar,productGrid,renderUi } from "../scripts/amazon.js";

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
  productGrid.querySelector(".no-results-btn").addEventListener("click", () => {
    renderUi(products); // restore all products
  });
}
searchBar.value="";
}


export default searchProduct;