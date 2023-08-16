import {products} from '../data/products.js';
import {formatCurrency } from './utils/cost.js';
import { cart, removeProductFromCart, caculateCartQuantity} from '../data/cart.js';

let cartSummaryHTML = '';

//console.log(cart);

/* For input type=radio selectors(HTML), we can click one checkbox at a time if the input attributes have the same name, So for different products, we should have a unique radio selector name = "" to solve this problem*/

cart.forEach((product) => {
  let requiredProduct = findProduct(product.id);
  //console.log(requiredProduct);
  
  cartSummaryHTML += `
    <div class="cart-item-container container-${product.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${requiredProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${requiredProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(requiredProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${product.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input js-delivery-option-input"
              name="delivery-option-${product.id}" id="input" value="0" >
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input js-delivery-option-input"
              name="delivery-option-${product.id}" id="input" value="499" >
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input js-delivery-option-input"
              name="delivery-option-${product.id}" id="input" value="999" >
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

//console.log(cartSummaryHTML);

//Display total cart quantity in the checkout.html page
displayCartQuantityInHeader();

//Setting the HTML in the checkout page(For Products)
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

//This function will find the product from products array only using the productId
function findProduct(productId){
  let requiredProduct;
  products.forEach((product) => {
    if(productId === product.id){
      requiredProduct = product;
    }
  });
  return requiredProduct;
}

//Using closure method and dataset attribute - for delete button(Similar logic to add to cart button)
let deleteButtons = document.querySelectorAll('.js-delete-link');
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener('click',() => {
    let productId = deleteButton.dataset.productId;
    removeProductFromCart(productId);
    //console.log(cart);
    /* we are using the unique product-id for every product and removing the product using that id from the final HTML*/
    let cartItem = document.querySelector(`.container-${productId}`);
    cartItem.remove();
    //For displaying cart quantity in header after deleting
    displayCartQuantityInHeader();

    /*Updating the costs when deleting a product*/
    //Total Items Cost Logic(No tax and shipping included) 
    let itemCost = setItemsCost();

    //Setting the items cost
    document.querySelector('.js-items-cost').innerHTML = `$${itemCost.toFixed(2)}`;

    //Set all other costs in the starting - when shipping rates are 0
    setAllCosts(itemCost);
  });
});

function displayCartQuantityInHeader(){
  let cartQuantity = caculateCartQuantity();
  //In checkout.html header
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} Items`;
  //In checkout.html order summary - when billing
  document.querySelector('.js-items-quantity').innerHTML = `Items(${cartQuantity}):`;
}

//Total Items Cost Logic(No tax and shipping included) 
let itemCost = setItemsCost();

//Setting the items cost
document.querySelector('.js-items-cost').innerHTML = `$${itemCost.toFixed(2)}`;

//Set all other costs in the starting - when shipping rates are 0
setAllCosts(itemCost);


//Cost logic - when radio buttons are clicked(Shipping dates are selected)
/* Get all the input radio buttons then forEach loop the buttons.After that use addEventListener(Closure Method)
  when clicked, get all the selected radio buttons and add their values
*/
let inputShippingButtons = document.querySelectorAll('.js-delivery-option-input');
inputShippingButtons.forEach((inputShippingButton) => {
  inputShippingButton.addEventListener('click',(event) => {
    setAllCosts(itemCost);
  });
});

function setAllCosts(itemCost)
{
  let totalShippingCost = 0,shippingCost = 0, totalBeforeTax = 0;
  let checkboxes = document.querySelectorAll('input[id="input"]:checked');//Get all the checked radio boxes
  
  //Add all the selected values
  checkboxes.forEach((checkbox) => {
    shippingCost = formatCurrency(Number(checkbox.value));
    totalShippingCost += Number(shippingCost);
  });

  //Setting the total shipping cost in the HTML
  document.querySelector('.js-shipping-cost').innerHTML = `$${totalShippingCost}`;

  //Calculating total before tax(items cost + shipping)
  totalBeforeTax = totalShippingCost + itemCost;

  //Setting the total before tax in the HTML
  document.querySelector('.js-total-before-tax').innerHTML = `$${totalBeforeTax.toFixed(2)}`;

  //Calculating the tax(10 percent)
  let taxAmount = (totalBeforeTax/10);
  document.querySelector('.js-tax-amount').innerHTML = `$${taxAmount.toFixed(2)}`;

  //Calculating the total cost
  document.querySelector('.js-total-cost').innerHTML = `$${(totalBeforeTax + taxAmount).toFixed(2)}`;

  //return (totalBeforeTax + taxAmount).toFixed(2);
}

function setItemsCost()
{
  let itemCost = 0;
  cart.forEach((cartItem) => {
    let productId = cartItem.id;
    let product = findProduct(productId);
    let productCost = formatCurrency(product.priceCents);
    itemCost += (productCost * cartItem.quantity);
  });
  return itemCost;
}