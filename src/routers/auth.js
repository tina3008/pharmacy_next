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

const router = Router();
// const jsonParser = json();


router.post('/register', validateBody(validUserSchema), ctrlWrapper(register));

router.post('/login', validateBody(loginSchema), ctrlWrapper(login));

router.post('/logout', ctrlWrapper(logout));

router.post('/refresh', ctrlWrapper(refreshSessionController));


router.get('/user-info',  authenticate,  ctrlWrapper(getInfoUserController));

export default router;



