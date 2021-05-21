import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import {
  EntitiesView,
  NamesView,
  BlocksView,
  TransactionsView,
  ReceiptsView,
  LogsView,
  TracesView,
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
    <Route path="/blocks">
      <BlocksView />
    </Route>
    <Route path="/transactions">
      <TransactionsView />
    </Route>
    <Route path="/receipts">
      <ReceiptsView />
    </Route>
    <Route path="/logs">
      <LogsView />
    </Route>
    <Route path="/traces">
      <TracesView />
    </Route>
  </Switch>
);
