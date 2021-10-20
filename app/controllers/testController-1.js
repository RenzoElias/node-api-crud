// Pool - Conjunto de Conexiones que el usuario puede utilizar
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'firstapi',
    port: '5432'
});

const getUsers = async (req, res) => {
    //res.send('users')

    // consuta - asincrona
    const response = await pool.query('SELECT * FROM users');
    //console.log(response.rows); // Propiedad de la respuesta para mostrar los datos .rows
    //res.send('users');

    res.status(200).json(response.rows);

}


// =========================================
const createUser = async (req, res) => {

    // Funciona debido al Middleware
    //console.log(req.body); // Datos que me envian

    const {name, email} = req.body;
    //req.body.name

    //res.send('usuario creado')

    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]); // El arreglo name es $1 // El arreglo email es $2

    console.log(response);
    //res.send('user created')

    res.json({
        message: 'User Added Sucessfully',
        body:{
            user: {name, email}
        }
    })

}
// =========================================


const getUserById = async (req, res) => {

    //res.send('User ID' + req.params.id)

    const id = req.params.id;

    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    // Si no se le pone Status // Por defecto sera el 200
    res.json(response.rows);

}

const updateUser = async (req, res) => {

    const id = req.params.id;
    const { name, email} = req.body;

    //console.log(id, name, email);

    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',[
        name,
        email,
        id
    ])
    console.log(response);

    res.json('User Update Successfully');

    //res.end('User Updated');

}

const deleteUser = async (req, res) => {
    //res.send('USER DELETED' + req.params.id);

    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(response);
    res.json(`User ${id} deleted succesfully`);
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}