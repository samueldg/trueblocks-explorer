import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { ViewTab } from '@components/BaseView';
import { addColumn, BaseTable } from '@components/Table';
import { Result, toFailedResult, toSuccessfulData } from '@hooks/useCommand';
import { runCommand } from '@modules/core';
import { createErrorNotification } from '@modules/error_notification';
import { Reconciliation, ReconciliationArray, Transaction } from '@modules/types';
import { Checkbox, Divider, Input, Tabs } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { either as Either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import useGlobalState from '../../../../state';
import { AccountTransactions } from './SubTabs/Transactions';

const { TabPane } = Tabs;

export const AccountsView = () => {
  const [staging, setStaging] = useState(false);
  const [denom, setDenom] = useState('ether');
  const emptyData = { data: [{}], meta: {} };
  const [transactions, setTransactions] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState<null | number>(null);
  const { accountAddress, setAccountAddress } = useGlobalState();

  const onStaging = () => setStaging(!staging);
  const onEther = () => {
    denom === 'ether' ? setDenom('') : setDenom('ether');
    setTransactions(toSuccessfulData(emptyData));
  };
  const onDollars = useCallback(() => {
    denom === 'dollars' ? setDenom('') : setDenom('dollars');
    setTransactions(toSuccessfulData(emptyData));
  }, []);

  useEffect(() => {
    (async () => {
      if (accountAddress?.slice(0, 2) === '0x') {
        setLoading(true);
        const eitherResponse = await runCommand('list', {
          count: true,
          appearances: true,
          addrs: accountAddress,
        });
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
        );
        //@ts-ignore
        setTotalRecords(result.data[0]?.nRecords);
        setLoading(false);
      }
    })();
  }, [accountAddress, denom, staging]);

  useEffect(() => {
    (async () => {
      if (totalRecords && (transactions?.data.length || 0) < totalRecords) {
        const eitherResponse = await runCommand('export', {
          addrs: accountAddress,
          fmt: 'json',
          cache_txs: true,
          cache_traces: true,
          staging: staging,
          // unripe: true,
          ether: denom === 'ether',
          dollars: denom === 'dollars',
          articulate: true,
          accounting: true,
          reversed: false,
          first_record: transactions?.data?.length || 0,
          max_records:
            (transactions?.data?.length || 0) < 100
              ? 10
              : 31 /* an arbitrary number not too big, not too small, that appears not to repeat */,
        });
        const result: Result = pipe(
          eitherResponse,
          Either.fold(toFailedResult, (serverResponse) => toSuccessfulData(serverResponse) as Result)
        );
        let newTransactions: Result = transactions?.data ? { ...transactions } : toSuccessfulData(emptyData);
        //@ts-ignore
        newTransactions.data =
          newTransactions.data.length === 1 ? [...result.data] : [...newTransactions.data, ...result.data];
        setTransactions(newTransactions);
      }
    })();
  }, [totalRecords, transactions, denom, staging]);

  if (transactions?.status === 'fail') {
    createErrorNotification({
      description: 'Could not fetch transactions',
    });
  }

  const tinyTabs: ViewTab[] = [
    {
      name: 'Assets',
      location: 'assets',
      component: <div>Assets</div>,
    },
    { name: 'Neighbors', location: 'neighbors', component: <div>Neighbors</div> },
    { name: 'Charts', location: 'charts', component: <div>Charts</div> },
    { name: 'Functions', location: 'functions', component: <div>Functions</div> },
    { name: 'Events', location: 'events', component: <div>Events</div> },
  ];

  const addressInput = (
    <Input
      disabled={loading}
      placeholder={'Input an address'}
      value={accountAddress}
      onChange={(e) => {
        setTransactions(toSuccessfulData(emptyData));
        setAccountAddress(e.target.value);
      }}
    />
  );

  const progressBar = (): JSX.Element => {
    if (!transactions || !transactions.data) return <></>;
    if (!totalRecords) return <></>;
    if (transactions.data.length === totalRecords) return <></>;
    const pct = ((transactions.data.length / (totalRecords || 1)) * 100) / 2;
    return <progress style={{ position: 'absolute', right: '8px' }} max={50} value={pct} />;
  };

  const getData = useCallback((response) => (response?.status === 'fail' ? [] : response?.data), []);
  const theData = getData(transactions); // .filter((record: Transaction) => record.blockNumber !== undefined);
  const getMeta = useCallback((response) => (response?.status === 'fail' ? [] : response?.meta), []);
  const expandRender = (record: any) => <AccountTransactions record={record} />;
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
      <Divider />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 20fr' }}>
        <div>
          <TinyTabs tabs={tinyTabs} />
          <Divider />
          <b>
            Summary for
            <br />
            <div style={{ width: '40px' }}> </div>
            {accountAddress?.slice(0, 6) +
              '...' +
              accountAddress?.slice(accountAddress.length - 5, accountAddress.length - 1)}
          </b>
          <br />
          nTransactions: {theData?.length}
          <br />
          firstBlock: {theData && theData.length > 0 && theData[0].blockNumber}
          <br />
          lastBlock: {theData && theData.length > 0 && theData[theData.length - 1].blockNumber}
          <br />
          balance: {'XXX'}
        </div>
        <BaseTable
          data={theData}
          columns={transactionSchema}
          loading={loading}
          extraData={accountAddress}
          expandRender={expandRender}
          siderRender={null}
        />
      </div>
    </div>
  );
};

const siderRender = (
  record: Transaction,
  pageSize: number,
  currentPage: number,
  focusedRow: number,
  dataRow: number
) => {
  return (
    <div>
      dataRow: {dataRow}
      <br />
      focusedRow: {focusedRow}
      <br />
      currentPage: {currentPage}
      <br />
      pageSize: {pageSize}
      <br />
      <br />
      <b>{record?.blockNumber + '.' + record?.transactionIndex}</b>
      <br />
      <br />
      <b>{record?.compressedTx?.substr(0, 40)}</b>
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

const TinyTabs = ({ tabs }: { tabs: ViewTab[] }) => {
  return (
    <Tabs tabPosition='left'>
      {tabs.map((tab: any) => {
        return <TabPane key={tab.location} tab={tab.name} />;
      })}
    </Tabs>
  );
};

export const renderAsNamedAddress = (address: string, acctFor: string) => {
  const { names } = useGlobalState();

  const name = names && names[address] && names[address].name;
  let style = { color: name && name !== '' ? 'blue' : 'grey', fontWeight: 500 };
  if (address === acctFor) {
    style = { color: 'green', fontWeight: 800 };
  }
  if (name && name !== '') {
    return (
      <div style={style}>
        {'[' + address.substr(0, 6) + '...' + address.substr(address.length - 4, address.length) + '] '}
        <i>{name}</i>
      </div>
    );
  }
  return <div style={style}>{address}</div>;
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
            <div>{record.date}</div>
            <div>{moment.unix(record.timestamp).fromNow()}</div>
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
      width: '35%',
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
      width: '45%',
      render: (item, record) => {
        item = record.compressedTx;
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
        {'0.0000000'}
        {is_gas ? 'g' : ''}
      </div>
    );
  if (parts.length === 1)
    return (
      parts[0] +
      (
        <div>
          {'.0000000'}
          {is_gas ? 'g' : ''}
        </div>
      )
    );
  return (
    <div>
      {parts[0] + '.' + parts[1].substr(0, 7)}
      {is_gas ? 'g' : ''}
    </div>
  );
};

const useStyles = createUseStyles({
  table: {},
  row: {},
  col: {
    textAlign: 'right',
    backgroundColor: 'white',
  },
});
