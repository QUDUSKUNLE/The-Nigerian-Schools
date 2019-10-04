import mongoose from 'mongoose';

/**
 * @description This is User model
 */
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availability: { type: Boolean, default: true },
  hash: { type: String },
  expiryTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


UserSchema.index({ name: 'text' })
const User = mongoose.model('User', UserSchema);

export default User;
