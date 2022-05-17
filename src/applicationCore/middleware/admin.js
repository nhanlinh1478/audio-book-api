module.exports = {
  requiredAdmin(req, res, next) {
    const isAdmin = req.user.isAdmin;
    
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
