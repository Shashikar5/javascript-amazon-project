import { caculateCartQuantity, cart, totalCartCost, deleteAllProductsFromCart, 
  addToCart} from "../data/cart.js";
import {findProduct} from '../data/products.js';

/* Don't try to export module files, you will get error. Only export data files and function files*/

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
      Arriving on: ${cartItem.shippingDate}
    </div>
    <div class="product-quantity">
      Quantity: ${cartItem.quantity}
    </div>
    <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.id}" data-cart-quantity="${cartItem.quantity}" >
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
    </button>
  </div>

  <div class="product-actions">
    <a href="tracking.html">
      <button class="track-package-button button-secondary js-track-package" data-product-id="${product.id}" data-cart-quantity="${cartItem.quantity}" data-cart-shipping-date="${cartItem.shippingDate}">
        Track package
      </button>  
		</a>
  </div>
  `;
});

//Inserting the products in the order.html page from the cart
document.querySelector('.order-details-grid').innerHTML = orderSummaryHTML;

//After displaying the orders in the orders.html page, delete the existing cart
//deleteAllProductsFromCart();
//console.log(cart);

//For displaying cart quantity in the header - orders.html page(Must be zero after placing order)
let cartQuantity = caculateCartQuantity();
document.querySelector('.js-cart-quantity-orders').innerHTML = cartQuantity;

//Buy it again button Logic(Using closure method)
let totalCartQuantity = 0;
let buyAgainButtons = document.querySelectorAll('.js-buy-again-button');
buyAgainButtons.forEach((buyAgainButton) => {
  buyAgainButton.addEventListener('click',() => {
    //Add to cart logic
    let productId = buyAgainButton.dataset.productId;
    let quantity = buyAgainButton.dataset.cartQuantity;
    addToCart(productId, quantity);

    //Calculating the total cart qauntity and displaying it in the header
    totalCartQuantity += Number(quantity);
    document.querySelector('.js-cart-quantity-orders').innerHTML = totalCartQuantity;
  });
});

//Getting the track package buttons using closure method
let trackProductHTML = '';
let trackPackageButtons = document.querySelectorAll('.js-track-package');
trackPackageButtons.forEach((trackPackageButton) => {
  trackPackageButton.addEventListener('click',() => {
    let productId = trackPackageButton.dataset.productId;
    let quantity = trackPackageButton.dataset.cartQuantity;
    let shippingDate = trackPackageButton.dataset.cartShippingDate;
    let product = findProduct(productId);
    trackProductHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on Monday, ${shippingDate}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    `;
    //Saving the product data in local storage to display it in the tracking.html page
    localStorage.setItem('trackProduct',JSON.stringify(trackProductHTML));
  });
});