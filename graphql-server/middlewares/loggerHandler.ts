import { GraphQLRequestContext } from 'apollo-server-core';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';
const pinoLogger = pino();

export const loggerPlugin = {
  async requestDidStart<TContext>(
    requestContext: GraphQLRequestContext<TContext>
  ) {
    requestContext.logger = pinoLogger.child({ requestId: uuidv4() });
    requestContext.logger.info({
      operationName: requestContext.request.operationName,
      query: requestContext.request.query,
      variables: requestContext.request.variables,
    });
    return {
      async didEncounterErrors<TContext>({
        logger,
        errors,
      }: GraphQLRequestContext<TContext>) {
        errors?.forEach((error) => logger.error(error));
      },
      async willSendResponse<TContext>({
        logger,
        errors,
        response,
      }: GraphQLRequestContext<TContext>) {
        if (!errors) logger.info(response);
      },
    };
  },
};
