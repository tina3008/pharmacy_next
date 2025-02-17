import { ClientsCollection } from '../db/models/client.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

const getAllClients = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ClientsCollection.find();

  const [contactsCount, contacts] = await Promise.all([
    ClientsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

function getClientById(clientId) {
  return ClientsCollection.findOne({ _id: clientId });
}

function createClient(client) {
  return ClientsCollection.create(client);
}

function deleteClient(clientId) {
  return ClientsCollection.findOneAndDelete({ _id: clientId });
}

const patchClient = async (clientId, payload, options) => {
  const rawResult = await ClientsCollection.findOneAndUpdate(
    { _id: clientId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  console.log(rawResult._id);
  return {
    client: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export {
  getAllClients,
  getClientById,
  createClient,
  deleteClient,
  patchClient,
};
