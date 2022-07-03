// always keep all 4 parameters for this function or it will not fire
module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  res
    .status(error.statusCode || 500)
    .json({ error: error.message || 'Server error' });
};
