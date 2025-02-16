import { Request, Response } from 'express';
import logger from '../config/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (err: any, req: Request, res: Response): void => {
    logger.error('Error', {
        context: 'Controller',
        error: err.message,
    });
    const errorMessage = err.message || 'Unknown error';
    res.status(500).json({ message: errorMessage, success: false });
};
