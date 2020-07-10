const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', { getters: true })
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj.__v;
  delete obj._id;
  return obj
}




const User = mongoose.model("User", userSchema);

module.exports = User;