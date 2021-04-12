import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
} from 'antd';
import {
  BookOutlined,
  CameraOutlined,
  DesktopOutlined,
  FundOutlined,
  PhoneOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export const MainMenu = () => (
  <Menu
    mode="inline"
  >
    <Menu.Item
      icon={<UnorderedListOutlined />}
    >
      <NavLink
        to="/"
      >
        Entities
      </NavLink>
    </Menu.Item>
    <Menu.Item
      icon={<DesktopOutlined />}
    >
      Monitors
    </Menu.Item>
    <Menu.Item
      icon={<BookOutlined />}
    >
      Names
    </Menu.Item>
    <Menu.Item
      icon={<FundOutlined />}
    >
      Digests
    </Menu.Item>
    <SubMenu
      key="explorer"
      title="Explorer"
      icon={<CameraOutlined />}
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
      key="settings"
      title="Settings"
      icon={<SettingOutlined />}
    >
      <Menu.Item>
        System Status
      </Menu.Item>
      <Menu.Item>
        Tags
      </Menu.Item>
      <Menu.Item>
        Signatures
      </Menu.Item>
      <Menu.Item>
        Caches
      </Menu.Item>
      <Menu.Item>
        Other
      </Menu.Item>
      <Menu.Item>
        Skins
      </Menu.Item>
      <Menu.Item>
        Schemas
      </Menu.Item>
    </SubMenu>
    <SubMenu
      key="support"
      title="Support"
      icon={<PhoneOutlined />}
    >
      <Menu.Item>
        Contact Us
      </Menu.Item>
      <Menu.Item>
        Hot Keys
      </Menu.Item>
      <Menu.Item>
        Icons
      </Menu.Item>
      <Menu.Item>
        Documentation
      </Menu.Item>
      <Menu.Item>
        Licensing
      </Menu.Item>
      <Menu.Item>
        About Us
      </Menu.Item>
    </SubMenu>
  </Menu>
);
