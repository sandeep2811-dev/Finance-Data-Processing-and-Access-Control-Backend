export const validateUser = (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: "Invalid input" });
  }

  next();
};