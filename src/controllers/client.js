import {
  getAllClients,
  getClientById,
  createClient,
  deleteClient,
  patchClient,
} from '../services/client.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getClientsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const clients = await getAllClients({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found clients!',
    data: clients,
  });
};

export const getClientIDController = async (req, res) => {
  const { clientId } = req.params;
  const client = await getClientById(clientId);

  if (!client) {
    throw createHttpError(404, `client not found, ${clientId}`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found client with id ${clientId}!`,
    data: client,
  });
};

export const createClientController = async (req, res) => {
   const photo = req.file;

   let photoUrl;

   if (photo) {
     if (env('ENABLE_CLOUDINARY') === 'true') {
       photoUrl = await saveFileToCloudinary(photo);
     } else {
       photoUrl = await saveFileToUploadDir(photo);
     }
   }
  const clientFields = {
    ...req.body,
    photo: photoUrl,
  };
  const client = await createClient(clientFields);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a client!',
    data: client,
  });
};

export const deleteClientController = async (req, res) => {
  const { clientId } = req.params;

  const client = await deleteClient(clientId);

  if (!client) {
    throw createHttpError(404, 'Client not found');
  }

  res.status(204).send();
};

export const changeClientController = async (req, res, next) => {
  const { clientId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await patchClient(clientId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, `Client not found ${clientId}`));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a client!',
    data: result.client,
  });
};
