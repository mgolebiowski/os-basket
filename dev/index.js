"use strict"; 
require('normalize.css');
require('bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('./styles.scss');

const Basket = require('./basket');
window.onload  = function(){
    window.basket = new Basket();

    document.querySelector("#backet-pcs").innerHTML = basket.allPcs;
    document.querySelector("#basket-price").innerHTML = basket.allPrice;
    document.querySelector("#basket-sum-value").innerHTML = basket.allPrice;

    if(basket.getProductArray()){
        basket.getProductArray().forEach((product)=>{
            addNewRow(product);
        });
    }

};

document.querySelector("#product-add").addEventListener("click", (event) => {
    event.preventDefault();

    let nameEl = document.querySelector("#product-name");
    let qtyEl = document.querySelector("#product-qty");
    let priceEl = document.querySelector("#product-price");

    if(!nameEl.value || !qtyEl.value || !priceEl.value) return;

    //Creating an object
    let product = {
        "name": nameEl.value,
        "qty": qtyEl.value,
        "price": priceEl.value
    };

    nameEl.value = "";
    qtyEl.value = "";
    priceEl.value = "";

    basket.addProductToBasket(product);
    addNewRow(product);
    basket.sumAllProducts();

    document.querySelector("#backet-pcs").innerHTML = basket.allPcs;
    document.querySelector("#basket-price").innerHTML = basket.allPrice;
    document.querySelector("#basket-sum-value").innerHTML = basket.allPrice;
});

function addNewRow(product){
    let table = document.querySelector("#basket-table");
    let row = table.insertRow();
    let nameCell = row.insertCell(0);
        nameCell.innerHTML = product.name;
    let qtyCell = row.insertCell(1);
        qtyCell.innerHTML = product.qty+" pcs";
    let priceCell = row.insertCell(2);
        priceCell.innerHTML = product.price+"$";
}