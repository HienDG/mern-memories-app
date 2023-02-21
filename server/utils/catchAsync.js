export default (asyncCb) => (req, res, next) =>
  asyncCb(req, res, next).catch((error) => next(error));
