/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React from 'react';
import { Link } from 'react-router-dom';

import { useToggles } from 'store';
import { Settings, Discord, GitHub, Medium, Twitter, GitCoin } from 'assets/icons/SetSocial';
import { ClickableIcon, ProgressBar } from 'components';
import './PageFooter.css';

//----------------------------------------------------------------------
export const PageFooter = () => {
  return (
    <div className={'page-footer ' + (useToggles().state.menu ? 'shape_11' : 'shape_01')}>
      <LeftFooter />
      <CenterFooter />
      <RightFooter />
    </div>
  );
};

//----------------------------------------------------------------------
const LeftFooter = () => {
  return (
    <div className="left-footer">
      <Link to="/settings">
        <Settings className="nofill_icon_color" />
      </Link>
    </div>
  );
};

//----------------------------------------------------------------------
const CenterFooter = () => {
  return (
    <div className="center-footer">
      <div>
        <div>TrueBlocks, LLC • 1010 N Hancock St, Philadelpia, PA 19123</div>
        <div>
          <FooterLink link="http://www.quickblocks.io" /> •{' '}
          <FooterLink link="mailto:info@quickblocks.io?subject=Inquiry" text="info@quickblocks.io" />
        </div>
      </div>
      <div></div>
      <div>Console: <ProgressBar asText={true} /></div>
      <div></div>
    </div>
  );
};

//----------------------------------------------------------------------
const RightFooter = () => {
  return (
    <div className="right-footer">
      <ClickableIcon
        link="http://gitcoin.co/grants/184/trueblocks"
        icon={<GitCoin className="footer-social icon_color" height="24px" />}
      />
      <ClickableIcon
        link="http://twitter.com/@trueblocks"
        icon={<Twitter className="footer-social icon_color" height="24px" />}
      />
      <ClickableIcon
        link="http://github.com/TrueBlocks/trueblocks-core"
        icon={<GitHub className="footer-social icon_color" height="24px" />}
      />
      <ClickableIcon
        link="http://medium.com/@tjayrush"
        icon={<Medium className="footer-social icon_color" height="24px" />}
      />
      <ClickableIcon
        link="https://discordapp.com/channels/570963863428661248/570963863428661250"
        icon={<Discord className="footer-social icon_color" height="24px" />}
      />
    </div>
  );
};

//----------------------------------------------------------------------
const FooterLink = ({ link, text }) => {
  return (
    <a className="footer-links" href={link} target="_blank" rel="noopener noreferrer">
      {text !== undefined ? text : link}
    </a>
  );
};
