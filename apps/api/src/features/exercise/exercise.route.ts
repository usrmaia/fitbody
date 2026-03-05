import { FastifyInstance } from "fastify";
import { NotFound, Unauthorized } from "http-errors";

import {
  ExerciseBody,
  exerciseBodySchema,
  ExerciseParams,
  exerciseParamsSchema,
  ExerciseQueryOptions,
  exerciseQueryOptionsSchema,
  exerciseSchema,
  Result,
  resultSchema,
} from "@/packages/schemas";
import {
  getExercises,
  getExercise,
  createExercise,
  updateExercise,
} from "./exercise.service";

export default async function exerciseRoute(app: FastifyInstance) {
  app.get<{ Querystring: ExerciseQueryOptions; Reply: Result }>(
    "/exercises",
    {
      schema: {
        description: "Busca exercícios públicos e privados do usuário",
        tags: ["Exercise"],
        querystring: exerciseQueryOptionsSchema,
        response: {
          200: resultSchema(exerciseSchema.array()),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const { include, where, orderBy } = req.query;
      const exercises = await getExercises(
        { include, where, orderBy },
        sessionUser.user,
      );

      const result: Result = {
        success: true,
        data: exercises,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.get<{
    Params: ExerciseParams;
    Querystring: ExerciseQueryOptions;
    Reply: Result;
  }>(
    "/exercises/:exerciseId",
    {
      schema: {
        description: "Busca um exercício específico",
        tags: ["Exercise"],
        params: exerciseParamsSchema,
        querystring: exerciseQueryOptionsSchema,
        response: {
          200: resultSchema(exerciseSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const { exerciseId } = req.params;
      const { include } = req.query;
      const exercise = await getExercise(
        exerciseId,
        { include },
        sessionUser.user,
      );

      if (!exercise) throw new NotFound("EXERCISE_NOT_FOUND");

      const result: Result = {
        success: true,
        data: exercise,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.post<{
    Body: ExerciseBody;
    Querystring: ExerciseQueryOptions;
    Reply: Result;
  }>(
    "/exercises",
    {
      schema: {
        description: "Cria um novo exercício",
        tags: ["Exercise"],
        body: exerciseBodySchema,
        querystring: exerciseQueryOptionsSchema,
        response: {
          201: resultSchema(exerciseSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const { include } = req.query;
      const data = req.body;
      const exercise = await createExercise(
        { include, data },
        sessionUser.user,
      );

      const result: Result = {
        success: true,
        data: exercise,
        code: 201,
      };

      return reply.code(201).send(result);
    },
  );

  app.patch<{
    Body: ExerciseBody;
    Params: ExerciseParams;
    Querystring: ExerciseQueryOptions;
    Reply: Result;
  }>(
    "/exercises/:exerciseId",
    {
      schema: {
        description: "Atualiza um exercício existente",
        tags: ["Exercise"],
        params: exerciseParamsSchema,
        querystring: exerciseQueryOptionsSchema,
        body: exerciseBodySchema,
        response: {
          200: resultSchema(exerciseSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const { exerciseId } = req.params;
      const { include } = req.query;
      const data = req.body;
      const exercise = await updateExercise(
        exerciseId,
        { include, data },
        sessionUser.user,
      );

      if (!exercise) throw new NotFound("EXERCISE_NOT_FOUND");

      const result: Result = {
        success: true,
        data: exercise,
        code: 200,
      };

      return reply.send(result);
    },
  );
}
