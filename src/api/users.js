import axios from 'axios';

async function loginUser(user) {
  try {
    const response = await axios.post('/api/login', user);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default loginUser;
