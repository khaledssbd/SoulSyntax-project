import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import validator from 'validator';
import { TUser, TUserModel } from './auth.interface';

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true, // unique
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not a valid role',
      },
      default: 'user', // default
    },
    isBlocked: {
      type: Boolean,
      default: false, // default
    },
    passwordChangedAt: {
      type: Date, // will handle later
    },
  },
  {
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  // Hashing password before saving
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  // Hiding the Hashed password from returned data
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  userGivenPassword,
  dbHashedPassword,
) {
  return await bcrypt.compare(userGivenPassword, dbHashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, TUserModel>('User', userSchema);
