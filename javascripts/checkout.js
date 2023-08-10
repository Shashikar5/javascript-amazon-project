import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let cartSummaryHTML = '';

cart.forEach((product) => {
  let requiredProduct = findProduct(product.id);
  console.log(requiredProduct);
  
  cartSummaryHTML += `
    <div class="cart-item-container">
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
            ${(requiredProduct.priceCents/100).toFixed(2)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${product.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
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
              name="delivery-option-1">
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
              name="delivery-option-1">
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
              name="delivery-option-1">
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