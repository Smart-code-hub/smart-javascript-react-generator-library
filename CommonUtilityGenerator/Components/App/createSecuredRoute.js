const V = require("voca");
const CreateSecuredRouteComponent = () => {
  return `
  import React, { useEffect } from "react";
    import { Route, Redirect } from "react-router-dom";
    import { useSelector } from "react-redux";
    import axios from "axios";

const SecuredRoutes = ({ component: Component, ...rest }) => {
  const { isLoggedIn, user } = useSelector((state) => state.authState);
  const { token } = user;
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      const authInterceptor = axios.interceptors.request.use(function () {
        axios.defaults.headers.common['Authorization'] = token;
      });
      return () => {
        axios.interceptors.request.eject(authInterceptor);
      };
    }
  }, [token, isLoggedIn]);
  
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      render={(props) => {
        debugger;
        return (
            <Component {...props} />
        );
      }}
      {...rest}
    />
  );
};
export default SecuredRoutes;

  `;
};

module.exports = { CreateSecuredRouteComponent };
