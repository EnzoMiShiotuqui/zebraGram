import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/profile", config);
    const resData = await res.json();
    
    return resData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const userService = {
  profile,
};

export default userService;
