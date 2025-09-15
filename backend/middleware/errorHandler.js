module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === "SequelizeValidationError") {
    const messages = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res
      .status(400)
      .json({ message: "Validation failed", errors: messages });
  }

  res.status(500).json({ message: "Internal server error" });
};
