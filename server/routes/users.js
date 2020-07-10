const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(200).json(user))
    .catch(next)
})

router.param('user', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if(!user)
        throw new Error("User not found!");
      req.user = user;
      next();
    })
    .catch(next);
})

router.post("/:user/verifypassword", (req, res, next) => {
  const { user } = req;
  user.verifyPassword(req.body.password)
    .then(verificationRes => res.status(200).json(verificationRes))
    .catch(next);
})

module.exports = router;