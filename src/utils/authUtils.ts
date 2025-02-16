import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
const TOKEN_EXPIRATION = '1h'; // Set token expiration time

// Generate a JWT
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

// Verify a JWT
export const verifyToken = (token: string): jwt.JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};


