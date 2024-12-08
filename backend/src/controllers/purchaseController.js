const PurchaseRepository = require('../repositories/purchaseRepository');
const Purchase = require('../models/purchase');

class PurchaseController {
    static async register (req, res) {
        try {
            const { id_product, id_client, total } = req.body;
           
            if (!id_product || !id_client || !total) {
                return res.status(400).json({ error: 'Dados inválidos'});
            }

            const newPurchase = new Purchase(id_product, id_client, total);
            
            const savedPurchase = await PurchaseRepository.save({
                id_product: newPurchase.id_product,
                id_client: newPurchase.id_client,
                total: newPurchase.total
            })
            res.status(201).json(savedPurchase);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findAllPurchases (req, res) {
        try {
            const purchases = await PurchaseRepository.findAll();
            res.status(200).json(purchases);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = PurchaseController;