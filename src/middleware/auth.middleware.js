export const mockAuth = (req, res, next) => {
  // get role from headers
  const role = req.headers["role"];

  // default role if not provided
  const userRole = role ? role.toLowerCase() : "viewer";

  // attach user to request
  req.user = {
    id: 1,
    role: userRole,
  };

  next();
};