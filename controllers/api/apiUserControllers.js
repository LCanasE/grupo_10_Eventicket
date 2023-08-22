const { User } = require('../../database/models');

module.exports = {
    getAll: async (req, res) => {
        try {
            const usersInDb = await User.findAll();
            const userInfoApi = usersInDb.map(user => ({
                id: user.dataValues.id,
                name: `${user.dataValues.first_name} ${user.dataValues.last_name}`,
                email: user.dataValues.email
            }))
            res.json(
                {
                    count: usersInDb.length,
                    users: userInfoApi
                }
            )
        } catch (error) {
            console.log(error);
        }
    },

    getOneUser: async (req, res) => {
        try {
            const userSearched = await User.findByPk(req.params.id);
            delete userSearched.dataValues.user_type_id
            delete userSearched.dataValues.password
            delete userSearched.dataValues.check_password

            if(userSearched){
                res.json({
                    user: userSearched
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}