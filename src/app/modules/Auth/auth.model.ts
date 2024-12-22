import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import validator from 'validator';
import { TUser, TUserModel } from './auth.interface';

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: {
      type: String,
      required: [true, 'User name is required'], // required
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'User email is required'], // required
      unique: true, // unique
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'User password is required'], // required
      trim: true,
      select: 0, // will hide the password field from all find methods
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        // message: '{VALUE} is not a valid role',
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
  return await User.findOne({ email }).select('+password'); // force show the hidden password
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
