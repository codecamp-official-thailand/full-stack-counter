import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import configRoute from "../../config/roles";

function PrivateRoutes(props) {
  const role = props.role;

  return (
    <Switch>
      {configRoute[role].allowedPath.map((item) => (
        <Route key={item.url} exact path={item.url}>
          <item.component setRole={props.setRole} />
        </Route>
      ))}
      <Redirect to={configRoute[role].redirectPath} />
    </Switch>
  );
}

export default PrivateRoutes;
