/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, {Fragment, useState, useContext} from 'react';

import GlobalContext from 'store';
import { getApiUrl, useStatusData, useSystemCheck } from 'store';

import { ObjectTable } from 'components';
import { handleClick } from 'components/utils';

import { systemsSchema } from './SettingsSystemsSchema';
import './Settings.css';

//------------------------------------------------------------------------
export const SettingsSystems = () => {
  const status = useStatusData();
  const [curSubsystem, setManager] = useState('');

  const manageHandler = (action) => {
    switch (action.type) {
      case 'config':
        const newSystem = action.payload;
        if (curSubsystem === newSystem) setManager('');
        else setManager(newSystem);
        break;
      default:
        break;
    }
  };

  const working = useSystemCheck('system');
  let msg = working ? 'All subsystems go...' : 'One or more of the TrueBlocks components is not working properly.';
  let msg2 = '';
  if (!working && status.is_testing) {
    msg2 += ' It appears that the API is in test mode. Wait until the test is finished and then reload.';
  } else if (!working) {
    msg2 += '  Current status returns ' + JSON.stringify(status, null, 2);
  }

  const styleAll = { display: 'grid', gridTemplateColumns: '8fr 8fr 1fr', padding: '12px' };
  return (
    <Fragment>
      <div className={working ? 'okay' : 'warning'}><div>{msg}</div><div>{msg2}</div></div>
      <div style={styleAll}>
        <LeftPanel status={status} handler={manageHandler} curSubsystem={curSubsystem} />
        <RightPanel status={status} handler={manageHandler} subsystem={curSubsystem} />
      </div>
    </Fragment>
  );
};

//------------------------------------------------------------------------
const LeftPanel = ({ status, handler, curSubsystem }) => {
  const styleLeft = { display: 'grid', gridAutoFlow: 'row', padding: '2px' };
  const subSystems = ['api', 'node', 'scraper', 'sharing', 'help'];
  // React hooks won't let use use a hook inside of a map, thus this construct
  const results = [];
  results['api'] = useSubsystemData(status, 'api');
  results['node'] = useSubsystemData(status, 'node');
  results['scraper'] = useSubsystemData(status, 'scraper');
  results['sharing'] = useSubsystemData(status, 'sharing');
  results['help'] = useSubsystemData(status, 'help');
  return (
    <div style={styleLeft}>
      {subSystems.map((subsystem, index) => {
        const myData = results[subsystem];
        const filtered = myData;
        return (
          <div key={'ss_' + index} style={{ display: 'grid', gridTemplateColumns: '6fr 1fr' }}>
            <div>
              <h4>{names[subsystem]}</h4>
              <ObjectTable data={filtered} columns={systemsSchema} handler={handler} />
              <br />
            </div>
            <div>
              <h4>
                <br />
              </h4>
              <button
                style={{ height: '2em' }}
                onClick={(e) => handleClick(e, handler, { type: 'config', payload: subsystem })}
              >
                {curSubsystem === subsystem ? 'close' : 'configure ' + subsystem}
              </button>
            </div>
          </div>
        );
      })}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

//------------------------------------------------------------------------
const RightPanel = ({ status, handler, subsystem }) => {
  const myData = useSubsystemData(status, subsystem);
  if (subsystem === '') return null;
  const styleRight = { padding: '2px' };
  return (
    <div style={styleRight}>
      <div>
        <h4>Editing {subsystem} Configuration</h4>
        <div>
          <ObjectTable data={myData} columns={systemsSchema} showHidden={true} handler={handler} />
        </div>
        <br />
      </div>
      <DisplayLog subsystem={subsystem} />
    </div>
  );
};

//------------------------------------------------------------------------
function getLogText() {
  const str =
    "----------------------------------------\n1587604384 ~ <INFO>  : API calling 'chifra status '\n1587604384 ~ <INFO>  : Exiting route 'status' with OK\n----------------------------------------\n";
  return str + str;
}
const DisplayLog = ({ subsystem }) => {
  const text = getLogText();
  return (
    <Fragment>
      <h4>{'Log for ' + subsystem + ' subsystem'}</h4>
      <div style={{ border: '1px solid' }}>
        <div className="system-log">
          <pre>{text}</pre>
        </div>
      </div>
    </Fragment>
  );
};

//------------------------------------------------------------------------
const useSubsystemData = (status, subsystem) => {
  const isOptional = subsystem === 'scraper' || subsystem === 'sharing' || subsystem === 'help';
  const working = useSystemCheck(subsystem);
  let cn = working ? 'okay' : 'warning';
  if (isOptional && !working) cn = 'caution';
  const statusStr = (
    <span className={cn} style={{ height: '100%', padding: '2px' }}>
      {working ? 'Running...' : isOptional ? 'Paused...' : status.is_testing ? 'In Test Mode...' : 'Not Running...'}
    </span>
  );

  const version =
    subsystem === 'api'
      ? status.trueblocks_version.substr(0, 40) + '...'
      : subsystem === 'node'
      ? status.client_version.substr(0, 40) + '...'
      : '';

  return {
    status: statusStr,
    which: subsystem,
    name: names[subsystem],
    descr: descriptions[subsystem],
    apiProvider: subsystem === 'api' ? getApiUrl('') : '',
    host: subsystem === 'api' ? status.host : '',
    rpcProvider: subsystem === 'node' ? status.rpc_provider : '',
    traceProvider: subsystem === 'node' ? status.rpc_provider : '',
    balanceProvider: subsystem === 'node' ? status.balance_provider : '',
    cachePath: subsystem === 'scraper' ? status.cache_path : '',
    indexPath: subsystem === 'scraper' ? status.index_path : '',
    version: version,
  };
};

//------------------------------------------------------------------------
export function getFieldValue(record, fieldName) {
  if (!record) return '';
  switch (fieldName) {
    case 'id':
      return record.which;
    default:
      break;
  }
  return record[fieldName];
}

//------------------------------------------------------------------------
const names = {
  api: 'TrueBlocks API',
  node: 'Ethereum Node',
  scraper: 'Blaze Scraper',
  sharing: 'IPFS Node',
  help: 'Help API',
};

//------------------------------------------------------------------------
const descriptions = {
  api:
    'This API, which runs locally to your machine, provides data extracted from both the Ethereum node and the TrueBlocks back end.',
  node:
    'This subsystem monitors the state of your connected Ethereum node configuration of which is handled outside of TrueBlocks.',
  scraper:
    'The TrueBlocks scraper reads the blockchain extracting just enough data to enable this application. Unlike old-fashioned web 2.0 data extraction, only a minimal amount of data is extracted so that TrueBlocks continues to work on commercial-grade hardware.',
  sharing:
    'TrueBlocks allows you to seemlessly share certain information with other users on a fully p2p basis. You do not need to share anything, but you are able to share anything you want.',
  help:
    'The TrueBlocks help system runs alongside this application providing both detailed and context sensitive help.',
};
