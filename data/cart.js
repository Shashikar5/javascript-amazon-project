export let cart = [];

//if present in the cart, increase the quantity or else add to cart
export function addToCart(productId, quantityPerItem){
  if(!presentInCart(productId))
  {
    cart.push({
      id: productId,
      quantity: quantityPerItem
    });
  } 
  else 
  {
    increaseQuantity(productId, quantityPerItem);
  }
}

function presentInCart(productId){
  let isPresent = false;
  cart.forEach((product) => {
      if(product.id === productId){
          isPresent = true;
      }
  });
  return isPresent;
}

function increaseQuantity(productId, quantityPerItem){
  cart.forEach((product) => {
    if(product.id === productId)
    {
      product.quantity += quantityPerItem;
    }
  })
}



