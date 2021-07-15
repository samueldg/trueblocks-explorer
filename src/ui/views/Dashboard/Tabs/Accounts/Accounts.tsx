import { BaseView, ViewParams, ViewTab } from '@components/BaseView';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Checkbox, Divider, Input, PageHeader, Progress, Tabs } from 'antd';
import {
  DashboardAccountsAssetsLocation,
  DashboardAccountsChartsLocation,
  DashboardAccountsEventsLocation,
  DashboardAccountsFunctionsLocation,
  DashboardAccountsGasLocation,
  DashboardAccountsHistoryLocation,
  DashboardAccountsLocation,
  DashboardAccountsNeighborsLocation,
} from '../../../../Routes';
import React, { useCallback, useEffect, useState } from 'react';
import { Reconciliation, ReconciliationArray, Transaction } from '@modules/types';
import { Result, emptyData, toFailedResult, toSuccessfulData } from '@hooks/useCommand';
import { useHistory, useLocation } from 'react-router-dom';

import { Assets } from './LeftTabs/Assets';
import { Charts } from './LeftTabs/Charts';
import { ColumnsType } from 'antd/lib/table';
import Cookies from 'js-cookie';
import { either as Either } from 'fp-ts';
import { Events } from './LeftTabs/Events';
import { Functions } from './LeftTabs/Functions';
import { Gas } from './LeftTabs/Gas';
import { History } from './LeftTabs/History';
import { Neighbors } from './LeftTabs/Neighbors';
import { addColumn } from '@components/Table';
import { cookieVars } from '../../../../utils';
import { createErrorNotification } from '@modules/error_notification';
import { createUseStyles } from 'react-jss';
import dayjs from 'dayjs';
import { pipe } from 'fp-ts/lib/function';
import { runCommand } from '@modules/core';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import useGlobalState from '../../../../state';

function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const { TabPane } = Tabs;

