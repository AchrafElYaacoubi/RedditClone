const mongoose = require("mongoose");

commentSchema = new mongoose.Schema({
  author: { type: String, required: true},
  body: { type: String, required: true},
  created: { type: Date, default: Date.now}
})

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  comments: [commentSchema],
  score: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

postSchema.set('toJSON', { getters: true });
postSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

postSchema.methods.addComment = function (author, body) {
  this.comments.push({ author, body });
  return this.save();
};

postSchema.methods.removeComment = function (id) {
  const comment = this.comments.id(id);
  if(!comment)
    throw new Error("Comment not found!");
  comment.remove();
  return this.save();
}

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
