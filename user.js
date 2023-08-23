import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function registerUser(
  emailId,
  password,
  userName,
  name,
  dateOfBirth,
  gender,
  mobile,
) {
  const url = createUrl('/user/register')
  const body = {
    emailId,
  password,
  userName,
  name,
  dateOfBirth,
  gender,
  mobile,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response.data
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function loginUser(emailId, password) {
  const url = createUrl('/api/EncryptedUser/login/');
  const body = {
    emailId,
    password,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.status);
    return response
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function getPosts(userId) {
  const url = createUrl('/api/posts/' + userId);
  const body = {
    userId,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.get(url, body)
    log(response.status);
    return response;
  } catch (ex) {
    log(ex);
    return null;
  }
}
