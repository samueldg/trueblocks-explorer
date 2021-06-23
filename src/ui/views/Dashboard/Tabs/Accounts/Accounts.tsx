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
  AccountReconciliationsLocation,
  AccountEventsLocation,
  AccountFunctionsLocation,
  AccountTransactionsLocation,
  DashboardAccountsLocation,
} from '../../../../locations';
import { cookieVars } from '../../../../utils';
import { AccountEvents } from './Tabs/Events';
import { AccountFunctions } from './Tabs/Functions';
import { AccountTransactions } from './Tabs/Transactions';
import { AccountReconciliations } from './Tabs/Reconciliations';

export const AccountsView = () => {
  const [articulate, setArticulate] = useState(false);
  const [accounting, setAccounting] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [max_records, setMaxRecords] = useState(200);
  const [tokens, setTokens] = useState(true);
  const [denom, setDenom] = useState('ether');
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

  // To get count:
  // nRecords = http://localhost:8080/list?count&appearances&addrs=0xf503017d7baf7fbc0fff7492b751025c6a78179b

  useEffect(() => {
    (async () => {
      if (currentAddress.slice(0, 2) === '0x') {
        setLoading(true);
        const eitherResponse = await runCommand('export', {
          addrs: currentAddress,
          fmt: 'json',
          cache_txs: true,
          cache_traces: true,
          // staging: true,
          // unripe: true,
          ether: denom === 'ether',
          dollars: denom === 'dollars',
          articulate: articulate,
          accounting: accounting,
          reversed: reversed,
          // first_record: 0,
          max_records: max_records,
          tokens: tokens,
        });
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
        );
        setTransactions(result);
        setLoading(false);
      }
    })();
  }, [currentAddress, denom, articulate, accounting, reversed, max_records, tokens]);

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
      component: <AccountTransactions data={getData(transactions)} loading={loading} currentAddress={currentAddress} />,
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
    {
      name: 'Reconciliations',
      location: `${AccountReconciliationsLocation}${currentAddress ? `/${currentAddress}` : ''}`,
      component: <AccountReconciliations data={getData(transactions)} loading={loading} />,
    },
  ];

  const onArticulate = () => setArticulate(!articulate);
  const onAccounting = () => setAccounting(!accounting);
  const onReversed = () => setReversed(!reversed);
  const onMaxRecords = () => setMaxRecords(max_records > 200 ? 200 : 5000);
  const onTokens = () => setTokens(!tokens);
  const onEther = () => {
    setAccounting(true);
    denom === 'ether' ? setDenom('') : setDenom('ether');
  };
  const onDollars = useCallback(() => {
    setAccounting(true);
    denom === 'dollars' ? setDenom('') : setDenom('dollars');
  }, []);

  return (
    <div>
      <Checkbox checked={max_records > 200} onChange={(event) => onMaxRecords()}>
        max_records
      </Checkbox>
      <Checkbox checked={tokens} onChange={(event) => onTokens()}>
        tokens
      </Checkbox>
      <Checkbox checked={reversed} onChange={(event) => onReversed()}>
        reversed
      </Checkbox>
      <Checkbox checked={articulate} onChange={(event) => onArticulate()}>
        articulate
      </Checkbox>
      <Checkbox checked={accounting} onChange={(event) => onAccounting()}>
        accounting
      </Checkbox>
      <Checkbox checked={denom === 'ether'} onChange={(event) => onEther()}>
        ether
      </Checkbox>
      <Checkbox checked={denom === 'dollars'} onChange={(event) => onDollars()}>
        dollars
      </Checkbox>
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
