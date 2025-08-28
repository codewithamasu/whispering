import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT ,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/whispering',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  SWAGGER_PORT: process.env.SWAGGER_PORT
};

export default config;
