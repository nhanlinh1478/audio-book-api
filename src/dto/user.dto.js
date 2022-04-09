module.exports = {
  userDTO(user) {
    return {
      _id: user._id,
      email: user.email,
      username: user.username,
      name: user.name,
      avatarUrl: user.avatarUrl,
      googleId: user.googleId,
      facebookId: user.facebookId,
      isVip: user.isVip,
      isAdmin: user.isAdmin,
      isLock: user.isLock,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },
  usersDTO(users) {
    return users.map((user) => {
      return {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatarUrl: user.avatarUrl,
        googleId: user.googleId,
        facebookId: user.facebookId,
        isVip: user.isVip,
        isAdmin: user.isAdmin,
        isLock: user.isLock,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  },
};
