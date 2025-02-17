import createHttpError from 'http-errors';

import StoreCollection from '../db/models/store.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;

    if (roles.includes(ROLES.AUTOR) && role === ROLES.AUTOR) {
      const { storeId } = req.params;
      if (!storeId) {
        next(createHttpError(404));
        return;
      }

      const contact = await StoreCollection.findOne({
        _id: storeId,
        userId: user._id,
      });

      if (store) {
        next();
        return;
      }
    }

    next(createHttpError(404));
  };
