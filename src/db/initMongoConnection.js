import mongoose from 'mongoose';
import { env } from '../utils/env.js';


async function initMongoConnection() {
  try { const user = env('MONGODB_USER');
         const password = env('MONGODB_PASSWORD');
         const url = env('MONGODB_URL');
         const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,


    );

    console.log('Mongo connection successfully established!');

    console.log('Database connection successfully');

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initMongoConnection };
