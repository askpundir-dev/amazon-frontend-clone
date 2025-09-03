// skipping duplicates

const array=[1,1,2,2,33,1,4,66,33,22,2,3,7,3,4];

const uniqueEleArray=array.filter((element,index)=>{
  return array.indexOf(element)===index;
})
console.log(uniqueEleArray);


//skipping duplicates using Set()

let seen=new Set([...array]);
console.log(seen);  // Set(8) { 1, 2, 33, 4, 66, 22, 3, 7 }

//OR

const unique=[...new Set(array)];
console.log(unique);   //      [1,2, 33,4,66, 22,3,7]