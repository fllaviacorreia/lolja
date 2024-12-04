const z = require("zod");

const ProductSchema = z.object({
    name: z
        .string().min(1, { message: 'Name is required' })
        .max(50, { message: 'The name must have a maximum of 50 characters' }),
    brand: z
        .string()
        .min(1, { message: 'Brand is required' } )
        .max(50, { message: 'The brand must have a maximum of 50 characters' }),
    price: z
        .number()
        .positive({ message: 'Value must be greater than zero' }),
    quantity: z
        .number()   
        .int()
        .nonnegative({ message: 'Quantity must be a non-negative integer' })
});

const validateProduct = (data) => {
    try {
        const parsedProduct = ProductSchema.parsed(data);

        return { isValid: true, data: parsedProduct.data };
    } catch (error) {

        const errors = error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return { isValid: false, errors };
    }
}
module.exports = { validateProduct }