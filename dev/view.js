

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
        let orderPrice = Number(qtyEl.value)*Number(priceEl.value);
        let product = {
            "name": nameEl.value,
            "qty": qtyEl.value,
            "price": orderPrice
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