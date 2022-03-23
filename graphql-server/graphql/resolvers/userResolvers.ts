import { login, register } from '../../controllers/login';
import { validateUser } from '../../middlewares/validators';

const resolvers = {
  Mutation: {
    login: (_: undefined, userCred: { userName: string; password: string }) => {
      validateUser(userCred);
      return login(userCred.userName, userCred.password);
    },
    register: (
      _: undefined,
      userCred: { userName: string; name: string; password: string }
    ) => {
      //validateUser(userCred);
      return register(userCred.userName,userCred.name,userCred.password);
    },
  },
};

export default resolvers;
