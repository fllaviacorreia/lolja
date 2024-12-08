const { z } = require("zod");

const PurchaseSchema = z.object({
  id_product: z.number().int(),
  id_client: z.number().int(),
  total: z.number().positive({ message: 'Total must be greater than zero' }),
  status: z.enum(['finished', 'canceled']).optional(),
});

const validatePurchase = (data) => {
  try {
    // Usar parsed ao invés de parse para evitar lançamentos explícitos
    const parsedPurchase = PurchaseSchema.parse(data);
    return { isValid: true, ...parsedPurchase };
  } catch (error) {

    // Verificar se error.errors existe antes de chamar map
    const errors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
    })) || [];

    return { isValid: false, errors };
  }
};

module.exports = { validatePurchase };
