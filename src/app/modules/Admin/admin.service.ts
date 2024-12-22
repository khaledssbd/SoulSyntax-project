import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../Auth/auth.model';
import { Blog } from '../blog/blog.model';

const blockUserFromDB = async (id: string) => {
  // const isAdminExists = await Admin.findById(id);
  const isUserExists = await User.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, `User with ID ${id} not found.`);
  }

  const blockedUser = await User.findByIdAndUpdate(id, { isBlocked: true });

  if (!blockedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user!');
  }

  return blockedUser;
};

const deleteBlogFromDB = async (id: string) => {
  const isBlogExists = await Blog.isBlogExists(id);
  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This blog is not found!');
  }

  // const result = await Blog.findByIdAndUpdate(
  //   id,
  //   { isPublished: false },
  // );

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
