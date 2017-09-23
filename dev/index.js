"use strict"; 
require('normalize.css');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./styles.scss');

const Basket = require('./basket');
const View = require('./view');
window.onload  = function(){
    window.basket = new Basket();
    window.basketView = new View(document.querySelector("#product-add"), 
                           document.querySelector("#backet-pcs"),
                           document.querySelector("#basket-price"),
                           document.querySelector("#basket-sum-value"),
                           document.querySelector("#product-name"),
                           document.querySelector("#product-qty"),
                           document.querySelector("#product-price"),
                           document.querySelector("#basket-table")
                          );
    
    document.querySelector("#product-add").addEventListener("click", window.basketView.buttonClick.bind(basketView));       
};

