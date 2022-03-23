import { ApolloError } from 'apollo-server-core';
import { IBalloon } from '../types/interfaces';
import {
  balloonSchemaValidator,
  userSchemaValidator,
} from './schemasValidator';

export const validateUser = (userCred: {
  userName: string;
  password: string;
}) => {
  const { error } = userSchemaValidator.validate(userCred);
  if (error) {
    const msg = error.details.map((err) => err.message).join(',');
    throw new ApolloError(`Bad request`, '404');
  }
};

export const validateBalloon = (balloon: IBalloon) => {
  const { error } = balloonSchemaValidator.validate(balloon);
  if (error) {
    const msg = error.details.map((err) => err.message).join(',');
    throw new ApolloError(`Bad request`, '404');
  }
};
