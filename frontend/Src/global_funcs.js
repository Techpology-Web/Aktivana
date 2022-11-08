/**
 * returns true if the searchword is in the product object
 * @param {*} searchWord the word (or sentenct) to be searched for
 * @param {*} product the product to search in
 * @returns true if the searchWord is in the product (anywhere)
 */
export function isSearched(searchWord,product){
    //prop should have searched word and which product to check
    //console.log(product)

    return JSON.stringify(product).includes(searchWord);

    /* if(searchWord == ""){return true} //if they havent searched for anything
    for(const atribute in product){
      if(typeof(product[atribute])=="string"){
        if(product[atribute].toLowerCase().includes(searchWord.toLowerCase())){
          return true;
        } 
      }  
      else if(typeof(product[atribute])==="object"){
          if(Array.isArray(product[atribute])){
            for(let i = 0;i<product[atribute].length;i++){
              const se = isSearched(searchWord,product[atribute][i]);
              if(se) return true
            }
          }
          else{
            const se = isSearched(searchWord,product[atribute]);
            if(se) return true
            
        }
      }  
    } 
    return false;*/
  }