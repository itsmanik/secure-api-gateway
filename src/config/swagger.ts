import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gateway",
      version: "1.0.0",
      description:
        "A Node.js API Gateway with authentication, rate limiting, and API key management.",
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key", // clients must send this header
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  // This points to all your route files where you've added @openapi comments
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
