/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);

const Basket = __webpack_require__(4);
const View = __webpack_require__(5);
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



/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = class Basket {
    constructor(){
        this._getDataFromStorage();
        this.sumAllProducts();
    }

    _getDataFromStorage(){
        if(localStorage.basket){
            this._basketData = JSON.parse(localStorage.basket);
        }
        else{
            this._basketData = "";
        }
    }

    addProductToBasket(product){
        if(this._basketData == ""){
            this._basketData = [product];
        }else{
            this._basketData.push(product);
            this._saveDataToStorage();
        }
    }

    getProductArray(){
        return this._basketData;
    }

    sumAllProducts(){
        if(this._basketData != ""){
            this.allPcs = this._basketData.reduce((pv,nv)=>(
                pv+=Number(nv.qty)
            ), 0);
            this.allPrice = this._basketData.reduce((pv,nv)=>(
                pv+=Number(nv.price)
            ), 0);
        }else{
            this.allPcs = 0;
            this.allPrice = 0;
        }
    }

    _saveDataToStorage(){
        if(localStorage.basket){
            localStorage.basket = JSON.stringify(this._basketData);
        }
        else{
            localStorage.setItem("basket", JSON.stringify(this._basketData));
        }
    }

}

/***/ }),
/* 5 */
/***/ (function(module, exports) {



module.exports = class View{

    constructor(buttonEl, basketPcsEl, basketPriceEl, basketSumEl, formNameEl, formQtyEl, formPriceEl, tabelEl){
        this._btnEl = buttonEl;
        this._bskPcsEl = basketPcsEl;
        this._bskPriceEl = basketPriceEl;
        this._bskSumEl = basketSumEl;
        this._frmNameEl = formNameEl;
        this._frmQtyEl = formQtyEl;
        this._frmPrcEl = formPriceEl;
        this._tblEl = tabelEl;

        this._bskPcsEl.innerHTML = basket.allPcs;
        this._bskPriceEl.innerHTML = basket.allPrice;
        this._bskSumEl.innerHTML = basket.allPrice;
    
        if(basket.getProductArray()){
            basket.getProductArray().forEach((product)=>{
                this.addNewRow(product);
            });
        }
    }

    addNewRow(product){
        let table = this._tblEl;
        let row = table.insertRow();
        let nameCell = row.insertCell(0);
            nameCell.innerHTML = product.name;
        let qtyCell = row.insertCell(1);
            qtyCell.innerHTML = product.qty+" pcs";
        let priceCell = row.insertCell(2);
            priceCell.innerHTML = product.price+"$";
    }

    buttonClick(event){
        event.preventDefault();
        
        let nameEl = this._frmNameEl;
        let qtyEl = this._frmQtyEl;
        let priceEl = this._frmPrcEl;
    
        // Empty inputs
        if(!nameEl.value || !qtyEl.value || !priceEl.value) return;
        // Only numerical in qty and price
        let natNum = new RegExp(/^[0-9]+$/);
        let allNum = new RegExp(/^[0-9\.]+$/);
        if(!natNum.test(qtyEl.value) || !allNum.test(priceEl.value)) return;

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
        this.addNewRow(product);
        basket.sumAllProducts();
    
        this._bskPcsEl.innerHTML = basket.allPcs;
        this._bskPriceEl.innerHTML = basket.allPrice;
        this._bskSumEl.innerHTML = basket.allPrice;
    }
}

/***/ })
/******/ ]);