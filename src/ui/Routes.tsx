import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  EntitiesView
} from './views';

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <EntitiesView />
    </Route>
    <Route path="/monitors">
      <div>Monitors</div>
    </Route>
  </Switch>
);
