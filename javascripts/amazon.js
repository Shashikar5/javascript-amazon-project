/* 
    Main idea of JS
    1.Save Data
    2.Generate HTML
    3.Make it interative

    For writing the script element, order matters. we cannot write the script element for looping and inserting HTML before the HTML class. it should be after.
*/
//In the script element in amazon.js, Products.js is created(Pls refer data/products.js for the array)

/* Using the script to load js files in the main HTML file can cause naming conflicts(2 same variables are declared). So, to solve      this, we use modules
    Steps for creating a module / How get a variable out of the file without using script attribute
    1. Add type = "module" attribute
    2. Export the variable
    3. Import the variable    
    For Example: refer the cart variable in cart.js
    
    Modules will only work with live server. Going to a HTML and clicking will not cause module to work
*/
import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/cost.js';

/* one dot means that it will go inside current folder/folder-inside-that/file   , two dot means outside-current-folder/folder-inside-that/file */

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
                src= "${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
                src= "images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            $ ${formatCurrency(product.priceCents)}
        </div>

        <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id = "${product.id}">
            Add to Cart
        </button>
    </div>  
    `;
});

//console.log(productsHTML);

// Inserting the HTML 
document.querySelector('.js-products-grid').innerHTML = productsHTML;


/* 
    Syntax for data attribute
    1.it is a HTML attribute
    2. have to start with data
    3. then we can give it any name we want

    it is defined in add-to-cart-button as data-product-id

    To retrive it, we can access with .dataset.productId(it gets converted to camel case from kebab case) after using dom to get the HTML where the data attribute was written(For data-product-id)
*/
//Adding to Cart Logic - using closure method(Pls refer final todo list-12 in javascript project)
const addToCartButtons = document.querySelectorAll('.js-add-to-cart');

addToCartButtons.forEach((addToCartButton, index) => {
    addToCartButton.addEventListener('click',() => {

        const productId = addToCartButton.dataset.productId;

        //Getting the quantity from the select html attribute, we assign a unique class to the select attribute and get it
        const quantityPerItem = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        displayAddedText(productId);

        /*  cart.push(products[index]); Alternative way without data attribute, we use index and add the whole object to the cart
            console.log('Added Product'); - Without using productId
        */
        addToCart(productId, quantityPerItem);

        /*For putting total cart quantity in the header. we are caculating total quantity by adding all the individual quantities in the cart*/
        caculateTotalCartQuantity();
        
        //console.log(cart);
    });
});

/*After clicking add to cart button, Added message will come and disappear after 1 sec
In the CSS file, Added message opacity is set to 0 so, we assign a unique class to the message and access it using dom and make opacity 1. We are also using setTimeOut to make the message disappear*/
function displayAddedText(productId){
    const message = document.querySelector(`.added-to-cart-${productId}`);
    message.style.opacity = 1;
    setTimeout(() => {
        message.style.opacity = 0;
    },1000);
}

function caculateTotalCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((product) => {
        cartQuantity += product.quantity;
    });
    
    //Setting the cart quantity in the header
    document.querySelector('.js-cart-quantity').innerText = cartQuantity;
}




