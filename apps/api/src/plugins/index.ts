import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import corsPlugin from "./cors";
import { errorHandler } from "./error";
import rateLimit from "./rate-limit";
import swaggerPlugin from "./swagger";

export default fp(async (app: FastifyInstance) => {
  app.setErrorHandler(errorHandler);

  app.register(rateLimit);
  app.register(corsPlugin);
  app.register(swaggerPlugin);
});
