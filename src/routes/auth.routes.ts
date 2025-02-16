// auth.routes.ts
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validatorMiddleware';
import { registerSchema } from '../validation/authSchemas';

const router = express.Router();

router.post('/signup', validateRequest(registerSchema), AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;
