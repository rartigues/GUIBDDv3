module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users email
    router.get("/", users.findAll);

    // Update user_password by id
    router.put("/:id", users.updatePassword);

    // Delete a User with the specified id in the request
    router.delete("/:id", users.deleteUser);

    // Delete all Users
    router.delete("/", users.deleteAllUsers);

    app.use('/api/users', router);
};