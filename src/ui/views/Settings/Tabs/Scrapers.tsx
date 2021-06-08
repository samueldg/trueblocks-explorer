import { ScraperResult, toFailedScrapeResult, toSuccessfulScraperData } from '@hooks/useCommand';
import { runCommand } from '@modules/core';
import { Switch } from 'antd';
import { either } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import React, { useEffect, useState } from 'react';

const formatResponse = (response: either.Either<Error, Record<string, any>>) => {
  const result: ScraperResult = pipe(
    response,
    either.fold(toFailedScrapeResult, (serverResponse) => toSuccessfulScraperData(serverResponse) as ScraperResult)
  );
  return result;
};

export const Scrapers = () => {
  const [indexerOn, setIndexerOn] = useState(true);
  const [monitorsOn, setMonitorsOn] = useState(true);

  const toggleIndexer = async () => {
    const response = await runCommand('scraper', {
      toggle: 'indexer',
      mode: !indexerOn,
    });
    const result = formatResponse(response);
    setIndexerOn(result.indexer);
  };

  const toggleMonitors = async () => {
    const response = await runCommand('scraper', {
      toggle: 'monitors',
      mode: !monitorsOn,
    });
    const result = formatResponse(response);
    setMonitorsOn(result.monitor);
  };

  const toggleBoth = async () => {
    const bothOn = !(indexerOn && monitorsOn);
    const response = await runCommand('scraper', {
      toggle: 'both',
      mode: bothOn,
    });
    const result = formatResponse(response);
    setIndexerOn(result.indexer);
    setMonitorsOn(result.monitor);
  };

  useEffect(() => {
    (async () => {
      const response = await runCommand('scraper', { status: 'both' });
      const result = formatResponse(response);
      setIndexerOn(result.indexer);
      setMonitorsOn(result.monitor);
    })();
  }, []);

  return (
    <>
      index scraper: <Switch checked={indexerOn} checkedChildren='on' unCheckedChildren='off' onClick={toggleIndexer} />
      <br />
      monitor scraper:{' '}
      <Switch checked={monitorsOn} checkedChildren='on' unCheckedChildren='off' onClick={toggleMonitors} />
      <br />
      both scrapers:{' '}
      <Switch checked={indexerOn && monitorsOn} checkedChildren='on' unCheckedChildren='off' onClick={toggleBoth} />
    </>
  );
};
