const express = require("express");
const router = express.Router();
const { createToken } = require("../auth");


router.post("/", (req, res, next) => {
  const token = createToken(req.user)
  return res.status(201).json(token)
})

module.exports = router;