import express, { json } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import * as xp from "./src/utils/express-utils";
import config from "./config";
import Mongo from "./src/models/mongo";
import { getUserRouter } from "./src/controller/user";
import { getCategoryRouter } from "./src/controller/category";
import { getHomeRouter } from "./src/controller/home";
import { getProductRouter } from "./src/controller/product";
import { getCartRouter } from "./src/controller/cart";
import { getOrderRouter } from "./src/controller/order";

const swaggerOptions = {
  definition: {
    swagger: "3.0",
    openapi: "3.0.3",
    info: {
      title: "API Documentation for Arrive Server App",
      version: "1.0.0",
      description: "API Documentation for Arrive Server App",
      contact: {
        name: "Naresh",
        email: "nareshvadlamani@gmail.com",
      },

      servers: ["http://localhost:4000"],
    },

    basePath: "",
  },
  apis: ["**/*.ts"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

async function main() {
  await Mongo.init();
  express()
    .use(express.json())
    .use("/", getHomeRouter())
    .use("/user", getUserRouter())
    .use("/category", getCategoryRouter())
    .use("/product", getProductRouter())
    .use("/cart", getCartRouter())
    .use("/order", getOrderRouter())
    .use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    .use(xp.notFound)
    .listen(config.port, () => {
      console.log(`server listening on http://localhost:${config.port}`);
    });
}

main().catch((err) => console.error("app.init.failed", err));
