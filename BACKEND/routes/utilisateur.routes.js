const { checkJwt}  = require('./jwtMiddleware');

module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    let router = require("express").Router();
  

    // login utilisateur
    router.post("/login", utilisateur.login);
    router.post("/add",utilisateur.addUser);
    router.put("/update", checkJwt,utilisateur.updateUser);
    router.get("/get", checkJwt,utilisateur.getUser);

    app.use('/api/utilisateur', router);
  };
