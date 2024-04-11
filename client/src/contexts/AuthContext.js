import { createContext, useReducer, useEffect } from "react";
import { AuthReducer } from "../components/reducers/AuthReducer.js";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "./constants.js";
import setAuthToken from "../utils/setAuthToken.js";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //Authenticate User Func
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${API_URL}/users`);

      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
      else {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  //Login Func
  const login = async (userForm) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, userForm);

      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.access_token
        );
        
      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return { success: false, message: error.message };
    }
  };

  //register func
  const register = async (registerForm) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/register`,
        registerForm
      );

      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return { success: false, message: error.message };
    }
  };

  //logout func
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  // upload bck func
  const upload = async (background) => {
    try {
      const response = await axios.post(`${API_URL}/users/upload`, background);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      return { success: false, message: error.message };
    }
  };

  //CONTEXT_DATA
  const authContextData = { login, register, logout, authState, upload };

  //Return Provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
