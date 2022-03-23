import { IBalloon } from '../../types/interfaces';
import Balloon from '../../model/balloon';
import { addBalloon } from '../../controllers/addBalloon';
import { isAuth } from '../../middlewares/isAuth';
import { validateBalloon } from '../../middlewares/validators';

const resolvers = {
  Query: {
    getBalloons: async (_: undefined, {}, { token }: { token: string }) => {
      await isAuth(token);
      return await Balloon.find({});
    },
    getBalloon: async (
      _: undefined,
      { balloonId }: { balloonId: string },
      { token }: { token: string }
    ) => {
      await isAuth(token);
      return await Balloon.findById(balloonId);
    },
  },
  Mutation: {
    addBalloon: async (
      _: undefined,
      { balloon }: { balloon: IBalloon },
      { token }: { token: string }
    ) => {
      validateBalloon(balloon);
      await isAuth(token);
      return await addBalloon(balloon);
    },
  },
};

export default resolvers;
