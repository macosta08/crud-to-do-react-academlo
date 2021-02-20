import axios from "axios";

export const getMethod = async (url) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};

