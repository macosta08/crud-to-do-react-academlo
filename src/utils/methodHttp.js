import axios from "axios";

export const getMethod = async (url) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const postMethod = async (url, ) => {
  try {
    const res = await axios.post(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};
