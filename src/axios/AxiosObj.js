import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

export const getAxiosWithToken = async (config) => {
  // Data
  let data = undefined;
  if (config.data) {
    data = config.data;
  }

  // Data
  let body = undefined;
  if (config.body) {
    body = config.body;
  }

  // Method
  let method = 'POST';
  if (config.method) {
    method = config.method;
  }

  // URL
  let URL = process.env.API_URL;
  if (config.url) {
    URL = config.url;
  }

  let response = await axios({
    method: method,
    url: `${process.env.API_URL}/${URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + secureLocalStorage.getItem('access'),
    },
    data: data,
    body: body
  });


  return response.data; //Return the response
};

export const getAxiosWithOutToken = async (config) => {
  // Data
  let data = undefined;
  if (config.data) {
    data = config.data;
  }

  // Method
  let method = 'POST';
  if (config.method) {
    method = config.method;
  }

  // URL
  let URL = process.env.API_URL;
  if (config.url) {
    URL = config.url;
  }

  let response = await axios({
    method: method,
    url: `${process.env.API_URL}/${URL}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  });

  return response.data; // Assign the value to the response variable
};
