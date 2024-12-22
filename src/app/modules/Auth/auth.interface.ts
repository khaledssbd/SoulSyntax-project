import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  passwordChangedAt?: Date;
}

export interface TUserModel extends Model<TUser> {
  // checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  // checking if passwords are matched
  isPasswordMatched(
    userGivenPassword: string,
    dbHashedPassword: string,
  ): Promise<boolean>;
  // checking if JWT Issued Before Password Changed
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): Promise<boolean>;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE; // 'user' | 'admin'
