import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../app/slices/userAuthSlice";
import axios from "../axios";

const useRefreshToken = () => {
  const { refreshToken, accessToken } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.post("/token", {
      token: refreshToken,
    });
    console.log(accessToken);
    console.log(response?.data?.accessToken);
    dispatch(setToken(response?.data?.accessToken));
    return response?.data?.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
