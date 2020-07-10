const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compare(password, this.password).then(res => {
    if(!res)
      throw new Error('Incorrect Password!');
    return res;
  })
}

userSchema.set('toJSON', { getters: true })
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj.__v;
  delete obj._id;
  return obj
}




const User = mongoose.model("User", userSchema);

module.exports = User;