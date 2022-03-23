import balloonTypeDef from './schemas/balloonSchema';
import userTypeDef from './schemas/userSchema';
import balloonResolvers from './resolvers/balloonResolvers';
import userResolvers from './resolvers/userResolvers';

export const typeDefs = [userTypeDef, balloonTypeDef];
export const resolvers = [userResolvers, balloonResolvers];
