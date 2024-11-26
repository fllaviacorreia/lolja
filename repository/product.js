let products = [];

const getAllProducts = () => {
    return products;
}

const getById = (id) => {
    const product = products.filter(product => product.id === id);
    return product;
}

module.exports = {
    getAllProducts,
    getById
}