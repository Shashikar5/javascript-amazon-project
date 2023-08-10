export const cart = [{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},{
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

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



