import { GraphQLError, GraphQLFormattedError } from 'graphql';

const INTERNAL_STATUS_CODE = 500;
const INTERNAL_ERR_MSG = 'Internal problem, Unable to access the server';

export const errorHandler = (err: GraphQLError): GraphQLFormattedError => {
  const codeNum = parseInt(err.extensions.exception?.code as string);
  const statusCode = codeNum ? codeNum : INTERNAL_STATUS_CODE;
  const message = codeNum ? err.message : INTERNAL_ERR_MSG;
  return {
    ...err,
    message,
    extensions: { statusCode },
  };
};
