const { User } = require("../../database/models");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.findAll();
      const usersFilter = allUsers.map((user) => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        detail: `http://localhost:3000/api/users/${user.id}`,
      }));
      res.json({ count: allUsers.length, users: usersFilter });
    } catch (error) {
      console.log(error);
    }
  },
  getOne: async (req, res) => {
    try {
      const oneUser = await User.findByPk(req.params.id);
      const userFilter = [oneUser].map((user) => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        detail: `http://localhost:3000/api/users/${user.id}`,
      }));
      res.json({ count: oneUser.length, users: userFilter });
    } catch (error) {
      console.log(error);
    }
  },
};
