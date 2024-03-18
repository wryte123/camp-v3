import axios from 'axios';

export const loginUser = async (user) => {
  try {
    const response = await axios.post('/login', user);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const registerUser = async (user) => {
  try {
    const response = await axios.post('/reg', user);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getCampsOfUser = async () => {

}