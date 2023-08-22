export default class productsDTO{
    constructor (product){
        this.title = product.title;
        this.description = product.description;
        this.code = product.code;
        this.price = product.price;
        this.status = product.status;
        this.stock = product.stock;
        this.category = product.category;
        this.owner = product.owner;
        this.thumbnails = product.thumbnails;
    }
}