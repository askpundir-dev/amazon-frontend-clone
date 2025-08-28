import { formatCurrency } from "../scripts/utils/money.js";

console.log('it works with 2000.5');
if(formatCurrency(2000.5)==='20.01'){
  console.log('passed');
}
else{
  console.log('failed 3424.5');
}

console.log('it works with 234.5');
if(formatCurrency(234.5)==='2.35'){
  console.log('passed');
}
else{
  console.log('failed ');
}

console.log('it works with 0');
if(formatCurrency(0)==='0.00'){
  console.log('passed');
}
else console.log('failed');
