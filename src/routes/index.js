import React from 'react';
import { Route, Switch } from 'react-router-dom';
import New from '../views/New';
import Team from '../views/Team';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/new"
          component={() => <New />}
        />
        <Route
          exact
          path="/team"
          component={() => <Team />}
        />
      </Switch>
    </div>
  );
}
