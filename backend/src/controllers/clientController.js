const ClientRepository = require("../repositories/clientRepository");
const Client = require('../models/client');

const register = async (req, res) => {
    try {
        const { name, email, bornDate } = req.body;
        
        // Verificar se todos esses dados vieram
        if (!name || !email || !bornDate) {
            return res.status(400).json({ error: 'Dados inválidos'});
        }
        
        // Criar um regex para validar o formato da data de nascimento  
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!bornDate.match(regexDate)) {
            return res.status(400).json({ error: 'Formato de data inválido'})
        }
        // Criar um regex para validar o formato do e-mail 
        const regexEmail = /^[^\s@]+@[^\s@.]+\.[^\s@.]+$/;
        if (!email.match(regexEmail)) {  
            return res.status(400).json({ error: 'Formato de e-mail inválido'})
        }
        const newClient = new Client(null, name, email, bornDate);
       
        const savedClient = await ClientRepository.save({
                name: newClient.name,
                email: newClient.email,
                bornDate: new Date(newClient.bornDate)
            }     
        )
        res.status(201).json(savedClient);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const disable = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid id'});
        }
        const innactiveClient = await ClientRepository.innactive(id);
        res.status(200).json(innactiveClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    register,
    disable
}