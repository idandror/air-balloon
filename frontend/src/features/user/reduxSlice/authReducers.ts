export const API_URL_REST = 'http://localhost:5000/api/users';

//Logout user

const logout = () => sessionStorage.removeItem('user');
const authReducers = {
  logout,
};

export default authReducers;
