class Client {
    constructor(id, name, email, bornDate, status='active') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.bornDate = bornDate
        this.status = status;
    }
}
module.exports = Client;