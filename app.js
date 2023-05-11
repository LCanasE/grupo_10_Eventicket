// 1. Instalar express: npm i express --save

// 2. Requerirla:
const express = require("express");

// Método para facilitar las rutas:
const path = require("path");

// 3. Guardar la ejecución de express:
const app = express();

app.use(express.static("public"));

// 4. Levantar servidor web:
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000")); // Para acceder al servidor: Entrar en el navegador a localhost:3000 - o el puerto mencionado en esta línea

// Para levantar el servidor y que actualice cambios automáticamente: Ejecutar en la terminal: nodemon app.js

// 5. Indicar las rutas de respuesta a las solicitudes al servidor:
// Home:
//app.get('/', (req,res) => res.send('Servidor Instanciado - Home'));

// Rutas a los archivos HTML: Se puede usar .resolve o .join
// Home:
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/home.html"))
);

// Eventos:
app.get("/eventos", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/eventos.html"))
);

// Login:
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/login.html"))
);

// Registro:
app.get("/registro", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/registro.html"))
);

// Detalle de productos:
app.get("/productos", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/productos.html"))
);

// Carrito de compras:
app.get("/carrito", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/carrito.html"))
);
