const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());

/* Cors sert à pouvoir écouter le port 8000 alors que vite est sur le 3000 !*/
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "wild",
  password: "Monkey123!",
  database: "mydb",
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "id20983229_admin@2a02:4780:bad:c0de::13",
//   password: "Monkey123!",
//   database: "mydb",
// });

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connecté à la base de données");
  }
});

/* --------------- GET ------------------  */

/*Port score */
app.get("/scores", (req, res) => {

  const queryFacile = new Promise((resolve, reject) => {
 
    connection.query(
      "SELECT username, score, level FROM scores WHERE level=0 ORDER BY score DESC LIMIT 10",
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("results facile :" + results);
        resolve(results);
      }
    );
  });

  const queryMoyen = new Promise((resolve, reject) => {
    connection.query(
      "SELECT username, score, level FROM scores WHERE level=1 ORDER BY score DESC",
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("results moyen :" + results);
        resolve(results);
      }
    );
  });

  const queryDifficile = new Promise((resolve, reject) => {
    connection.query(
      "SELECT username, score, level FROM scores WHERE level=2 ORDER BY score DESC",
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("results difficile :" + results);
        resolve(results);
      }
    );
  });


  Promise.all([queryFacile, queryMoyen, queryDifficile])
    .then((results) => {
      const [facileResults, moyenResults, difficileResults] = results;
      const combinedResult = {
        facile: facileResults,
        moyen: moyenResults,
        difficile: difficileResults,
      };
      res.status(200).json(combinedResult);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données de score :", error);
      res.sendStatus(500);
    });
});
/* > > USER PROFIL USERNAME                           */
app.get("/userprofil", (req, res) => {
  const { username, id } = req.body;
  console.log(username);

  connection.query(
    "SELECT username FROM user WHERE id = ?",
    [username, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors du chargement des informations");
      } else {
        console.log("Chargement réussi");
        console.log(result);
        // const { username, id } = result[0];
        // console.log("user :" + username);
        // res.status(200).json({ username, id });
      }
    }
  );
});

/* > > USER PROFIL ORDER HISTORY                           */
app.get("/orderhistory", (req, res) => {
  // const order = req.body.user_id1;

  connection.query("SELECT * FROM panier_valide", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors du chargement des informations");
    } else {
      console.log("Chargement réussi");
      res.status(200).json(result);
    }
  });
});
/* >> GET SCORES      */
 app.get("/scores", (req, res) => {
  connection.query("SELECT * FROM mydb.scores", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors du chargement des informations");
    } else {
      console.log("Chargement réussi");
      res.status(200).json(result);
    }
  });
 });
/* -------------- POSTS ------------------ */

/* > > REGISTER                            */
app.post("/register", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  const username = req.body.username;

  connection.query(
    "INSERT INTO user (mail, password, username) VALUES (?, ?, ?)",
    [mail, password, username],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Erreur lors de l'insertion dans la base de données");
      } else {
        const userId = result.insertId; // Récupère l'ID de l'utilisateur inséré

        // Insérer une nouvelle entrée dans la table "mushs" pour cet utilisateur
        connection.query(
          "INSERT INTO mushs (mushs, user_id) VALUES (?, ?)",
          [0, userId],
          (err, result) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send("Erreur lors de l'insertion dans la base de données");
            } else {
              console.log("Enregistrement réussi");
              res.sendStatus(200);
            }
          }
        );
      }
    }
  );
});

/* > > LOGIN                              */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  connection.query(
    /* Tout droit de gépéto c'est bô */
    /* C'est une jointure entre les tableaux user et mushs, ça vaut le coup d'oeil ! */
    "SELECT u.mail, u.username, u.id, m.mushs " +
      "FROM user u " +
      "LEFT JOIN mushs m ON u.id = m.user_id " +
      "WHERE u.mail = ? AND u.password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send("Erreur lors de la recherche dans la base de données");
      } else {
        if (result.length > 0) {
          console.log("Login réussi");
          const { mail, username, id, mushs } = result[0];
          console.log("user :" + username);
          res.status(200).json({ mail, username, id, mushs });
        } else {
          console.log("Login échoué");
          res.status(401).send("Informations de connexion invalides");
        }
      }
    }
  );
});

