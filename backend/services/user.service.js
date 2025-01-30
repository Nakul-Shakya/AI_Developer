import userModel from "../models/user.model.js";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  const hashedPassword = await userModel.hashPassword(password); // ✅ Now it works!

  const user = await userModel.create({
    email,
    password: hashedPassword,
  });

  return user;
};

