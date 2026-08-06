import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const secretKey = process.env.SECRET_KEY || "fallback_secret_key_lms";
    const decoded = jwt.verify(token, secretKey);

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
