
//Middleware functions
export const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
  
    res.status(403).json({});
  };
  
export const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(403).json({});
    }
  
    return next();
  };
