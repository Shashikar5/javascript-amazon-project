export let cart = JSON.parse(localStorage.getItem('cart')) || [];

//Function to save cart to local storage
function saveToLocalStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

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

  saveToLocalStorage();
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

export function removeProductFromCart(productId){
  let newCart = [];
  cart.forEach((product) => {
    if(product.id !== productId){
      newCart.push(product);
    }
  });
  cart = newCart;
  saveToLocalStorage();
}

export function caculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  saveToLocalStorage();
  return cartQuantity;
}





