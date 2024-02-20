const database = require("../../database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).json({message: 'prout'})
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).json({ message: "User not found" });
    });
  };

module.exports = {
    getUsers,
    getUsersById,
  };