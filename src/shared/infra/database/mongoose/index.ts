import mongoose from 'mongoose';

const connection = async () => {
  console.log(
    `Connecting to mongodb on ${process.env.DB_HOST}:${process.env.DB_PORT}`,
  );
  return mongoose.connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin&readPreference=primary&appname=MongoDB`,
    { useUnifiedTopology: true, useNewUrlParser: true },
  );
};

export default connection;
