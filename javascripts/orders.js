import { caculateCartQuantity } from "../data/cart.js";

//For displaying cart quantity in the header - orders.html page
let cartQuantity = caculateCartQuantity();
document.querySelector('.js-cart-quantity-orders').innerHTML = cartQuantity;

console.log('Hello');



let ordersHTML = `
  <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>August 12</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$35.06</div>
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

