const { z } = require("zod");

const ClientSchema = z.object({
    name: z
        .string()
        .min(1, {message: 'Name is required'})
        .max(50, { message: 'The name must have a maximum of 50 characters'}),
    email: z
        .string()
        .email({message: 'Invalid e-mail format'})
        .min(1, {message: 'E-mail is required'})
        .max(50, { message: 'The e-mail must have a maximum of 50 characters'}),
    bornDate: z
        .date()
        .refine((date) => {
            const eigthteenAgo = new Date();
            eigthteenAgo.setFullYear(eigthteenAgo.getFullYear() - 18)

            return date < eigthteenAgo; 
        }, {message: 'Client must be 18 years of age or older'})
});

const validateClient = (data) => {
    try {
        const parsedClient = ClientSchema.parse(data);
        
        return { isValid: true, data: parsedClient };
    } catch (error) {
        
        const errors = error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return { isValid: false, errors };
    }
}
module.exports = { validateClient };