const { User } = require("../models");

// Return All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Return Newv User
exports.getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Create New User
exports.createUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await User.create(payload);
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(err);
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.update(payload);
    res.json(user);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already exists" });
    }
    next(err);
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
