import { Request, Response, NextFunction } from "express";
import { auth } from 'firebase-admin';
import { HTTP400Error } from "../utils/httpErrors";

// const authService = auth();

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.header('FIREBASE_AUTH_TOKEN');

  if (!idToken) {
    throw new HTTP400Error("Authentication required")
  }

  // let decodedIdToken = await authService.verifyIdToken(idToken);
  
  console.log('Testing auth middleware');
  // req.user = decodedIdToken;
  next();
}