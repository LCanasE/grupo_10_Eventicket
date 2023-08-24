const { Product, Ticket, Cart } = require('../../database/models');

module.exports = {
    getEventDetail: async (req, res) => {
        try {
            // const productsBanner = await Product.findAll()
            const productSearched = await Product.findByPk(req.params.id, {
                include: [ 
                    { association: "categories" },
                    { association: "tickets"
                    // model: Ticket,
                    // as: "tickets",
                    },
                ],
            })
            // --AVERIGUAR PARA MANEJAR EL CASO EN EL QUE NO EXISTA EL ID--
            // console.log(productSearched.tickets);
            productSearched.tickets.sort((a, b) => a.price - b.price);
            // --    --
            res.json(
                {
                    meta: {
                        url: "http://localhost:3000/api/products/:id/eventDetails",
                    },
                    results: productSearched 
                }
            )
        } catch (error) {
            console.log(error);
        }
    },

    getCart: async (req, res) => {
            // let id = Number(req.query.id);
            // console.log(req.session.user.id);
            try {
                let userID = req.session.user.id;
                const cart = await Cart.findAll({
                    include: [
                        {association: 'cart_user'},
                        {association: 'cart_product'},
                        {association: 'cart_tickets'},
                    ],
                    where: {
                        user_id: userID,
                    }
                })
                res.json({
                    meta: {
                        url: 'http://localhost:3000/api/products/cart'
                    },
                    results: cart
                });
            } catch (error) {
                console.log(error);
            }
    }
}