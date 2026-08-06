import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const secretKey = process.env.SECRET_KEY || "fallback_secret_key_lms";
  const token = jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      message,
      user,
    });
};
