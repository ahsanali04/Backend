// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((error) => {
//       next(error);
//     });
//   };
// };

const asyncHandler = (fun) => async (req, res, next) => {
  try {
    await fun(req, res, next);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.statusCode,
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

export default asyncHandler;
