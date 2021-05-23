import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  EntitiesView,
  NamesView,
  ExplorerView,
  SupportView,
  SystemView,
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
    <Route path="/explorer">
      <ExplorerView />
    </Route>
    <Route path="/support">
      <SupportView />
    </Route>
    <Route path="/system">
      <SystemView />
    </Route>
  </Switch>
);
