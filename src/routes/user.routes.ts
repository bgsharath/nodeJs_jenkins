// auth.routes.ts
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { UserController } from '../controllers/user.controller';
import { profileUpdateSchema } from '../validation/authSchemas';
import { validateRequest } from '../middlewares/validatorMiddleware';

const router = express.Router();

router.get('/view', authMiddleware, UserController.view);
router.patch('/edit', authMiddleware, validateRequest(profileUpdateSchema), UserController.edit);

export default router;
