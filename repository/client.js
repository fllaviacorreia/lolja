let clients = []

const getAll = () => {
    return clients;
}

const getById = (id) => {
    const client = clients.filter(client => client.id === id);
    return client;
}

module.exports = {
    getAll, 
    getById
}