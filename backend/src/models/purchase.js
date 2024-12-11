class Purchase {
    constructor(id_purchase, id_product, id_client, total, status = 'finished') {
        this.id_purchase = id_purchase;
        this.id_product = id_product;
        this.id_client = id_client;
        this.total = total;
        this.status = status;
    }
}

module.exports = Purchase;