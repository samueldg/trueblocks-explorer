import { BaseView } from '@components/BaseView';
import { createErrorNotification } from '@modules/error_notification';
import { Divider, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AccountEventsLocation,
  AccountFunctionsLocation,
  AccountTransactionsLocation,
  DashboardAccountsLocation,
} from '../../../../locations';
import { cookieVars } from '../../../../utils';
import { AccountEvents } from './Tabs/Events';
import { AccountFunctions } from './Tabs/Functions';
import { AccountTransactions } from './Tabs/Transactions';
import { either as Either } from 'fp-ts';
import { runCommand } from '@modules/core';
import { pipe } from 'fp-ts/lib/function';
import { toSuccessfulData, toFailedResult, Result } from '@hooks/useCommand';
import { Console } from '@components/Console';
import { useLocation } from 'react-router-dom';

export const AccountsView = () => {
  const [currentAddress, setCurrentAddress] = useState('');
  const emptyData = { data: [{}], meta: {} };
  const [transactions, setTransactions] = useState<Result>(toSuccessfulData(emptyData));
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const parts = location.pathname.split('/');
  const address = parts[parts.length - 1];

  useEffect(() => {
    if (address !== currentAddress && address?.slice(0, 2) === '0x') {
      setCurrentAddress(address);
    }
  }, [address]);

  useEffect(() => {
    (async () => {
      if (currentAddress.slice(0, 2) === '0x') {
        setLoading(true);
        const eitherResponse = await runCommand('export', {
          addrs: currentAddress,
          fmt: 'json',
          //articulate: true,
          //accounting: true,
          max_records: 2000,
          ether: true,
          cache_txs: true,
          cache_traces: true,
        });
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
        );
        setTransactions(result);
        setLoading(false);
      }
    })();
  }, [currentAddress]);

  if (transactions.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch transactions',
    });
  }

  const getData = useCallback((response) => (response.status === 'fail' ? [] : response.data), []);
  const title = '';
  var tabs = [
    {
      name: 'Transactions',
      location: `${AccountTransactionsLocation}${currentAddress ? `/${currentAddress}` : ''}`,
      component: <AccountTransactions data={getData(transactions)} loading={loading} />,
    },
    {
      name: 'Functions',
      location: `${AccountFunctionsLocation}${currentAddress ? `/${currentAddress}` : ''}`,
      component: <AccountFunctions data={getData(transactions)} loading={loading} />,
    },
    {
      name: 'Events',
      location: `${AccountEventsLocation}${currentAddress ? `/${currentAddress}` : ''}`,
      component: <AccountEvents data={getData(transactions)} loading={loading} />,
    },
  ];

  return (
    <div>
      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <h3 style={{ marginRight: '12px', flexShrink: 0 }}>Viewing account:</h3>
        <Input
          disabled={loading}
          placeholder={'Input an address'}
          value={currentAddress}
          onChange={(e) => setCurrentAddress(e.target.value)}
        />
        <Console style={{ position: 'absolute', right: '8px' }} />
      </div>

      <Divider />
      <BaseView
        title={title}
        defaultActive={AccountTransactionsLocation}
        baseActive={DashboardAccountsLocation}
        cookieName={cookieVars.dashboard_account_sub_tab}
        subBase={true}
        tabs={tabs}
        position='left'
      />
    </div>
  );
};
