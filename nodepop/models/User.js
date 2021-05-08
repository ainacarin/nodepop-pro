
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    username: String,
    password: String
});

// hashea real password
userSchema.statics.hashPassword = function(passwordReal) {
    return bcrypt.hash(passwordReal, 12); //return a promise
};

// compare real password vs hashed password
userSchema.methods.comparePassword = function(passwordReal) {
    return bcrypt.compare(passwordReal, this.password); //return a promise
}

const User = mongoose.model('User', userSchema);

module.exports = User;