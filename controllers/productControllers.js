// Controlador de productos
const path = require("path");
const { validationResult } = require("express-validator");
const { Product, Ticket, User, Cart } = require("../database/models");
// const dayjs = require('dayjs');
const formateDate = require("../utils/dateUtils");

let modelProductos = require("../models/productsModel");

const productControllers = {
  getEventsDetails: async (req, res) => {
    try {
      const productsBanner = await Product.findAll();
      await Product.findByPk(req.params.id, {
        // raw: true,
        include: [
          {
            model: Ticket,
            as: "tickets",
            // order: [["price", "ASC"]]
          },
        ],
      }).then((product) => {
        // console.log(product.tickets);
        product.tickets.sort((a, b) => a.price - b.price);
        // console.log(product);
        res.render("eventsDetails", {
          product,
          title: "Detalle",
          productsBanner,
        });
      });
    } catch (error) {
      console.log(error);
    }
    // let id = Number(req.params.id);
    // let productos = modelProductos.findAll();
    // let productoBuscado = modelProductos.findById(id);

    // res.render('eventsDetails', {
    //     // productoBuscado,
    //     productos,
    //     // productosSinModificar,
    //     title: 'Detalle'})
  },

  getCart: async (req, res) => {
    // let id = Number(req.query.id);
    // console.log(req.session.user.id);
    try {
      let userID = req.session.user.id;
      await Cart.findAll({
        include: [
          // {association: 'cart_user'},
          { association: "cart_product" },
          { association: "cart_tickets" },
        ],
        where: {
          user_id: userID,
        },
      }).then((result) => {
        res.render("cart", {
          // searchedProducts: searchedProducts ? searchedProducts.dataValues : '',
          searchedProducts: result,
          products: result,
          title: "Carrito",
        });
      });
    } catch (error) {
      console.log(error);
    }

    // try {
    //     let products = await Product.findAll();
    //     await Product.findByPk(id, {
    //         include: [
    //             {
    //             model: Ticket,
    //             as: "tickets"
    //         }
    //         ]
    //     })
    //     .then((searchedProduct) => {
    //         // console.log(searchedProduct.dataValues.tickets);
    //     res.render('cart', {
    //         searchedProduct: searchedProduct ? searchedProduct.dataValues : '',
    //         products,
    //         title: 'Carrito'})
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
  },

  postCart: async (req, res) => {
    let id = Number(req.query.id);

    let { ticketName, ticketPrice, ticketAmount, idTicket, idProduct } =
      req.body;

    // let tickets = {};

    // Se pregunta si existe ticketName para ejecutar el bucle for. Este if basicamente controla que se pueda entrar al carrito sin necesidad de haber apretado el boton "Comprar".
    if (ticketName) {
      // Bucle for para recorrer los tipos de tickets que llegaron por el body. Arma un array con el nombre del tipo de ticket, el precio y la cantidad que se pushea a el array vacio tickets. Es decir, tickets va a ir acumulando arrays por tipo de ticket.
      for (let i = 0; i < ticketName.length; i++) {
        let ticket = {};

        if (ticketAmount[i] > 0) {
          ticket.product_id = Number(idProduct);
          ticket.quantity = Number(ticketAmount[i]);
          ticket.ticket_type_id = Number(idTicket[i]);
          ticket.price = Number(ticketPrice[i]);
          ticket.bought = 0;
        }
        // console.log(Object.keys(ticket).length > 0);

        if (Object.keys(ticket).length > 0) {
          try {
            await Cart.create({
              user_id: req.session.user.id,
              product_id: ticket.product_id,
              quantity: ticket.quantity,
              ticket_type_id: ticket.ticket_type_id,
              bought: ticket.bought,
            });
            console.log(req.body);
          } catch (error) {
            console.log(error);
          }
        }

        // if(ticketAmount[i] > 0){
        //         tickets.push([ticketName[i], ticketPrice[i], ticketAmount[i]]);
        //     }
      }
    }
    // res.render('cart', {ticketName, ticketPrice, ticketAmount, title: 'Carrito', searchedProducts: {}})
    console.log(req.body);
    res.redirect("./cart");

    // res.send('Producto cargado en la base');
  },

  putCart: async (req, res) => {
    try {
      const cartData = JSON.parse(req.body.cartData);
      console.log("SOY EL PUT DEL CART", cartData);
      await Cart.update(
        { bought: 1 },
        {
          where: {
            user_id: req.session.user.id,
          },
        }
      ).then(res.redirect("/"));
    } catch (error) {
      console.log(error);
    }
  },

  deleteCart: async (req, res) => {
    console.log("PRODUCTO ELIMINADO", req.body);
    try {
      await Cart.destroy({
        where: {
          user_id: req.session.user.id,
        },
      }).then(res.redirect("/"));
    } catch (error) {
      console.log(error);
    }
  },

  deleteOneFromCart: async (req, res) => {
    try {
      await Cart.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/products/cart");

      // console.log('HOLA PRODUCTO ENCONTRADO', findProduct);
    } catch (error) {
      console.log("ERROR");
    }
  },

  getEvents: async (req, res) => {
    let productos = modelProductos.findAll();
    try {
      await Product.findAll({
        nest: true,
        include: [{ association: "tickets" }, { association: "categories" }],
      }).then((products) => {
        // console.log(products);
        return res.render("events", {
          products,
          title: "Eventos",
          productos,
          error: {},
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  getBeProducer: async (req, res) => {
    res.render("beProducer", {
      title: "Sé productor",
      errors: {},
      oldData: {},
      imageName: false,
      errorExtensionImagen: {},
      reqFile: req.file,
      errorImg: {},
      errorInput: {},
    });
  },

  getCreateEvent: async (req, res) => {
    res.render("createEvents", {
      title: "Crear",
      errors: {},
      oldData: {},
      imageName: false,
      errorExtensionImagen: {},
      reqFile: req.file,
      errorImg: {},
      errorInput: {},
    });
  },

  postCreateEvent: async (req, res) => {
    let validation = validationResult(req);
    let eventoNuevo = req.body;
    console.log(req.body);

    if (validation.errors.length > 0) {
      return res.render("createEvents", {
        errors: validation.mapped(),
        oldData: eventoNuevo,
        imageName: req.file ? req.file.filename : "",
        title: "Crear",
        errorExtensionImagen: {},
        reqFile: req.file,
        errorImg: {},
      });
    }

    if (req.file) {
      eventoNuevo.img = req.file.filename;
    }

    if (!req.body.fecha) {
      return res.render("createEvents", { title: "Crear" });
    } else {
      const resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        return res.render("createEvents", {
          errors: resultValidation.errors,
          oldData: req.body,
          title: "Crear",
        });
      }
      // let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

      // let mesDelEvento = Number(eventoNuevo.fecha.split('-')[1]);
      // let diaEvento = eventoNuevo.fecha.split('T')[0].split('-')[2];
      // let indiceMes = mesDelEvento - 1;
      // let nombreMes = meses[indiceMes];
      // let horario = eventoNuevo.fecha.split('T')[1].split(':')[0];

      // Number(diaEvento.split('')[0]) === 0 ? diaEvento = diaEvento.split('')[1] : diaEvento;
      // Number(horario.split('')[0]) === 0 ? horario = horario.split('')[1] : horario;

      let imageRoute = "../img/events/";
      let category_id;
      switch (req.body.categoria) {
        case "Deportes":
          imageRoute += "deportes";
          category_id = 1;
          break;
        case "Recitales":
          imageRoute += "recitales";
          category_id = 2;
          break;
        case "Obras de teatro":
          imageRoute += "obrasTeatro";
          category_id = 3;
          break;
        case "Stand Up":
          imageRoute += "standUp";
          category_id = 4;
          break;
        case "Conferencias":
          imageRoute += "conferencias";
          category_id = 5;
          break;
        default:
          imageRoute = "../img/events";
          break;
      }

      eventoNuevo.img = `${imageRoute}/${req.file.filename}`;
      // eventoNuevo.fecha = `${diaEvento} de ${nombreMes} - ${horario} horas`;
      eventoNuevo.precio = Number(eventoNuevo.precio);
      eventoNuevo.eliminado = eventoNuevo.eliminado === "false" ? 0 : 1;
      eventoNuevo.agotado = eventoNuevo.agotado === "false" ? 0 : 1;
      eventoNuevo.categoria = category_id;

      // console.log(eventoNuevo);

      const {
        nombre,
        fecha,
        ubicacion,
        direccion,
        description,
        tipoEntrada,
        precio,
        cantidadEntradas,
        categoria,
        img,
        eliminado,
        agotado,
      } = eventoNuevo;

      try {
        const user = await User.findOne({
          where: {
            email: req.session.user.email,
          },
        });

        let userID = user.dataValues.id;

        const productCreated = await Product.create({
          name: nombre,
          date: fecha,
          location: ubicacion,
          addres: direccion,
          description: description,
          category_id: categoria,
          image: img,
          deleted: eliminado,
          sold_out: agotado,
          user_creator_id: userID,
        });
        let productCreatedID = productCreated.dataValues.id;

        await Ticket.create({
          name: tipoEntrada,
          amount: cantidadEntradas,
          price: precio,
          product_id: productCreatedID,
        });
      } catch (error) {
        console.log(error);
      }
      res.redirect("/");
    }
  },

  getEditEvent: async (req, res) => {
    let id = Number(req.params.id);
    try {
      const searchedProduct = await Product.findOne({
        where: {
          id: id,
        },
        include: [{ association: "tickets" }, { association: "categories" }],
      });
      if (!searchedProduct) {
        return res.send("No existe ese producto");
      }
      return res.render("editEvents", {
        searchedProduct: searchedProduct.dataValues,
        title: "Editar",
      });
    } catch (error) {
      console.log(error);
    }
    // let productoBuscado = modelProductos.findById(id);
    // if (!productoBuscado) {
    //     return res.send('id inválido');
    // }
    // res.render('editEvents', {
    //     productoBuscado,
    //     title: 'Editar'})
  },

  putEditEvent: async (req, res) => {
    let id = Number(req.params.id);
    let newData = req.body;

    let imageRoute = "../img/events/";
    let category_id;
    switch (req.body.categoria) {
      case "Deportes":
        imageRoute += "deportes";
        category_id = 1;
        break;
      case "Recitales":
        imageRoute += "recitales";
        category_id = 2;
        break;
      case "Obras de teatro":
        imageRoute += "obrasTeatro";
        category_id = 3;
        break;
      case "Stand Up":
        imageRoute += "standUp";
        category_id = 4;
        break;
      case "Conferencias":
        imageRoute += "conferencias";
        category_id = 5;
        break;
      default:
        imageRoute = "../img/events";
        break;
    }

    newData.fecha = dayjs(newData.fecha).format("YYYY-MM-DDTHH:mm:ss");
    newData.img = req.file
      ? `${imageRoute}/${req.file.filename}`
      : req.body.originalImg;
    newData.precio = Number(newData.precio);
    newData.cantidadEntradas = Number(newData.cantidadEntradas);
    newData.eliminado = Number(newData.eliminado);
    newData.agotado = Number(newData.agotado);
    newData.categoria = category_id;

    const {
      nombre,
      fecha,
      ubicacion,
      direccion,
      tipoEntrada,
      precio,
      cantidadEntradas,
      categoria,
      img,
      eliminado,
      agotado,
    } = newData;
    // console.log(fecha);
    // console.log("NEW DATA \n", newData);
    try {
      await Product.update(
        {
          name: nombre,
          date: fecha,
          location: ubicacion,
          addres: direccion,
          category_id: categoria,
          image: img,
          deleted: eliminado,
          sold_out: agotado,
        },
        {
          where: {
            id: id,
          },
        }
      );
      await Ticket.update(
        {
          name: tipoEntrada,
          amount: cantidadEntradas,
          price: precio,
          product_id: id,
        },
        {
          where: {
            product_id: id,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    // modelProductos.updateById(id, newData);
    // console.log(newData);
    // console.log(req.file);
    res.redirect("/");
  },

  deleteEvent: async (req, res) => {
    let id = Number(req.params.id);
    try {
      const updateProduct = await Product.update(
        {
          deleted: 1,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    // modelProductos.deleteByID(id);
    res.redirect("/");
  },

  getAdminEventsDetail: (req, res) => res.render("adminEventsDetail"),
};

module.exports = productControllers;
