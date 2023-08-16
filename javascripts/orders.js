import { caculateCartQuantity, cart, totalCartCost, deleteAllProductsFromCart} from "../data/cart.js";
import {findProduct} from '../data/products.js';

/* Don't try to export module files, you will get error. Only export data files and function files*/

//For displaying cart quantity in the header - orders.html page
let cartQuantity = caculateCartQuantity();
document.querySelector('.js-cart-quantity-orders').innerHTML = cartQuantity;

let ordersHTML = `
  <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>August 12</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>${totalCartCost}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
    </div>
  </div>

  <div class="order-details-grid">
  </div>
`;

//console.log(ordersHTML);
//Displaying the total price, order id of the cart
document.querySelector('.js-order-container').innerHTML = ordersHTML;

//After that, inserting the products in the cart inside the orderHTML(in .orders-details-grid)
let orderSummaryHTML = '';

cart.forEach((cartItem) => {
  let product = findProduct(cartItem.id);

  orderSummaryHTML+= `
  <div class="product-image-container">
    <img src="${product.image}">
  </div>

  <div class="product-details">
    <div class="product-name">
      ${product.name}
    </div>
    <div class="product-delivery-date">
      Arriving on: August 15
    </div>
    <div class="product-quantity">
      Quantity: ${cartItem.quantity}
    </div>
    <button class="buy-again-button button-primary">
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
    </button>
  </div>

  <div class="product-actions">
    <a href="tracking.html">
      <button class="track-package-button button-secondary">
        Track package
      </button>
    </a>
  </div>
  `;
});

//Inserting the products in the order.html page from the cart
document.querySelector('.order-details-grid').innerHTML = orderSummaryHTML;

//After displaying the orders in the orders.html page, delete the existing cart
deleteAllProductsFromCart();
//console.log(cart);

