import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "./auth-request-api";

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  GUEST_LOGIN: "GUEST_LOGIN",
  LOGOUT_USER: "LOGOUT_USER",
  REGISTER_USER: "REGISTER_USER",
  ERROR_MESSAGE: "ERROR_MESSAGE",
  CLOSE_ERROR_MESSAGE: "CLOSE_ERROR_MESSAGE",
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const history = useHistory();

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.OPEN_ERROR_MESSAGE: {
        setErrorMessage(payload);
        return setIsErrorModalOpen(true);
      }
      case AuthActionType.CLOSE_ERROR_MESSAGE: {
        setErrorMessage(null);
        return setIsErrorModalOpen(false);
      }
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }
      case AuthActionType.GUEST_LOGIN: {
        return setAuth({
          user: "guest",
          loggedIn: true,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
        });
      }
      default:
        return auth;
    }
  };

  auth.getLoggedIn = async function () {
    const response = await api.getLoggedIn();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.SET_LOGGED_IN,
        payload: {
          loggedIn: response.data.loggedIn,
          user: response.data.user,
        },
      });
    }
  };

  auth.getErrorMessage = () => {
    if (errorMessage === null) {
      return null;
    }
    let str = JSON.stringify(errorMessage["error"]);
    return str.replace(/\"/g, "");
  };

  auth.checkIsErrorModalOpen = () => {
    return isErrorModalOpen;
  };

  auth.showErrorModal = function (error) {
    authReducer({
      type: AuthActionType.OPEN_ERROR_MESSAGE,
      payload: { error },
    });
  };

  auth.hideErrorModal = function () {
    authReducer({
      type: AuthActionType.CLOSE_ERROR_MESSAGE,
      payload: {},
    });
  };

  auth.registerUser = async function (
    firstName,
    lastName,
    userName,
    email,
    password,
    passwordVerify
  ) {
    try {
      const response = await api.registerUser(
        firstName,
        lastName,
        userName,
        email,
        password,
        passwordVerify
      );
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
          },
        });
        auth.loginUser(email, password);
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      let message = error.response.data.errorMessage;
      auth.showErrorModal(message);
    }
  };

  auth.loginUser = async function (email, password) {
    try {
      const response = await api.loginUser(email, password);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      let message = error.response.data.errorMessage;
      auth.showErrorModal(message);
    }
    if (auth.user) {
      console.log("FIRSTNAME IS :" + auth.user.firstName);
    }
    else{
        console.log("CANT GET FIRSTNAME");
    }
  };

  auth.guestLogin = function () {
    authReducer({
      type: AuthActionType.GUEST_LOGIN,
      payload: {},
    });
    history.push("/");
  }
  
  auth.logoutUser = async function () {
    const response = await api.logoutUser();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
      history.push("/");
    }
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    console.log("user initials: " + initials);
    return initials;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
