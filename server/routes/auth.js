const express = require("express");
const router = express.Router();
const { localAuth } = require('../auth/local');
const jwt = require("jsonwebtoken");
const config = require("../config");

router.post("/", (req, res, next) => {
  const token = jwt.sign({ user: req.user }, config.jwt.secret, { expiresIn: config.jwt.expiry})
  return res.status(201).json(token)
})

module.exports = router;