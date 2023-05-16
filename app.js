
const express = require("express");

const app = express();

const mainRoutes = require('./routers/mainRoutes');
const productRoutes = require('./routers/productRoutes');
const userRoutes = require('./routers/userRoutes');

app.use(express.static("public"));

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));


app.use(mainRoutes);

app.use('/products', productRoutes);

app.use('/users', userRoutes);





