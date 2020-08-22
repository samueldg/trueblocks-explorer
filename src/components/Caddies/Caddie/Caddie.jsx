/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment } from 'react';

import { Card, ObjectTable } from 'components';
import { calcValue } from 'components/utils';
import { getIcon } from 'pages/utils';

import './Caddie.css';

//----------------------------------------------------
export const Caddie = ({ cn = 'caddie', title, cards, columns, withIcons }) => {
  const idCol = columns.filter((c) => {
    return c.selector === 'id';
  })[0];
  const nameCol = columns.filter((c) => {
    return c.selector === 'name';
  })[0];
  const routeCol = columns.filter((c) => {
    return c.selector === 'route';
  })[0];

  return (
    <div className={cn}>
      <h4>{title}</h4>
      {cards.map((card, index) => {
        const id = calcValue(card, idCol);
        const title = (
          <div className="inner-card-header">
            {withIcons ? getIcon(index, card.name, true, true, 20) : null}
            {calcValue(card, nameCol)}
          </div>
        );
        const route = calcValue(card, routeCol);
        return title === 'Separator' ? (
          <Fragment></Fragment>
        ) : (
          <Card key={id} title={title} headerLink={route} headerClass="card-center">
            <ObjectTable data={card} columns={columns} />
          </Card>
        );
      })}
    </div>
  );
};
