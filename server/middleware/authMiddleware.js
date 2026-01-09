import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // attach to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
