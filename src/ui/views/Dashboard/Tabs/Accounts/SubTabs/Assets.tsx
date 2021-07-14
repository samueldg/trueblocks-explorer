import { ReconciliationArray, TransactionArray } from '@modules/types';
import React from 'react';

export const Assets = ({
  theData,
  loading,
  accountAddress,
}: {
  theData: TransactionArray;
  loading: boolean;
  accountAddress: string;
}) => {
  if (!theData) return <></>;
  var count = function (ary: any[], classifier: any) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
      var p = classifier(item);
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
      return counter;
    }, {});
  };

  let statements: ReconciliationArray = [];
  theData.map((tx) => {
    tx.statements.map((st) => {
      if (Number(st.amountNet) !== 0) statements.push(st);
    });
  });
  var counts = count(statements, function (item: any) {
    return item.assetSymbol;
  });

  // counts = count(counts, function (item: any) {
  //   return item.asset;
  // });

  return <pre>{JSON.stringify(counts, null, 2)}</pre>;
  // return <BaseTable dataSource={values} columns={[{ title: 'Val', dataIndex: 'val' }]} loading={false} />;
};
