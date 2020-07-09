const express = require("express");
const Post = require("../models/post");

const router = express.Router()

router.get("/", (req, res, next) => {
  Post.find()
    .then(posts =>{
      res.json(posts)
    }
    )
    .catch(err => {
      next(err)
    })
})

router.param('post', (req, res, next, id) => {
  Post.findById(id)
    .then(post => {
      if(!post)
        throw new Error("Post not found!");
      req.post = post;
      next()
    })
    .catch(next)
})

router.get("/:post", (req, res, next) => {
  const { post } = req;
  return res.status(200).json(post);
})

router.post("/", (req, res, next) => {
  Post.create(req.body)
    .then(post => res.status(201).json(post))
    .catch(next);
})

router.delete("/:post", (req, res, next) => {
  const { post } = req;
  post.remove()
    .then(() => res.status(204).end())
    .catch(next);
})

router.post("/:post/comments", (req, res, next) => {
  const { post } = req;
  console.log({post})
  post
    .addComment(req.body.author, req.body.body)
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(next);
})

router.delete("/:post/comments/:comment", (req, res, next) => {
  const { post } = req
  post.removeComment(req.params.comment)
    .then(updatedPost => res.json(updatedPost))
    .catch(next);
});



module.exports = router;