export const AccountsView = ({
  loading,
  setLoading,
  accountAddress,
  setAccountAddress,
  totalRecords,
  setTotalRecords,
  transactions,
  setTransactions,
}: {
  loading: boolean;
  setLoading: any;
  accountAddress: string;
  setAccountAddress: any;
  totalRecords: number | null;
  setTotalRecords: any;
  transactions: Result | null;
  setTransactions: any;
}) => {
  const [staging, setStaging] = useState(false);
  const [denom, setDenom] = useState('ether');
  const [tempAddress, setTempAddress] = useState(accountAddress);

  const onStaging = () => setStaging(!staging);
  const onEther = () => {
    denom === 'ether' ? setDenom('') : setDenom('ether');
    setTransactions(toSuccessfulData(emptyData));
  };
  const onDollars = useCallback(() => {
    denom === 'dollars' ? setDenom('') : setDenom('dollars');
    setTransactions(toSuccessfulData(emptyData));
  }, []);

  const debouncedSearchTerm: string = useDebounce<string>(tempAddress, 800);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setAccountAddress(debouncedSearchTerm);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const addressInput = (
    <Input
      disabled={loading}
      placeholder={'Input an address'}
      value={tempAddress}
      onChange={(e) => {
        setTransactions(toSuccessfulData(emptyData));
        setTempAddress(e.target.value);
      }}
    />
  );

  const progressBar = (): JSX.Element => {
    if (!transactions || !transactions.data) return <></>;
    if (!totalRecords) return <></>;
    if (transactions.data.length === totalRecords) return <></>;
    const pct = Math.floor((transactions.data.length / (totalRecords || 1)) * 100);
    return (
      <Progress style={{ width: '200px', position: 'absolute', right: '8px' }} percent={pct} strokeLinecap='square' />
    );
  };

  const getData = useCallback((response) => (response?.status === 'fail' ? [] : response?.data), []);
  const theData = getData(transactions);
  const getMeta = useCallback((response) => (response?.status === 'fail' ? [] : response?.meta), []);

  const leftSideTabs: ViewTab[] = [
    {
      name: 'History',
      location: DashboardAccountsHistoryLocation,
      component: <History theData={theData} loading={loading} accountAddress={accountAddress} />,
    },
    {
      name: 'Assets',
      location: DashboardAccountsAssetsLocation,
      component: <Assets theData={theData} loading={loading} accountAddress={accountAddress} />,
    },
    {
      name: 'Neighbors',
      location: DashboardAccountsNeighborsLocation,
      component: <Neighbors theData={theData} loading={loading} accountAddress={accountAddress} />,
    },
    {
      name: 'Gas',
      location: DashboardAccountsGasLocation,
      component: <Gas theData={theData} loading={loading} accountAddress={accountAddress} />,
    },
    {
      name: 'Charts',
      location: DashboardAccountsChartsLocation,
      component: <Charts theData={theData} loading={loading} accountAddress={accountAddress} />,
    },
    {
      name: 'Functions',
      location: DashboardAccountsFunctionsLocation,
      component: <Functions theData={theData} loading={loading} accountAddress={accountAddress} />,
    },
    {
      name: 'Events',
      location: DashboardAccountsEventsLocation,
      component: <Events theData={theData} loading={loading} accountAddress={accountAddress} />,
    },
  ];

  // console.log('AccountsView');
  return (
    <div>
      <Checkbox checked={staging} onChange={(event) => onStaging()}>
        staging
      </Checkbox>
      <Checkbox checked={denom === 'ether'} onChange={(event) => onEther()}>
        ether
      </Checkbox>
      <Checkbox checked={denom === 'dollars'} onChange={(event) => onDollars()}>
        dollars
      </Checkbox>
      <AddressBar input={addressInput} progress={progressBar()} />
      <Divider style={{ height: '1px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '20fr 1fr' }}>
        <BaseView
          defaultActive={DashboardAccountsHistoryLocation}
          baseActive={DashboardAccountsLocation}
          cookieName={cookieVars.dashboard_account_sub_tab}
          tabs={leftSideTabs}
          position='left'
          subBase={true}
        />
        <div></div>
      </div>
    </div>
  );
};

const AddressBar = ({ input, progress }: { input: JSX.Element; progress: JSX.Element }) => {
  return (
    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <h3 style={{ marginRight: '12px', flexShrink: 0 }}>Accounting for </h3>
      {input}
      {progress}
    </div>
  );
};

export const renderAsNamedAddress = (address: string, acctFor: string) => {
  const { names } = useGlobalState();

  const isCurrent = address === acctFor;
  const isSpecial = address === '0xPrefund' || address === '0xBlockReward' || address === '0xUncleReward';

  let name = names && names[address] && names[address].name;
  if (!isSpecial && !isCurrent && !name) {
    return <div style={{ color: 'grey' }}>{address}</div>;
  }

  let style = isCurrent ? { color: 'green' } : { color: 'blue' };
  if (isSpecial) {
    name = '';
    style = { color: 'blue' };
  }

  const addr =
    name === '' || name === undefined
      ? address
      : '[' + address?.substr(0, 6) + '...' + address?.substr(address.length - 4, address.length) + '] ';
  return (
    <div style={style}>
      {addr}
      {name}
    </div>
  );
};

export const transactionSchema: ColumnsType<Transaction> = [
  addColumn({
    title: 'Date',
    dataIndex: 'date',
    configuration: {
      width: '15%',
      render: (field: any, record: Transaction) => {
        if (!record) return <div></div>;
        return (
          <pre>
            <div>{dayjs(record.date).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>{dayjs.unix(record.timestamp).fromNow()}</div>
            <div style={{ fontSize: 'small', fontStyle: 'italic' }}>
              {record.blockNumber?.toString() + '.' + record.transactionIndex?.toString()}
            </div>
          </pre>
        );
      },
    },
  }),
  addColumn({
    title: 'From / To',
    dataIndex: 'from',
    configuration: {
      width: '30%',
      render: (unused: any, record: Transaction) => {
        if (!record) return <div></div>;
        const to = record.to === record.extraData ? <div style={style}>{record.to}</div> : record.to;
        return (
          <pre>
            {renderAsNamedAddress(record.from, record.extraData)}
            {renderAsNamedAddress(record.to, record.extraData)}
          </pre>
        );
      },
    },
  }),
  addColumn({
    title: 'Reconciliations (asset, beg, in, out, gasOut, end, check)',
    dataIndex: 'compressedTx',
    configuration: {
      width: '50%',
      render: (item, record) => {
        item = record.compressedTx;
        if (item === '' && record.from === '0xPrefund') item = '0xPrefund';
        if (item === '' && record.from === '0xBlockReward') item = '0xBlockReward';
        if (item === '' && record.from === '0xUncleReward') item = '0xUncleReward';
        return (
          <div style={{ border: '1px solid darkgrey' }}>
            <div
              style={{
                padding: '2px',
                paddingLeft: '5px',
                backgroundColor: 'lightgrey',
                color: '#222222',
                overflowX: 'hidden',
              }}>
              {item}
            </div>
            <div>{renderStatements(record.statements)}</div>
          </div>
        );
      },
    },
  }),
  addColumn({
    title: '',
    dataIndex: 'statements',
    configuration: {
      width: '5%',
      render: (item, record, index) => (
        <>
          <a target='_blank' href={'http://etherscan.io/tx/' + record.hash}>
            ES
          </a>{' '}
          - {index}
        </>
      ),
    },
  }),
];

export const renderStatements = (statements: ReconciliationArray) => {
  const styles = useStyles();
  if (statements === null) return <></>;
  return (
    <table className={style.table}>
      <tbody>
        {statements?.map((statement, i) => {
          return (
            <Statement
              key={
                statement.blockNumber * 100000 + statement.transactionIndex + statement.assetSymbol ||
                `${i}-${Math.random()}`
              }
              statement={statement}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const ReconIcon = ({ reconciled }: { reconciled: boolean }) => {
  return (
    <div>
      {reconciled ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />}
    </div>
  );
};

const Statement = ({ statement }: { statement: Reconciliation }) => {
  const styles = useStyles();

  return (
    <tr className={styles.row} key={statement.assetSymbol || Math.random()}>
      <td key={`${1}-${Math.random()}`} className={styles.col} style={{ width: '12%' }}>
        {statement.assetSymbol?.slice(0, 5)}
      </td>
      <td key={`${2}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.begBal)}
      </td>
      <td key={`${3}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.totalIn)}
      </td>
      <td key={`${4}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.totalOut)}
      </td>
      <td key={`${5}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.gasCostOut, true)}
      </td>
      <td key={`${6}-${Math.random()}`} className={styles.col} style={{ width: '17%' }}>
        {clip(statement.endBal)}
      </td>
      <td key={`${7}-${Math.random()}`} className={styles.col} style={{ width: '4%' }}>
        <ReconIcon reconciled={statement.reconciled} />
      </td>
    </tr>
  );
};

const clip = (num: string, is_gas?: boolean) => {
  const parts = num.split('.');
  if (parts.length === 0 || parts[0] === '')
    return (
      <div style={{ color: 'lightgrey' }}>
        {'0.000000'}
        {is_gas ? 'g' : ''}
      </div>
    );
  if (parts.length === 1)
    return (
      parts[0] +
      (
        <div>
          {'.000000'}
          {is_gas ? 'g' : ''}
        </div>
      )
    );
  return (
    <div>
      {parts[0] + '.' + parts[1].substr(0, 6)}
      {is_gas ? 'g' : ''}
    </div>
  );
};

const useStyles = createUseStyles({
  table: {},
  row: {},
  col: {
    textAlign: 'right',
    backgroundColor: '#fff7e6',
  },
});
