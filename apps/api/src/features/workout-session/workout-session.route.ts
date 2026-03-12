import { FastifyInstance } from "fastify";
import { NotFound, Unauthorized } from "http-errors";

import {
  resultSchema,
  workoutSessionBodySchema,
  WorkoutSessionBody,
  workoutSessionQueryOptionsSchema,
  WorkoutSessionQueryOptions,
  workoutDayParamsSchema,
  WorkoutDayParams,
  WorkoutSessionParamsSchema,
  workoutSessionParamsSchema,
  Result,
} from "@/packages/schemas";
import {
  createWorkoutSession,
  getWorkoutSession,
  getWorkoutSessions,
  updateWorkoutSession,
} from "./workout-session.service";

export default async function workoutSessionRoute(app: FastifyInstance) {
  app.get<{
    Params: WorkoutSessionParamsSchema;
    Querystring: WorkoutSessionQueryOptions;
  }>(
    "/workout-sessions/:workoutSessionId",
    {
      schema: {
        description:
          "Recupera uma sessão de treino específica por ID, com opções de inclusão de dados relacionados.",
        tags: ["WorkoutSessions"],
        params: workoutSessionParamsSchema,
        querystring: workoutSessionQueryOptionsSchema,
        response: {
          200: resultSchema(workoutSessionBodySchema),
        },
      },
    },
    async (req, reply) => {
      const { workoutSessionId } = req.params;
      const { include } = req.query;
      const workoutSession = await getWorkoutSession(workoutSessionId, {
        include,
      });

      const result: Result = {
        data: workoutSession,
        success: true,
        code: 200,
      };

      reply.send(result);
    },
  );

  app.get<{
    Querystring: WorkoutSessionQueryOptions;
  }>(
    "/workout-sessions",
    {
      schema: {
        description:
          "Recupera uma lista de sessões de treino com base em critérios de filtragem, ordenação e inclusão de dados relacionados.",
        tags: ["WorkoutSessions"],
        querystring: workoutSessionQueryOptionsSchema,
        response: {
          200: resultSchema(workoutSessionBodySchema.array()),
        },
      },
    },
    async (req, reply) => {
      const { include, where, orderBy } = req.query;
      const workoutSessions = await getWorkoutSessions({
        include,
        where,
        orderBy,
      });

      const result: Result = {
        data: workoutSessions,
        success: true,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.post<{
    Body: WorkoutSessionBody;
    Params: WorkoutDayParams;
    Querystring: WorkoutSessionQueryOptions;
  }>(
    "/workout-sessions/:workoutDayId",
    {
      schema: {
        description:
          "Cria uma nova sessão de treino para um dia de treino específico.",
        tags: ["WorkoutSessions"],
        body: workoutSessionBodySchema,
        params: workoutDayParamsSchema,
        querystring: workoutSessionQueryOptionsSchema,
        response: {
          200: resultSchema(workoutSessionBodySchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTSESSION_FETCH_UNAUTHORIZED");

      const { workoutDayId } = req.params;
      const data = req.body;
      const { include } = req.query;
      const workoutSession = await createWorkoutSession(
        workoutDayId,
        { include, data },
        sessionUser.user,
      );
      if (!workoutSession) throw new NotFound("WORKOUTSESSION_NOT_FOUND");

      const result: Result = {
        data: workoutSession,
        success: !!workoutSession,
        code: 201,
      };

      return reply.code(201).send(result);
    },
  );

  app.patch<{
    Body: WorkoutSessionBody;
    Params: WorkoutSessionParamsSchema;
    Querystring: WorkoutSessionQueryOptions;
  }>(
    "/workout-sessions/:workoutSessionId",
    {
      schema: {
        description:
          "Atualiza uma sessão de treino existente para um dia de treino específico.",
        tags: ["WorkoutSessions"],
        body: workoutSessionBodySchema,
        params: workoutSessionParamsSchema,
        querystring: workoutSessionQueryOptionsSchema,
        response: {
          200: resultSchema(workoutSessionBodySchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser)
        throw new Unauthorized("WORKOUTSESSION_FETCH_UNAUTHORIZED");

      const { workoutSessionId } = req.params;
      const data = req.body;
      const { include } = req.query;
      const workoutSession = await updateWorkoutSession(
        workoutSessionId,
        data.workoutDayId,
        { include, data },
        sessionUser.user,
      );
      if (!workoutSession) throw new NotFound("WORKOUTSESSION_NOT_FOUND");

      const result: Result = {
        data: workoutSession,
        success: !!workoutSession,
        code: 200,
      };

      return reply.send(result);
    },
  );
}
