export const API_URL_REST = 'http://localhost:5000/api/users';

//Logout user

const logout = () => localStorage.removeItem('user');
const authReducers = {
  logout,
};

export default authReducers;
