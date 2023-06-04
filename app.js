const express = require("express");
const path = require('path');
const methodOverride = require('method-override');

const mainRoutes = require('./routers/mainRoutes');
const productRoutes = require('./routers/productRoutes');
const userRoutes = require('./routers/userRoutes');

const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/products'),
    path.join(__dirname, './views/users')
]), 

app.use(mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));

