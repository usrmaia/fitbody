import { FastifyInstance } from "fastify";

import authRoute from "@/features/auth/auth.route";
import healthRoute from "@/features/health/health.route";
import exerciseRoute from "./exercise/exercise.route";
import workoutPlanRoute from "./workout-plan/workout-plan.route";
import workoutSessionRoute from "./workout-session/workout-session.route";
import userRoute from "./user/user.route";

function apiRoutes(app: FastifyInstance) {
  app.register(authRoute);
  app.register(userRoute);
  app.register(exerciseRoute);
  app.register(workoutPlanRoute);
  app.register(workoutSessionRoute);
}

export default function routes(app: FastifyInstance) {
  app.register(healthRoute);
  app.register(apiRoutes, { prefix: "/api" });
}
