import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Panel} from './Panel';

import '../../Card/Card.css';
import './Panel.css';

export default {title: 'Panel'};

export const displayPanel = () => (
  <BrowserRouter>
    <Panel
      title={'This is the title'}
      iconTray={null}
      headerClass={'card-header'}
      headerLink={'http://google.com'}
      topIcon={null}
      type={null}
      dir='left'
      expanded={true}
      children={"This is the time that tries men's souls"}
    />
  </BrowserRouter>
);
