import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  companyEmail: String,
  password: String,
  role: String,
});

const User = mongoose.model('user', userSchema);

export default User;