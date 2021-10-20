CREATE DATABASE firstapi;

--

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

CREATE TABLE cliente(
    id_cliente SERIAL PRIMARY KEY,
    correo TEXT,
    pass VARCHAR(40)
);

CREATE TABLE users(
    id_cliente SERIAL PRIMARY KEY,
    correo TEXT,
    pass VARCHAR(40)
);

CREATE TABLE active(
    id SERIAL PRIMARY KEY,
    tipo INTEGER,
    token INTEGER
);

--

INSERT INTO users (name, email) VALUES
    ('joe', 'joe@ibm.com'),
    ('ryan', 'ryan@faztweb.com');

INSERT INTO users (email, pass, token) VALUES
    ( 'joe@ibm.com', 'joe'),
    ( 'test@test.com', 'test'),
    ( 'prueba@prueba.com', 'prueba'),
    ( 'ryan@faztweb.com', 'ryan');

INSERT INTO active (id, tipo, token) VALUES
    ( 'joe@ibm.com', 'joe'),
    ( 'test@test.com', 'test'),
    ( 'prueba@prueba.com', 'prueba'),
    ( 'ryan@faztweb.com', 'ryan');

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(40),
email TEXT
);

INSERT INTO users (name, email) VALUES
    ('joe', 'joe@ibm.com'),
    ('ryan', 'ryan@faztweb.com');