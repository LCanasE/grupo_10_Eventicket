// Controlador de usuarios
const path = require('path');

const userControllers = {

    getLogin: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/users/login.html")),
    res.render('./users/login.ejs'),

    getRegistro: (req, res) =>
    //res.sendFile(path.join(__dirname, "../views/users/registro.html"))
    res.render('./users/registro.ejs')
}

module.exports = userControllers;