class Product {
    constructor(id, name, brand, price, quantity, status = 'active') {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
    }
}
module.exports = Product;