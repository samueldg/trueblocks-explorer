import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Card } from './Card';
import HelpCircle from 'assets/icons/HelpCircle';

import './Card.css';

export default { title: 'Card' };

const helpIcon = <HelpCircle fill="forestgreen" color="#333" onClick={null} />;
export const displayCard = () => (
  <BrowserRouter>
    <Card
      title={'Title'}
      headerLink={'/'}
      headerClass="card-header"
      topIcon={helpIcon}
      iconTray={''}
      children={"This is the times that try men's souls"}
    />
  </BrowserRouter>
);
