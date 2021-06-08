import { BookOutlined, CameraOutlined, PhoneOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ExplorerLocation, NamesLocation, RootLocation, SettingsLocation, SupportLocation } from '../../locations';

export const MainMenu = () => (
  <Menu mode='inline'>
    <Menu.Item icon={<UnorderedListOutlined />}>
      <NavLink to={RootLocation}>Dashboard</NavLink>
    </Menu.Item>

    <Menu.Item icon={<BookOutlined />}>
      <NavLink to={NamesLocation}>Names</NavLink>
    </Menu.Item>

    <Menu.Item icon={<CameraOutlined />}>
      <NavLink to={ExplorerLocation}>Explorer</NavLink>
    </Menu.Item>

    <Menu.Item icon={<SettingOutlined />}>
      <NavLink to={SettingsLocation}>Settings</NavLink>
    </Menu.Item>

    <Menu.Item icon={<PhoneOutlined />}>
      <NavLink to={SupportLocation}>Support</NavLink>
    </Menu.Item>
  </Menu>
);
