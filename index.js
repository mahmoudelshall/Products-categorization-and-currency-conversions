
import fetch from "node-fetch";


let categorizeProducts = (data,rate)=>{
    let allCategories  = data.map(item => {
        return {
          "id" : item.category.id,
          "name" : item.category.name,
        } 
      })
      let uniqueCategories  = [...new Map(allCategories.map(item =>
          [item.id, item])).values()];
      
          let buckets = [];
       uniqueCategories.forEach(item=>{
          buckets.push({"category" :item,"products":[]})
       })
       data.forEach(item=>{
        item.price = item.price * rate;
          for (const key in buckets) {
              if(item.category.id == buckets[key].category.id ){
                  buckets[key].products.push(item)   
              }
          }
         
       })
    
         return buckets;
} 

// get products
const response = await fetch('https://api.escuelajs.co/api/v1/products');
const data = await  response.json();
// get  currancy rate of EGY
const rate = await fetch("https://api.exchangerate.host/latest?base=USD").then((res) => res.json()).then((data) => data.rates['EGP']);


let buckets = categorizeProducts(data,rate);

console.log(buckets);
