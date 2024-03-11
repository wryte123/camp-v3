import axios from 'axios';

export const loginUser = async (user) =>{
  try {
    const response = await axios.post('/api/login', user);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


