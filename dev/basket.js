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
        }
        this._saveDataToStorage();
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