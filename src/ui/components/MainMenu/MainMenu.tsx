import React from 'react';
import {
  Menu,
  Divider
} from 'antd';

const { SubMenu } = Menu;

export const MainMenu = () => (
  <Menu
    mode="inline"
  >
    <Menu.Item>
      Entities
    </Menu.Item>
    <Menu.Item>
      Monitors
    </Menu.Item>
    <Menu.Item>
      Names
    </Menu.Item>
    <Menu.Item>
      Digests
    </Menu.Item>
    <SubMenu
      key="explorer"
      title="Explorer"
    >
      <Menu.Item>
        Blocks
      </Menu.Item>
      <Menu.Item>
        Transactions
      </Menu.Item>
      <Menu.Item>
        Receipts
      </Menu.Item>
      <Menu.Item>
        Logs
      </Menu.Item>
      <Menu.Item>
        Traces
      </Menu.Item>
    </SubMenu>
    <SubMenu
      title="Settings"
    >
      <Menu.Item>
        System Status
      </Menu.Item>
      <Divider />
      <Menu.Item>
        Tags
      </Menu.Item>
      <Menu.Item>
        Signatures
      </Menu.Item>
      <Divider />
      <Menu.Item>
        Caches
      </Menu.Item>
      <Menu.Item>
        Other
      </Menu.Item>
      <Divider />
      <Menu.Item>
        Skins
      </Menu.Item>
      <Menu.Item>
        Schemas
      </Menu.Item>
    </SubMenu>
    <SubMenu
      title="Support"
    >
      <Menu.Item>
        Contact Us
      </Menu.Item>
      <Divider />
      <Menu.Item>
        Hot Keys
      </Menu.Item>
      <Menu.Item>
        Icons
      </Menu.Item>
      <Menu.Item>
        Documentation
      </Menu.Item>
      <Divider />
      <Menu.Item>
        Licensing
      </Menu.Item>
      <Menu.Item>
        About Us
      </Menu.Item>
    </SubMenu>
  </Menu>
);
