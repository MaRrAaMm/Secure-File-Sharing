export const isAuthorized = (...roles)=> {
  return (req, res, next) =>{
    if (!req.authUser) {
      const error= new Error("Not authenticated");
      error.statusCode =401;
      return next(error);
    }

    if (!roles.includes(req.authUser.role)){
      const error = new Error("Not authorized");
      error.statusCode =403;
      return next(error);
    }
    next();
  };
};
