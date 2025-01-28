import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      role?: string;
      login_id: string;
    };
  }
}

export interface TokenPayload {
  userId: string;
  role: string;
}

// Middleware to check if the user is an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  let decoded = jwt.verify(
    token,
    process.env.JWT_SECRET || "gmrit"
  ) as TokenPayload;
  // console.log(token, decoded, "this is token");

  const { role } = decoded;

  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next();
};

export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "gmrit"
    ) as TokenPayload;
    console.log(decodedToken, "this is decoded token");

    if (decodedToken.role === "admin" || decodedToken.role === "alumni") {
      req.user = {
        login_id: decodedToken.userId,
        role: decodedToken.role,
      };
    }
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
