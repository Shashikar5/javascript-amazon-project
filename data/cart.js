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
      quantity: quantityPerItem,
      shippingDate: 'June 21'
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
      product.quantity += Number(quantityPerItem);
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

export let totalCartCost = JSON.parse(localStorage.getItem('totalCartCost')) || 0;

export function deleteAllProductsFromCart(){
  let newCart = [];
  cart = newCart;
  saveToLocalStorage();
}

export function saveShippingDatesToCart(){
  cart.forEach((cartItem) => {
    let checkedBox = document.querySelector(`input[name="delivery-option-${cartItem.id}"]:checked`);
    if(checkedBox.value === '0')
    {
      cartItem.shippingDate = 'June 21';
    }
    else if(checkedBox.value === '499')
    {
      cartItem.shippingDate = 'June 15';
    }
    else if(checkedBox.value === '999')
    {
      cartItem.shippingDate = 'June 13';
    }
  });
  saveToLocalStorage();
  //console.log(cart);
}

export let trackProductCartHTML = JSON.parse(localStorage.getItem('trackProduct')) || '';



