import { Router } from 'express';

import {
  getClientIDController,
  getClientsController,
  createClientController,
  deleteClientController,
  changeClientController,
} from '../controllers/client.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validClientSchema, schemaClientPatch } from '../validation/client.js';
import { isValidClientID } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
// const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getClientsController));

router.get(
  '/:clientId',
  // checkRoles(ROLES.AUTOR),
  isValidClientID,
  ctrlWrapper(getClientIDController),
);

router.post(
  '/',
  upload.single('photo'),
  validateBody(validClientSchema),
  ctrlWrapper(createClientController),
);
router.delete(
  '/:clientId',
  isValidClientID,
  // checkRoles(ROLES.AUTOR),
  ctrlWrapper(deleteClientController),
);
router.patch(
  '/:clientId',
  upload.single('photo'),
  // checkRoles(ROLES.AUTOR),
  validateBody(schemaClientPatch),
  ctrlWrapper(changeClientController),
);

export default router;

