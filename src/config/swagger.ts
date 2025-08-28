import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import config from './config';
const {PORT} = config;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0", // versi OpenAPI
    info: {
      title: "My API Docs",
      version: "1.0.0",
      description: "Dokumentasi API untuk project Express + TypeScript",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, // base URL API
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // lokasi file route untuk scan JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
