const clientService = require("../service/client");

const getAll = () => {
    return clientService.getAll()
}

module.exports = {
    getAll,
}