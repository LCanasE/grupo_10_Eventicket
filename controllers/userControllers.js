// Controlador de usuarios
const path = require('path');

const userControllers = {

    getLogin: (req, res) =>
    res.render('login', { title: 'Inicio de sesión'}),

    getRegister: (req, res) =>
    res.render('register', { title: 'Registro' }),

    postRegister: (req, res) => {
        let newUser = req.body;

        console.log(newUser.tyc);

        newUser.tyc = toBoolean(newUser.tyc);

        console.log(newUser.tyc);
        
        }
   
}

module.exports = userControllers;