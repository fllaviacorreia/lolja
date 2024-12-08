CREATE TYPE status_type AS ENUM ('active', 'innactive');
CREATE TYPE status_purchase AS ENUM ('finished', 'canceled');


CREATE TABLE IF NOT EXISTS products (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL,
    status status_type NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS clients (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    born_date DATE NOT NULL,
    status status_type NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    id_product INT NOT NULL,
    id_client INT NOT NULL,
    total NUMERIC(10, 2), 
    status status_purchase NOT NULL DEFAULT 'finished',

    FOREIGN KEY (id_product) REFERENCES products (id),
    FOREIGN KEY (id_client) REFERENCES clients (id) 
)