import type { FastifyInstance } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { isHttpError } from "http-errors";

import { logger } from "@/config";

export const errorHandler: FastifyInstance["errorHandler"] = (
  error,
  _,
  reply,
) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    logger.warn("Validation error: %o", error.validation);
    return reply.status(400).send({
      message: "Validation error",
      errors: error.validation,
    });
  }

  if (isHttpError(error)) {
    logger.warn("HTTP error: %o", {
      statusCode: error.statusCode,
      message: error.message,
    });
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }

  logger.error(error instanceof Error ? error.stack : (error as string));
  return reply.status(500).send({
    message:
      "An unexpected error occurred. Please try again later or contact support if the issue persists.",
  });
};
