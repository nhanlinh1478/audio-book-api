module.exports = {
  requiredAdmin(req, res, next) {
    const isAdmin = req.user.isAdmin;
    const code = res.statusCode;
    if (isAdmin == 0) {
      return res.json({
        code,
        success: false,
        message: "You are not authorized to access this resource",
      });
    }
    next();
  },
};
