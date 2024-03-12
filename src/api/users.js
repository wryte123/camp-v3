import axios from 'axios';

export const loginUser = async (user) =>{
  try {
    const response = await axios.post('/login', user);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


