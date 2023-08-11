import {products} from '../data/products.js';
import {formatCurrency } from './utils/cost.js';
import { cart, removeProductFromCart } from '../data/cart.js';

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
              class="delivery-option-input"
              name="delivery-option-${product.id}">
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
              class="delivery-option-input"
              name="delivery-option-${product.id}">
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
              class="delivery-option-input"
              name="delivery-option-${product.id}">
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
  });
})