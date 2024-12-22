import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { BlogControllers } from '../blog/blog.controller';
import { USER_ROLE } from '../Auth/auth.constant';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockUser,
);

router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminControllers.deleteBlog);

export const AdminRoutes = router;
