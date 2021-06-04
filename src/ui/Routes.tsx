import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import {
  DashboardView,

  ExplorerView, NamesView,

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
