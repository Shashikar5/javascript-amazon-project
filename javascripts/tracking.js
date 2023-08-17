import { trackProductCartHTML } from "../data/cart.js";

//Getting the data from local storage in the cart and inserting it in the HTML(Refer order.js - track package button logic)
document.querySelector('.js-order-tracking').innerHTML = trackProductCartHTML;