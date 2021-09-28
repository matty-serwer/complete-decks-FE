import axios from 'axios';

const axiosWithAuth = () => {
  const accessToken = localStorage.getItem('accessToken')

  return axios.create({
    baseURL: "https://zpi0kzer01.execute-api.us-east-2.amazonaws.com/dev2",
    headers: {
      Authorization: accessToken
    }
  })
}

export default axiosWithAuth;