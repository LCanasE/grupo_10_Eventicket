const express = require("express");
const path = require("path");
const cors = require('cors');
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

const mainRoutes = require("./routers/mainRoutes");
const productRoutes = require("./routers/productRoutes");
const userRoutes = require("./routers/userRoutes");
const apiMainRoutes = require("./routers/api/apiMainRoutes");
const apiUsersRoutes = require("./routers/api/apiUsersRoutes");
const apiProductRoutes = require('./routers/api/apiProductsRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  expressSession({
    secret: "Grupo10-Eventicket",
    resave: false,
    saveUninitialized: false,
  })
),
app.use(userLoggedMiddleware);
app.use(cors());

app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "./views/main"),
  path.join(__dirname, "./views/products"),
  path.join(__dirname, "./views/users"),
]),
  // MIDDLEWARES
  app.use(express.urlencoded({ extended: true })); // para usar los datos que llegan de los formularios
app.use(express.json()); // Para leer archivos .JSON
app.use(methodOverride("_method")); // Para usar @PUT y @DELETE
app.use(express.static("public"));

app.use((req,res,next) => {
    if (req.cookies.email){
        const usersModel = require('./models/usersModel');
        const user = usersModel.findByEmail(req.cookies.emailLogin);
        if (user){
            // delete user.id;
            delete user.passRegForm;
            delete user.checkPassRegForm;
            req.session.user = user;
        }
    } 
    next();
});

// app.use(async (req, res, next) => {
//     res.locals.productsHeader = [];

//     try {
//         if(req.session.user){
//         const userID = req.session.user.id;
//         const cart = await Cart.findAll({
//             where: {
//                 user_id: userID
//             }
//         });

//         res.locals.productsHeader = cart;
//     } else {
//         console.log('No hay usuario en sesión');
//     }
//     next();
//     } catch (error) {
//         console.log(error);
//         next();
//     }
// });

// ROUTES
app.use(mainRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/api", apiUsersRoutes);
app.use("/api", apiMainRoutes);
app.use("/api", apiProductRoutes);

app.use((req, res) => {
  res.status(404).render("error404");
});

app.listen(3001, () =>
  console.log("Servidor corriendo en http://localhost:3001")
);
