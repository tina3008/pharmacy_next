import { Router } from 'express';
import {
  register,
  login,
  logout,
  refreshSessionController,
  getInfoUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import {
  validUserSchema,
  loginSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();


authRouter.post(
  '/register',
  validateBody(validUserSchema),
  ctrlWrapper(register),
);

authRouter.post('/login', validateBody(loginSchema), ctrlWrapper(login));

authRouter.post('/logout', ctrlWrapper(logout));

authRouter.post('/refresh', ctrlWrapper(refreshSessionController));


authRouter.get('/user-info', authenticate, ctrlWrapper(getInfoUserController));

export default authRouter;



