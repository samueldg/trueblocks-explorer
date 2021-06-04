import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  DashboardView,
  NamesView,
  ExplorerView,
  SupportView,
  SystemView,
} from './views';

export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <DashboardView />
    </Route>
    <Route path="/names">
      <NamesView />
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
