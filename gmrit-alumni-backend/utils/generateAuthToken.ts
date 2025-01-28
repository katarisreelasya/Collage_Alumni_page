import jwt from "jsonwebtoken";
import type { TokenPayload } from "../middleware/authMiddleware";

const generateAuthToken = (userId: string): string => {
  const payload: TokenPayload = {
    userId: userId,
    role: "alumni",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "gmrit", {
    expiresIn: "2d",
  });

  return token;
};

export default generateAuthToken;
