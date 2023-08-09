/* 
    Main idea of JS
    1.Save Data
    2.Generate HTML
    3.Make it interative

    For writing the script element, order matters. we cannot write the script element for looping and inserting HTML before the HTML class. it should be after.
*/
//In the script element in amazon.js, Products.js is created(Pls refer data/products.js for the array)


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
            $ ${(product.priceCents/100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
            <select>
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

        <div class="added-to-cart">
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

        if(!presentInCart(productId))
        {
            cart.push({
                id: productId,
                quantity: 1
            });
        } 
        else 
        {
            increaseQuantity(productId);
        }
        
        //cart.push(products[index]); Alternative way without data attribute, we use index and add the whole object to the cart
        console.log('Added Product');

        console.log(cart);
    });
});

function presentInCart(productId){
    isPresent = false;
    cart.forEach((product) => {
        if(product.id === productId){
            isPresent = true;
        }
    });
    return isPresent;
}

function increaseQuantity(productId){
    cart.forEach((product) => {
        if(product.id === productId)
        {
            product.quantity +=1;
        }
    })
}
