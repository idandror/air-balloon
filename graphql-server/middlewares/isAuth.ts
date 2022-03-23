import { ApolloError } from 'apollo-server-core';

import jwt, { JwtPayload } from 'jsonwebtoken';

export const isAuth = async (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    return { username: payload.username };
  } catch (err) {
    throw new ApolloError('Unauthorized user', '401');
  }
};
