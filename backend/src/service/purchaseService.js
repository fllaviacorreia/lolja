const ProductRepository = require('../repositories/productRepository');
const ClientRepository = require('../repositories/clientRepository');

class PurchaseService {
    static async checkPurchase(id_product, id_client) {
        try {
            const product = await ProductRepository.findById(id_product);
            const client = await ClientRepository.findById(id_client);

            return !!(product && client);
        } catch (error) {
            console.error('Error in checkPurchase: ', error.message);
            return false;
        }
        
    }
}

module.exports = PurchaseService;