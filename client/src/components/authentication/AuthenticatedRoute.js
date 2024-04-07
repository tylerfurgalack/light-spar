import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, render: Render, user, ...rest }) => {
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  if (user !== null) {
    if (Component) {
      return <Component user={user} {...rest} />;
    }
    if (Render) {
      return <Render user={user} {...rest} />;
    }
  }
  return <Redirect to="/user-sessions/new" />;
};

const AuthenticatedRoute = ({ component, render, user, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck user={user} component={component} render={render} {...rest} />
    </Route>
  );
};

export default AuthenticatedRoute;
