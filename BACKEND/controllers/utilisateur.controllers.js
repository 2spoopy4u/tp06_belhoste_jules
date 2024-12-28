const { v4: uuidv4 } = require("uuid");
const { ACCESS_TOKEN_SECRET } = require("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
}


const userList = [
  {
    nom: "martin",
    prenom: "jean",
    login: "marsstin",
    mail: "martin.jean@gmail.com",
    password: "toto",
    id: uuidv4()
  }
]
// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
    const authUser = userList.filter((obj) => obj.login === utilisateur.login && obj.password === utilisateur.password)[0];
    if (authUser) {
      const user = {
        id: authUser.id,
        name: authUser.nom,
        mail: authUser.mail
      };
      let accessToken = generateAccessToken(user);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.send(authUser);
    };
  };
};

exports.addUser = (req, res) =>{
  const utilisateur = {
    login: req.body.login,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
    id: uuidv4()
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
    const authUser = userList.filter((obj) => obj.login === utilisateur.login)[0];
    if (!authUser) {

      const user = {
        id: utilisateur.id,
        name: utilisateur.nom,
        mail: utilisateur.mail
      };
      userList.push(utilisateur);
      let accessToken = generateAccessToken(user);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.send(utilisateur);

    };
  };
};
exports.updateUser = (req, res) =>{
  const utilisateur = {
    login: req.body.login,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
    id: req.body.id
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
     const index = userList.findIndex((obj)=>obj.id===utilisateur.id && obj.login===utilisateur.login);
     if(index!=-1){
     userList[index] = utilisateur;
    };
  };
};

exports.getUser = (req, res) => {
    const authUser = userList.filter((obj) => obj.id === req.query.id)[0];
    if (authUser) {
      res.send(authUser);
    };
};


