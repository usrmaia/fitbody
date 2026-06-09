import { FastifyInstance } from "fastify";
import { NotFound, Unauthorized } from "http-errors";

import {
  resultSchema,
  WorkoutPlanQueryOptions,
  workoutPlanQueryOptionsSchema,
  workoutPlanSchema,
  Result,
  WorkoutPlanParams,
  workoutPlanParamsSchema,
  WorkoutPlan,
  workoutPlanBodySchema,
  WorkoutDayBody,
  WorkoutDayParams,
  workoutDayParamsSchema,
  workoutDayBodySchema,
  WorkoutDayQueryOptions,
  workoutDayQueryOptionsSchema,
  workoutDayExerciseParamsSchema,
  WorkoutDayExerciseParams,
  WorkoutDayExerciseQueryOptions,
  workoutDayExerciseQueryOptionsSchema,
  workoutDayExerciseBodySchema,
} from "@/packages/schemas";
import {
  cloneWorkoutPlan,
  createWorkoutPlan,
  creteWorkoutDay,
  deleteWorkoutDay,
  deleteWorkoutDayExercises,
  deleteWorkoutPlan,
  getWorkoutDay,
  getWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutDay,
  updateWorkoutPlan,
} from "./workout-plan.service";

export default async function workoutPlanRoute(app: FastifyInstance) {
  app.get<{
    Params: WorkoutPlanParams;
    Querystring: WorkoutPlanQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId",
    {
      schema: {
        description: "Busca um plano de treino específico",
        tags: ["WorkoutPlan"],
        params: workoutPlanParamsSchema,
        querystring: workoutPlanQueryOptionsSchema,
        response: {
          200: resultSchema(workoutPlanSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const { workoutPlanId } = req.params;
      const args = req.query;
      const plan = await getWorkoutPlan(workoutPlanId, args, sessionUser.user);

      if (!plan) throw new NotFound("WORKOUTPLAN_NOT_FOUND");

      const result: Result = {
        success: true,
        data: plan,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.get<{ Querystring: WorkoutPlanQueryOptions; Reply: Result }>(
    "/workout-plans",
    {
      schema: {
        description: "Busca planos de treino públicos e privados do usuário",
        tags: ["WorkoutPlan"],
        querystring: workoutPlanQueryOptionsSchema,
        response: {
          200: resultSchema(workoutPlanSchema.array()),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const args = req.query;
      const plans = await getWorkoutPlans(args, sessionUser.user);

      const result: Result = {
        success: true,
        data: plans,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.post<{
    Body: WorkoutPlan;
    Querystring: WorkoutPlanQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans",
    {
      schema: {
        description: "Cria um novo plano de treino",
        tags: ["WorkoutPlan"],
        body: workoutPlanBodySchema,
        querystring: workoutPlanQueryOptionsSchema,
        response: {
          201: resultSchema(workoutPlanSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTPLAN_CREATE_UNAUTHORIZED");

      const { include } = req.query;
      const data = req.body;
      const plan = await createWorkoutPlan({ include, data }, sessionUser.user);

      const result: Result = {
        success: true,
        data: plan,
        code: 201,
      };

      return reply.send(result);
    },
  );

  app.patch<{
    Body: WorkoutPlan;
    Params: WorkoutPlanParams;
    Querystring: WorkoutPlanQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId",
    {
      schema: {
        description: "Atualiza um plano de treino",
        tags: ["WorkoutPlan"],
        body: workoutPlanBodySchema,
        params: workoutPlanParamsSchema,
        querystring: workoutPlanQueryOptionsSchema,
        response: {
          200: resultSchema(workoutPlanSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTPLAN_UPDATE_UNAUTHORIZED");

      const { workoutPlanId } = req.params;
      const { include } = req.query;
      const data = req.body;
      const plan = await updateWorkoutPlan(
        workoutPlanId,
        { include, data },
        sessionUser.user,
      );

      if (!plan) throw new NotFound("WORKOUTPLAN_NOT_FOUND");

      const result: Result = {
        success: true,
        data: plan,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.post<{ Params: WorkoutPlanParams; Querystring: WorkoutPlanQueryOptions }>(
    "/workout-plans/:workoutPlanId/clone",
    {
      schema: {
        description: "Clona um plano de treino",
        tags: ["WorkoutPlan"],
        params: workoutPlanParamsSchema,
        querystring: workoutPlanQueryOptionsSchema,
        response: {
          200: resultSchema(workoutPlanSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTPLAN_CLONE_UNAUTHORIZED");

      const { workoutPlanId } = req.params;
      const { include } = req.query;
      const clone = await cloneWorkoutPlan(
        workoutPlanId,
        { include },
        sessionUser.user,
      );

      if (!clone) throw new NotFound("WORKOUTPLAN_NOT_FOUND");

      const result: Result = {
        success: true,
        data: clone,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.delete<{
    Params: WorkoutPlanParams;
    Querystring: WorkoutPlanQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId",
    {
      schema: {
        description: "Deleta um plano de treino",
        tags: ["WorkoutPlan"],
        params: workoutPlanParamsSchema,
        querystring: workoutPlanQueryOptionsSchema,
        response: {
          200: resultSchema(workoutPlanSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTPLAN_DELETE_UNAUTHORIZED");

      const { workoutPlanId } = req.params;
      const { include } = req.query;
      const deleted = await deleteWorkoutPlan(
        workoutPlanId,
        { include },
        sessionUser.user,
      );

      if (!deleted) throw new NotFound("WORKOUTPLAN_NOT_FOUND");

      const result: Result = {
        success: true,
        data: deleted,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.get<{
    Params: WorkoutDayParams;
    Querystring: WorkoutDayQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId/workout-days/:workoutDayId",
    {
      schema: {
        description: "Busca um dia de treino específico de um plano de treino",
        tags: ["WorkoutDay"],
        params: workoutDayParamsSchema,
        querystring: workoutDayQueryOptionsSchema,
        response: {
          200: resultSchema(workoutDayBodySchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized("WORKOUTDAY_FETCH_UNAUTHORIZED");

      const { workoutPlanId, workoutDayId } = req.params;
      const { include } = req.query;
      const day = await getWorkoutDay(
        workoutPlanId,
        workoutDayId,
        { include },
        sessionUser.user,
      );

      if (!day) throw new NotFound("WORKOUTDAY_NOT_FOUND");

      const result: Result = {
        success: true,
        data: day,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.post<{
    Params: WorkoutPlanParams;
    Body: WorkoutDayBody;
    Querystring: WorkoutDayQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId/workout-days",
    {
      schema: {
        description: "Cria um novo dia de treino em um plano de treino",
        tags: ["WorkoutDay"],
        params: workoutPlanParamsSchema,
        body: workoutDayBodySchema,
        querystring: workoutDayQueryOptionsSchema,
        response: {
          201: resultSchema(workoutDayBodySchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTDAY_CREATE_UNAUTHORIZED");

      const { workoutPlanId } = req.params;
      const data = req.body;
      const { include } = req.query;
      const day = await creteWorkoutDay(
        workoutPlanId,
        { include, data },
        sessionUser.user,
      );

      const result: Result = {
        success: true,
        data: day,
        code: 201,
      };

      return reply.send(result);
    },
  );

  app.patch<{
    Body: WorkoutDayBody;
    Params: WorkoutDayParams;
    Querystring: WorkoutDayQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId/workout-days/:workoutDayId",
    {
      schema: {
        description: "Atualiza um dia de treino de um plano de treino",
        tags: ["WorkoutDay"],
        body: workoutDayBodySchema,
        params: workoutDayParamsSchema,
        querystring: workoutDayQueryOptionsSchema,
        response: {
          200: resultSchema(workoutDayBodySchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTDAY_UPDATE_UNAUTHORIZED");

      const { workoutDayId, workoutPlanId } = req.params;
      const data = req.body;
      const { include } = req.query;
      const day = await updateWorkoutDay(
        workoutPlanId,
        workoutDayId,
        { include, data },
        sessionUser.user,
      );

      if (!day) throw new NotFound("WORKOUTDAY_NOT_FOUND");

      const result: Result = {
        success: true,
        data: day,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.delete<{
    Params: WorkoutDayParams;
    Querystring: WorkoutDayQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId/workout-days/:workoutDayId",
    {
      schema: {
        description: "Deleta um dia de treino de um plano de treino",
        tags: ["WorkoutDay"],
        params: workoutDayParamsSchema,
        querystring: workoutDayQueryOptionsSchema,
        response: {
          200: resultSchema(workoutDayBodySchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTDAY_DELETE_UNAUTHORIZED");

      const { workoutDayId, workoutPlanId } = req.params;
      const { include } = req.query;
      const day = await deleteWorkoutDay(
        workoutPlanId,
        workoutDayId,
        { include },
        sessionUser.user,
      );

      if (!day) throw new NotFound("WORKOUTDAY_NOT_FOUND");

      const result: Result = {
        success: true,
        data: day,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.delete<{
    Params: WorkoutDayExerciseParams;
    Querystring: WorkoutDayExerciseQueryOptions;
    Reply: Result;
  }>(
    "/workout-plans/:workoutPlanId/workout-days/:workoutDayId/workout-day-exercises/:workoutDayExerciseId",
    {
      schema: {
        description:
          "Deleta um exercício de um dia de treino de um plano de treino",
        tags: ["WorkoutDayExercise"],
        params: workoutDayExerciseParamsSchema,
        querystring: workoutDayExerciseQueryOptionsSchema,
        response: {
          200: resultSchema(workoutDayExerciseBodySchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTDAYEXERCISE_DELETE_UNAUTHORIZED");

      const { workoutPlanId, workoutDayId, workoutDayExerciseId } = req.params;
      const { include } = req.query;
      const exercise = await deleteWorkoutDayExercises(
        workoutPlanId,
        workoutDayId,
        workoutDayExerciseId,
        { include },
        sessionUser.user,
      );

      if (!exercise) throw new NotFound("WORKOUTDAYEXERCISE_NOT_FOUND");

      const result: Result = {
        success: true,
        data: exercise,
        code: 200,
      };

      return reply.send(result);
    },
  );
}
