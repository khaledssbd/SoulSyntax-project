import { RequestHandler } from 'express';
import httpStatus from 'http-status';

// Not Found page (Route is not found)  (must be in botom)
const notFound: RequestHandler = async (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route is not found! Please try again',
    error: 'The requested resource could not be found! Please try again',
  });
};

export default notFound;
