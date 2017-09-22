"use strict"; 
require('normalize.css');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./styles.scss');

const Basket = require('./basket');
window.basket = new Basket();

document.querySelector("#product-add").addEventListener("click", (event) => {
    event.preventDefault();

    //Creating an object
    let product = {
        "name": document.querySelector("#product-name").value,
        "qty": document.querySelector("#product-qty").value,
        "price": document.querySelector("#product-price").value
    };

    basket.addProductToBasket(product);
});