
import fetch from "node-fetch";


let categorizeProducts = (data)=>{
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
          for (const key in buckets) {
              if(item.category.id == buckets[key].category.id ){
                  buckets[key].products.push(item)   
              }
          }
         
       })
    
         return buckets;
} 


const response = await fetch('https://api.escuelajs.co/api/v1/products');
const data = await  response.json();
let buckets = categorizeProducts(data);

console.log(buckets);