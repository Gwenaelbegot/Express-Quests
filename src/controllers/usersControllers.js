const database = require("../../database");

const getUsers = (req, res) => {
  let sql = "SELECT * FROM users WHERE 1 = 1";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " AND language = ?";
    sqlValues.push(req.query.language);
  }

  if (req.query.city != null) {
    sql += " AND city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};


const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).json({message: 'Yapa'})
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).json({ message: "User not found" });
    });
  };

  const postUsers = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO Users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.status(201).send({ id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;

    database
    .query(
      "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  }

  const deleteUsersById = (req, res) => {
    const id = parseInt(req.params.id);

    database
    .query(" delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
  };

  

module.exports = {
    getUsers,
    getUsersById,
    postUsers,
    updateUsers,
    deleteUsersById
  };