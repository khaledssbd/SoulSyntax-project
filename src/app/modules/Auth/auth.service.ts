import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { createToken } from '../Auth/auth.utils';
import { TLoginUser, TUser } from '../Auth/auth.interface';
import { User } from './auth.model';

const createUserIntoDB = async (userData: TUser) => {
  const { role, ...restData } = userData;

  const isEmailUsed = await User.isUserExistsByEmail(restData.email);
  if (isEmailUsed) {
    throw new AppError(httpStatus.FORBIDDEN, 'This email is already used !');
  }

  const result = await User.create(restData);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

  // create token and send to the client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
