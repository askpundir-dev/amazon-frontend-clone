const xhr= new XMLHttpRequest();


xhr.addEventListener('load',()=>{
// console.log(xhr.response);
xhr.response.then(()=>{

})
//  console.log(JSON.parse(xhr.response));
})

xhr.open("GET", "http://localhost:3000/products");
// xhr.open('GET','https://supersimplebackend.dev/products');
xhr.send();
// console.log(xhr);
