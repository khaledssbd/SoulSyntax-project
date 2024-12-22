import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog);

router.get('/', BlogControllers.getAllBlogs);

router.get('/:id', BlogControllers.getSingleBlog);

export const BlogRoutes = router;
