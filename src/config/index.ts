import dotenv from 'dotenv';

// Load environment variables from a `.env` file into `process.env`
dotenv.config();

export const config = {
  port: process.env.PORT || 3000, // Application port
  jwtSecret: process.env.JWT_SECRET || 'default_secret', // Secret key for JWT
  databaseUrl: process.env.DATABASE_URL || '', // PostgreSQL connection string
};
