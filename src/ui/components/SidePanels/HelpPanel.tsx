import { Loading } from '@components/Loading';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { helpRoutes } from './HelpPanelHelp';

export const HelpPanel = () => {
  const location = useLocation();
  const matchedRoute = helpRoutes.find((item) => item.route === location.pathname);
  const url = matchedRoute && new URL('docs/explorer' + matchedRoute.route, 'https://docs.trueblocks.io/');

  return (
    <Loading loading={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
          alignItems: 'center',
          letterSpacing: '0.1em',
        }}>
        {matchedRoute && (
          <div>
            <div>{matchedRoute.helpText}</div>
            <a href={url?.toString()} target='_blank' rel='noreferrer'>
              Learn more...
            </a>
          </div>
        )}
      </div>
      {/* <span>{JSON.stringify(help, null, 2)}</span> */}
    </Loading>
  );
};
