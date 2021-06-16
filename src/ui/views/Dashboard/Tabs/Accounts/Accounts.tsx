import { BaseView } from '@components/BaseView';
import React from 'react';
import {
  AccountFunctionsLocation, AccountTransactionsLocation
} from '../../../../locations';
import { cookieVars } from '../../../../utils';
import { AccountFunctions } from './Tabs/Functions';
import { AccountTransactions } from './Tabs/Transactions';

export const AccountsView = () => {
  const title = '';
  var tabs = [
    {name: "Transactions", location: AccountTransactionsLocation, component: <AccountTransactions />},
    {name: "Functions", location: AccountFunctionsLocation, component: <AccountFunctions />},
  ];
  return (
    <BaseView
      title={title}
      defaultActive={AccountTransactionsLocation}
      cookieName={cookieVars.dashboard_account_sub_tab}
      tabs={tabs}
      position='left'
    />
  );
};
