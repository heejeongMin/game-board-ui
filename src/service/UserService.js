import axios from "axios";

export const loginAPI = async (values) => {
  const apiResponse = await axios
    .post("http://localhost:8080/game/login", values, {
      withCredentials: true,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.code);
        console.error(error.response?.data.message);
        return error.response?.data;
      }

      //   if (error && error instanceof AxiosError) {
      //   } else if (err && err instanceof Error) setError(err.message);
    });

  console.log(apiResponse);
  return apiResponse;
};

export const logoutAPI = async (values) => {
  const apiResponse = await axios
    .post("http://localhost:8080/game/logout", values, {
      withCredentials: true,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.code);
        console.error(error.response?.data.message);
        return error.response?.data;
      }

      //   if (error && error instanceof AxiosError) {
      //   } else if (err && err instanceof Error) setError(err.message);
    });

  console.log(apiResponse);
  return apiResponse;
};
