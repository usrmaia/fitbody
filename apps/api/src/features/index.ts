import { FastifyInstance } from "fastify";

import authRoute from "@/features/auth/route";
import healthRoute from "@/features/health/route";

function apiRoutes(app: FastifyInstance) {
  app.register(authRoute);
}

export default function routes(app: FastifyInstance) {
  app.register(healthRoute);
  app.register(apiRoutes, { prefix: "/api" });
}
