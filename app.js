// 1. Instalar express: npm i express --save

// 2. Requerirla:
const express = require('express');

// 3. Guardar la ejecución de express:
const app = express();

// 4. Levantar servidor web:
app.listen(3000, () => console.log('Servidor corriendo')) // Para acceder al servidor: Entrar en el navegador a localhost:3000 - o el puerto mencionado en esta línea

// 5. Indicar las rutas de respuesta a las solicitudes al servidor:
    // Home:
    app.get('/', (req,res) => res.send('Servidor Instanciado - Home'));

    // Login:
    app.get('/login', (req,res) => res.send('Login'));

    // Registro:
    app.get('/registro', (req,res) => res.send('Registro'));

    // Detalle de productos:
    app.get('/productos', (req,res) => res.send('Productos'));

    // Carrito de compras:
    // Registro:
    app.get('/carrito', (req,res) => res.send('Carrito de compras'));