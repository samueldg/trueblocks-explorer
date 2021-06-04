import {
  BookOutlined,
  CameraOutlined,

  PhoneOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {
  Menu,
} from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

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
        Dashboard
      </NavLink>
    </Menu.Item>

    <Menu.Item
      icon={<BookOutlined />}
    >
      <NavLink
        to="/names"
      >
        Names
      </NavLink>
    </Menu.Item>

    <Menu.Item
      icon={<CameraOutlined />}
    >
      <NavLink
        to="/explorer"
      >
        Explorer
      </NavLink>
    </Menu.Item>

    <Menu.Item
      icon={<SettingOutlined />}
    >
      <NavLink
        to="/system"
      >
        Settings
      </NavLink>
    </Menu.Item>

    <Menu.Item
      icon={<PhoneOutlined />}
    >
      <NavLink
        to="/support"
      >
        Support
      </NavLink>
    </Menu.Item>
  </Menu>
);
