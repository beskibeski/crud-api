import USER from '../models/user';

const validateUser = (userData: any): boolean => {
  const user: Partial<USER> = JSON.parse(userData);
  return user.username && user.age && user.hobbies ? true : false;  
}

export default validateUser;