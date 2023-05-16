// Controlador de usuarios
const path = require('path');

const userControllers = {

    getLogin: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/users/login.html")),

    getRegistro: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/users/registro.html"))
}

module.exports = userControllers;