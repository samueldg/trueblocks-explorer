import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  EntitiesView,
  NamesView,
} from './views';

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <EntitiesView />
    </Route>
    <Route path="/names">
      <NamesView />
    </Route>
    <Route path="/monitors">
      <div>Monitors</div>
    </Route>
  </Switch>
);
