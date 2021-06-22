import { BaseView } from '@components/BaseView';
import { Console } from '@components/Console';
import { Result, toFailedResult, toSuccessfulData } from '@hooks/useCommand';
import { runCommand } from '@modules/core';
import { createErrorNotification } from '@modules/error_notification';
import { Checkbox, Divider, Input } from 'antd';
import { either as Either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AccountEventsLocation,
  AccountFunctionsLocation,
  AccountTransactionsLocation,
  DashboardAccountsLocation
} from '../../../../locations';
import { cookieVars } from '../../../../utils';
import { AccountEvents } from './Tabs/Events';
import { AccountFunctions } from './Tabs/Functions';
import { AccountTransactions } from './Tabs/Transactions';

export const AccountsView = () => {
  const [articulate, setArticulate] = useState(false);
  const [accounting, setAccounting] = useState(false);
  const [denom, setDenom] = useState('wei');
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
          first_record: 0,
          max_records: 200,
          cache_txs: true,
          cache_traces: true,
          reversed: true,
          // staging: true,
          // unripe: true,
          ether: denom === 'ether',
          dollars: denom === 'dollars',
          articulate: articulate,
          accounting: accounting,
        });
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
        );
        setTransactions(result);
        setLoading(false);
      }
    })();
  }, [currentAddress, articulate, accounting, denom]);

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

  const onArticulate = useCallback(
    () => setArticulate(!articulate),
    []
  );
  const onAccounting = useCallback(
    () => setAccounting(!accounting),
    []
  );
  const onEther = useCallback(
    () => denom === 'ether' ? setDenom('dollars') : setDenom('ether'),
    []
  );
  const onDollars = useCallback(
    () => denom === 'dollars' ? setDenom('ether') : setDenom('dollars'),
    []
  );

  return (
    <div>
      <Checkbox checked={articulate} onChange={(event) => onArticulate()}>articulate</Checkbox>
      <Checkbox checked={accounting} onChange={(event) => onAccounting()}>accounting</Checkbox>
      <Checkbox checked={denom === 'ether'} onChange={(event) => onEther()}>ether</Checkbox>
      <Checkbox checked={denom === 'dollars'} onChange={(event) => onDollars()}>dollars</Checkbox>
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
