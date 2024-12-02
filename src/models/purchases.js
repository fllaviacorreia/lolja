class Purchase {
    constructor(id_product, id_client, total, status = 'finished') {
        this.id_product = id_product;
        this.id_client = id_client;
        this.total = total;
        this.status = status;
    }
}

module.exports = Purchase;