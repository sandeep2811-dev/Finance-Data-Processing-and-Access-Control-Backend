export const validateRecord = (req, res, next) => {
  const { amount, type } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ message: "Invalid type" });
  }

  next();
};