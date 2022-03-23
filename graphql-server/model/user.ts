import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const saltRounds = 12;

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: false,
      unique: false,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('Password')) {
    try {
      this.Password = await bcrypt.hash(this.Password, saltRounds);
    } catch (err) {
      next(err as Error);
    }
  }
  next();
});

UserSchema.methods.isCorrectPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

export default mongoose.model('User', UserSchema);
