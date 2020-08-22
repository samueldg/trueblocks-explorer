/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment, useEffect } from 'react';
import useSWR from 'swr';

import { Panel } from 'components/';
import { fmtNum, dataFetcher } from 'components/utils';
import { getApiUrl, useToggles, useStatus, useStatusMeta, useStatusData, statusDefault, useSystemCheck } from 'store';
import { getIcon } from 'pages/utils';
import './StatusPanel.css';

//----------------------------------------------------------------------
export const StatusPanel = () => {
  const dispatch = useStatus().dispatch;
  const url = getApiUrl('status');
  const { data, error } = useSWR(url, dataFetcher);

  useEffect(() => {
    if (error) {
      dispatch({ type: 'fail', error: error, payload: statusDefault });
    } else {
      if (!data) {
        dispatch({ type: 'loading', payload: true });
      } else {
        dispatch({ type: 'success', payload: data });
      }
    }
  }, [error, data, dispatch]);

  const expanded = useToggles().state.status;
  return (
    <Panel title="Status" type="status" expanded={expanded}>
      {expanded && (
        <Fragment>
          <StatusReport />
          <StatusError error={error} errMsg={'Error: Is the API running?'} />
        </Fragment>
      )}
    </Panel>
  );
};

//----------------------------------------------------------------------
const StatusError = ({ error, errMsg }) => {
  return error ? <div className="warning">{errMsg}</div> : <></>; //
};

//----------------------------------------------------------------------
const StatusReport = () => {
  const status = useStatusData();
  const meta = useStatusMeta();
  const client = meta.client;
  const finalized = meta.finalized;
  const staging = meta.staging;
  const unripe = meta.unripe;

  const data = useStatusData();
  const apiOkay = useSystemCheck('api');
  const nodeOkay = useSystemCheck('node');
  const scraperOkay = useSystemCheck('scraper');
  const isTesting = data.is_testing;

  var status1 = (
    <div className={`${nodeOkay ? 'connected' : 'disconnected'}`}>{nodeOkay ? 'Connected' : 'Not connected'}</div>
  );
  var status2 = (
    <div className={`${apiOkay ? 'connected' : 'disconnected'}`}>
      {apiOkay ? 'Running' : isTesting ? 'In Test Mode...' : 'Not Running...'}
    </div>
  );
  var status3 = (
    <div className={`${scraperOkay ? 'connected' : 'disconnected'}`}>{scraperOkay ? 'Scraping' : 'Not scraping'}</div>
  );

  return (
    <div>
      <div className="status-details">
        <Section title="Ethereum Node">
          <SectionItem name="Status" value={status1} />
          <SectionItem name="Latest" value={fmtNum(meta.client)} />
        </Section>

        <Section title="TrueBlocks">
          <SectionItem name="API" value={status2} />
          <SectionItem name="Scraper" value={status3} />
          <SectionItem
            name="Final"
            value={fmtNum(meta.finalized)}
            icon={getIcon(1001, 'GreenLight', false, false, 20)}
            details={<DetailItem value={behindText(finalized, client)} />}
          />
          <SectionItem
            name="Staging"
            value={fmtNum(meta.staging)}
            icon={getIcon(1002, 'YellowLight', false, false, 20)}
            details={<DetailItem value={behindText(staging, client)} />}
          />
          <SectionItem
            name="Unripe"
            value={fmtNum(meta.unripe)}
            icon={getIcon(1003, 'RedLight', false, false, 20)}
            details={<DetailItem value={behindText(staging, unripe, true)} />}
          />
          <SectionItem name="Monitors" value={fmtNum(meta.unripe)} />
          <SectionItem name="Slurps" value={fmtNum(meta.unripe)} />
        </Section>

        <Section title="Options">
          <SectionItem name="rpc" value={status.rpc_provider} wide />
          <SectionItem name="bals" value={status.balance_provider} wide />
          <SectionItem name="api" value={getApiUrl('')} wide />
          <SectionItem name="cache" value={status.cache_path} wide />
          <SectionItem name="index" value={status.index_path} wide />
        </Section>

        <Section title="Software Versions">
          <div className="doublewide">- {status.client_version}</div>
          <div className="doublewide">- {status.trueblocks_version}</div>
        </Section>
      </div>
    </div>
  );
};

//----------------------------------------------------------------------
const SectionItem = ({ name, value, wide, icon, details }) => {
  if (!wide) {
    return (
      <>
        <div className="left">
          {name}:<br />
          {icon}
        </div>
        <div className="right">
          {value}
          {details}
        </div>
      </> //
    );
  }

  return (
    <div className="doublewide">
      <div className="bold">{name}:</div> {value}
    </div>
  );
};

//----------------------------------------------------------------------
const Section = ({ title, children }) => {
  return (
    <>
      <h4>{title}</h4>
      {children}
      <div className="separator" />
    </> //
  );
};

//----------------------------------------------------------------------
const DetailItem = ({ value }) => {
  return (
    <Fragment>
      <br />
      <small>
        <i>{value}</i>
      </small>
    </Fragment> //
  );
};

//----------------------------------------------------------------------
function behindText(value, client, unripe = false) {
  if (client === 0) return '';
  let ret = '(';
  if (unripe) {
    if (client - client > 0) {
      ret += (client - client).toString();
      ret += ' behind';
    } else {
      ret += 'caught up';
    }
  } else {
    ret += (client - value).toString();
    let mins = (Math.floor(((client - value) * 100) / (60 / 14)) / 100).toString();
    let x = mins + ' mins';
    if (mins > 120) {
      x = fmtNum(mins / 60, 1, ' ') + ' hrs';
    }
    if (mins > 60 * 24) {
      x = fmtNum(mins / (60 * 24), 1, ' ') + ' days';
    }
    ret += ' behind, ' + x;
  }
  ret += ')';
  return ret;
}
