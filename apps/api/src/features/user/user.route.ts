import { FastifyInstance } from "fastify";
import { Forbidden, NotFound, Unauthorized } from "http-errors";

import {
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
  updateUser,
} from "./user.service";
import {
  ProfileBody,
  profileBodySchema,
  ProfileQueryOptions,
  profileQueryOptionsSchema,
  profileUserSchema,
  Result,
  resultSchema,
  UserBody,
  userBodySchema,
  UserParams,
  userParamsSchema,
  userSchema,
} from "@/packages/schemas";

export default async function userRoute(app: FastifyInstance) {
  app.patch<{ Body: UserBody; Params: UserParams; Reply: Result }>(
    "/users/:userId",
    {
      schema: {
        description: "Atualiza um usuário específico",
        tags: ["User"],
        params: userParamsSchema,
        body: userBodySchema,
        response: {
          200: resultSchema(userSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const userId = req.params.userId;
      if (sessionUser.user.id !== userId) throw new Forbidden();

      const data = req.body;
      const user = await updateUser(userId, { data });

      if (!user) throw new NotFound("USER_NOT_FOUND");

      const result: Result = {
        success: true,
        data: user,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.get<{ Querystring: ProfileQueryOptions; Reply: Result }>(
    "/users/profiles",
    {
      schema: {
        description: "Busca os perfis dos usuários",
        tags: ["Profile"],
        querystring: profileQueryOptionsSchema,
        response: {
          200: resultSchema(profileUserSchema.array()),
        },
      },
    },
    async (req, reply) => {
      const { include } = req.query;
      const profiles = await getProfiles({ include });

      const result: Result = {
        success: true,
        data: profiles,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.get<{
    Params: UserParams;
    Querystring: ProfileQueryOptions;
    Reply: Result;
  }>(
    "/users/:userId/profiles",
    {
      schema: {
        description: "Busca o perfil de um usuário específico",
        tags: ["Profile"],
        params: userParamsSchema,
        querystring: profileQueryOptionsSchema,
        response: {
          200: resultSchema(profileUserSchema),
        },
      },
    },
    async (req, reply) => {
      const userId = req.params.userId;
      const { include } = req.query;
      const profile = await getProfile(userId, { include });

      if (!profile) throw new NotFound("USER_NOT_FOUND");

      const result: Result = {
        success: true,
        data: profile,
        code: 200,
      };

      return reply.send(result);
    },
  );

  app.post<{
    Body: ProfileBody;
    Params: UserParams;
    Querystring: ProfileQueryOptions;
    Reply: Result;
  }>(
    "/users/:userId/profiles",
    {
      schema: {
        description: "Cria o perfil de um usuário específico",
        tags: ["Profile"],
        params: userParamsSchema,
        body: profileBodySchema,
        querystring: profileQueryOptionsSchema,
        response: {
          201: resultSchema(profileUserSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const userId = req.params.userId;
      if (sessionUser.user.id !== userId) throw new Forbidden();

      const { include } = req.query;
      const data = req.body;
      const profile = await createProfile(userId, { include, data });

      if (!profile) throw new NotFound("USER_NOT_FOUND");

      const result: Result = {
        success: true,
        data: profile,
        code: 201,
      };

      return reply.code(201).send(result);
    },
  );

  app.patch<{
    Body: ProfileBody;
    Params: UserParams;
    Querystring: ProfileQueryOptions;
    Reply: Result;
  }>(
    "/users/:userId/profiles",
    {
      schema: {
        description: "Atualiza o perfil de um usuário específico",
        tags: ["Profile"],
        params: userParamsSchema,
        body: profileBodySchema,
        querystring: profileQueryOptionsSchema,
        response: {
          200: resultSchema(profileUserSchema),
        },
      },
    },
    async (req, reply) => {
      const sessionUser = req.sessionUser;
      if (!sessionUser) throw new Unauthorized();

      const userId = req.params.userId;
      if (sessionUser.user.id !== userId) throw new Forbidden();

      const { include } = req.query;
      const data = req.body;
      const profile = await updateProfile(userId, { include, data });

      if (!profile) throw new NotFound("USER_NOT_FOUND");

      const result: Result = {
        success: true,
        data: profile,
        code: 200,
      };

      return reply.send(result);
    },
  );
}
