const express = require("express");
const path = require('path');
const app = express();

const mainRoutes = require('./routers/mainRoutes');
const productRoutes = require('./routers/productRoutes');
const userRoutes = require('./routers/userRoutes');

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, './views/products'),
    path.join(__dirname, './views/users')
]), 


app.use(express.static("public"));

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));


app.use(mainRoutes);

app.use('/products', productRoutes);

app.use('/users', userRoutes);
