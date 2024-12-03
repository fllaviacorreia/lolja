const z = require("zod");

const PurchaseSchema = z.object({
    id_product: z
        .number()
        .int(),
    id_client: z
        .number()
        .int(),
    total: z
        .number()
        .positive({ message: 'Total must be greater than zero'}),
    status: z
        .string()
        .enum(['finished', 'canceled'])
        .optional()
});

const validatePurchase = (data) => {
    try {
        const parsedPurchase = PurchaseSchema.parsed(data);
        return { isValid: true, data: parsedPurchase };
    } catch (error) {
        
        const errors = error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return { isValid: false, errors };
    }
}

module.exports = { validatePurchase }