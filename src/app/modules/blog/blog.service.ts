import httpStatus from 'http-status';
import { HydratedDocument } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import { JwtPayload } from 'jsonwebtoken';
import { BlogSearchableFields } from './blog.constant';
import { User } from '../Auth/auth.model';
import { TUser } from '../Auth/auth.interface';

const createBlogIntoDB = async (userData: JwtPayload, payload: TBlog) => {
  // checking if the user is exist
  const user = (await User.isUserExistsByEmail(
    userData.userEmail,
  )) as HydratedDocument<TUser>; // Ensure _id exists in user

  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  // }

  // // checking if the user is already blocked
  // const isBlocked = user?.isBlocked;
  // if (isBlocked) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  // }

  const blogData = { ...payload, author: user._id };
  const result = await Blog.create(blogData);
  return result;
};

const updateBlogIntoDB = async (
  id: string,
  userData: JwtPayload,
  payload: Partial<TBlog>,
) => {
  const isBlogExists = await Blog.isBlogExists(id);
  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This blog is not found!');
  }

  // checking if the user is exist
  const user = (await User.isUserExistsByEmail(
    userData.userEmail,
  )) as HydratedDocument<TUser>; // Ensure _id exists in user

  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  // }

  // // checking if the user is already blocked
  // const isBlocked = user?.isBlocked;
  // if (isBlocked) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  // }

  const isRightAuthor = await Blog.findOne({ _id: id, author: user._id });
  if (!isRightAuthor) {
    throw new AppError(httpStatus.FORBIDDEN, 'This is not your blog!');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author');

  if (!updatedBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update blog!');
  }

  return updatedBlog;
};

const deleteBlogFromDB = async (id: string, userData: JwtPayload) => {
  const isBlogExists = await Blog.isBlogExists(id);
  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This blog is not found!');
  }

  // checking if the user is exist
  const user = (await User.isUserExistsByEmail(
    userData.userEmail,
  )) as HydratedDocument<TUser>; // Ensure _id exists in user

  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  // }

  // // checking if the user is already blocked
  // const isBlocked = user?.isBlocked;
  // if (isBlocked) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  // }

  const isRightAuthor = await Blog.findOne({ _id: id, author: user._id });
  if (!isRightAuthor) {
    throw new AppError(httpStatus.FORBIDDEN, 'This is not your blog!');
  }

  // const result = await Blog.findByIdAndUpdate(
  //   id,
  //   { isPublished: false },
  // );

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(BlogSearchableFields)
    .filter()
    .sortBy();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author');
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
};
