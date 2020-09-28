import mongoose from 'mongoose';

const connection = {};

const dbConnect = async () => {
  if (connection.isConnected) return null;

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;

  console.log('connections:', connection.isConnected);
};

export default dbConnect;
