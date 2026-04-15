import { userModel } from "../model/user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ msg: "Name, email and role are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const rawPassword = password || Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      status: status || "active",
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    res.status(201).json({
      msg: "User created successfully",
      temporaryPassword: password ? undefined : rawPassword,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdBy: user.createdBy,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const { role, status, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (role) filter.role = role;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const users = await userModel
      .find(filter)
      .select("-password")
      .skip(skip)
      .limit(Number(limit))
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    const totalUsers = await userModel.countDocuments(filter);

    res.status(200).json({
      msg: "Users fetched successfully",
      users,
      pagination: {
        totalUsers,
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel
      .findById(id)
      .select("-password")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const adminUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, password } = req.body;

    const updateData = { updatedBy: req.user._id };

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id.toString()) {
      return res.status(400).json({ msg: "You cannot delete yourself" });
    }

    const user = await userModel
      .findByIdAndUpdate(
        id,
        { status: "inactive", updatedBy: req.user._id },
        { new: true },
      )
      .select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deactivated successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const managerUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, status } = req.body;
    const targetUser = await userModel.findById(id);
    if (!targetUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (targetUser.role === "admin") {
      return res
        .status(403)
        .json({ msg: "Managers cannot update admin users" });
    }

    const updateData = { updatedBy: req.user._id };
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (status) updateData.status = status;

    const user = await userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .select("-password");

    res.status(200).json({ msg: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
