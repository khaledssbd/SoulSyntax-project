import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/Auth/auth.model';
import { TUserRole } from '../modules/Auth/auth.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  // rest operator makes an Array
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(userEmail);
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the user is already deleted
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are a forbidden user !');
    }

    // checking if the any hacker using a token even-after the user changed the password
    if (
      user.passwordChangedAt &&
      (await User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized yet!',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
