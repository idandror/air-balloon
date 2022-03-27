import jwt from 'jsonwebtoken';
import User from '../model/user';

export const login = async (userName: string, password: string) => {
  const user = await User.findOne({ UserName: userName });

  if (!user || !(await user.isCorrectPassword(password))) {
    throw new Error('Incorrect User Name or password');
  }
  return { userName, token: createToken('id', user._id, '7d') };
};

export const register = async (
  userName: string,
  name: string,
  password: string
) => {
  if (!userName || !password) {
    throw new Error('Incorrect User Name or password');
  }
  const user = await User.create({
    UserName: userName,
    Name: name,
    Password: password,
  });
  return { userName, token: createToken('id', user._id, '7d') };
};

const createToken = (dataName: string, data: string, expriesTime: string) => {
  return jwt.sign({ [dataName]: data }, process.env.JWT_SECRET as string, {
    expiresIn: expriesTime,
  });
};
