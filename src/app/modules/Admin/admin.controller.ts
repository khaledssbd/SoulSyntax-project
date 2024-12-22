import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await AdminServices.blockUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: {},
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});


export const AdminControllers = {
  blockUser,
  deleteBlog,
};
