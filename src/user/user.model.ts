import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Manager', 'User'],
    default: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('hashedPassword')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    next();
  } catch (err:any) {
    next(err);
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.hashedPassword);
};

// // Ensure virtual fields are serialized
// userSchema.set('toJSON', {
//   virtuals: true,
//   versionKey: false,
//   transform: (doc, ret) => {
//     delete ret._id;
//     delete ret.hashedPassword;
//   },
// });

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
