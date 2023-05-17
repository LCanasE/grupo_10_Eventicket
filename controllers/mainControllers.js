// Controladores páginas principales
const path = require("path");

const mainControllers = {

    getIndex:(req, res) =>
    //res.sendFile(path.join(__dirname, "../views/home.html"))
    res.render('home.ejs')
}

module.exports = mainControllers;