/* > > SAVE MUSHS GAME                              */
app.post("/saveScore", (req, res) => {
  const { id, score, username, level } = req.body;

  connection.beginTransaction((err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("Erreur lors de l'ouverture de la transaction");
    }

    // Requête d'insertion dans la table "scores"
    connection.query(
      "INSERT INTO scores (user_id, score, username, level) VALUES (?, ?, ?, ?)",
      [id, score, username, level],
      (err, insertResult) => {
        if (err) {
          connection.rollback(() => {
            console.log(err);
            res
              .status(500)
              .send("Erreur lors de l'insertion dans la base de données");
          });
        } else {
          // Requête de mise à jour dans la table "mushs"
          connection.query(
            "UPDATE mushs SET mushs = mushs + ? WHERE user_id = ?",
            [score, id],
            (err, updateResult) => {
              if (err) {
                connection.rollback(() => {
                  console.log(err);
                  res
                    .status(500)
                    .send(
                      "Erreur lors de la mise à jour dans la base de données"
                    );
                });
              } else {
                // Requête de récupération du score mis à jour
                connection.query(
                  "SELECT mushs FROM mushs WHERE user_id = ?",
                  [id],
                  (err, selectResult) => {
                    if (err) {
                      connection.rollback(() => {
                        console.log(err);
                        res
                          .status(500)
                          .send("Erreur lors de la récupération des données");
                      });
                    } else {
                      const updatedMushs = selectResult[0].mushs;
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            console.log(err);
                            res
                              .status(500)
                              .send(
                                "Erreur lors de la validation de la transaction"
                              );
                          });
                        } else {
                          console.log("Transaction réussie");
                          res.status(200).json({ mushs: updatedMushs });
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
});

/* > > USER PROFIL MAIL                           */
app.get("/userprofil", (req, res) => {
  const { username, id } = req.body;
  console.log(username);

  connection.query(
    "SELECT username FROM user WHERE id = ?",
    [username, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors du chargement des informations");
      } else {
        console.log("Chargement réussi");
        const { username, id } = result[0];
        console.log("user :" + username);
        res.status(200).json({ username, id });
      }
    }
  );
});

/* > > USER PROFIL ORDER HISTORY                           */
app.get("/orderhistory", (req, res) => {
  // const order = req.body.user_id1;

  connection.query("SELECT * FROM panier_valide", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors du chargement des informations");
    } else {
      console.log("Chargement réussi");
      res.status(200).json(result);
    }
  });
});

/* > > USER PROFIL CHANGE PASSWORD                           */
app.post("/change-password", (req, res) => {
  const { oldPassword, newPassword, id } = req.body;

  // Vérifie le mot de passe actuel avec la base de données
  const checkPasswordQuery = "SELECT password FROM user WHERE id = ?";

  connection.query(checkPasswordQuery, [id], (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la verification du mot de passe actuel:",
        error
      );
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la verification du mot de passe actuel.",
      });
    } else {
      const savedPassword = results[0].password;

      if (oldPassword === savedPassword) {
        // Effectuer la mise à jour du mot de passe dans la base de données
        const updatePasswordQuery = "UPDATE user SET password = ? WHERE id = ?";
        // ATTENTION PENSER A MODIFIER [newPassword] PAR [newPassword, id]
        connection.query(updatePasswordQuery, [newPassword, id], (error) => {
          if (error) {
            console.error(
              "Erreur lors de la modification du mot de passe:",
              error
            );
            res.status(500).json({
              message:
                "Une erreur est survenue lors de la modification du mot de passe.",
            });
          } else {
            res.json({ message: "Le mot de passe a ete modifie avec succes." });
          }
        });
      } else {
        res
          .status(400)
          .json({ message: "Le mot de passe actuel est incorrect." });
      }
    }
  });
});

/* > > USER PROFIL CHANGE USERNAME                           */
app.post("/change-username", (req, res) => {
  const { newUsername, userId } = req.body;
  console.log("newUsername" + newUsername);
  console.log("userId" + userId);
  
  if (newUsername != "") {
  // Effectuer la mise à jour de username dans la base de données
  const updateUsername = "UPDATE user SET username = ? WHERE id = ?";
  // ATTENTION PENSER A MODIFIER [newUsername] PAR [newUsername, id]
  connection.query(updateUsername, [newUsername, userId], (error) => {
    if (error) {
      console.error(
      "Erreur lors de la modification de username:",
      error
      );
      res.status(500).json({
      message:
      "Une erreur est survenue lors de la modification de votre username.",
      });
    } else {
      res.json({ message: "Votre username a ete modifie avec succes." });
      }
    });
  } else {
    res
    .status(400)
    .json({ message: "Le username choisi est incorrect." });
  }
});

/* PORT LISTENNING  */

app.listen(8000, () => {
  console.log("running server");
});
