const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },

});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
