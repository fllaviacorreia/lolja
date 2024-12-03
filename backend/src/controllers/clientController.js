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

const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, email, bornDate, status } = req.body;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid id'});
        }

        if (!name && !email && !bornDate && !status) {
            return res.status(400).json({ error: 'At least one field needs to be provide'})
        }
        bornDate = new Date(bornDate);
        const updateClient = await ClientRepository.update(id, { name, email, bornDate, status})
        res.status(200).json(updateClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findAllClients = async (req, res) => {
    try {
        const clients = await ClientRepository.findAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid id'});
        }

        const client = await ClientRepository.findById(id);
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    register,
    disable,
    updateClient,
    findAllClients,
    findById
}