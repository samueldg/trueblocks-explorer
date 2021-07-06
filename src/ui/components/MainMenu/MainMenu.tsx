import { BookOutlined, CameraOutlined, PhoneOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ExplorerLocation, NamesLocation, RootLocation, SettingsLocation, SupportLocation } from '../../Routes';

export const MainMenu = () => (
  <Menu mode='inline'>
    <Menu.Item key={RootLocation} icon={<UnorderedListOutlined />}>
      <NavLink to={RootLocation}>Dashboard</NavLink>
    </Menu.Item>

    <Menu.Item key={NamesLocation} icon={<BookOutlined />}>
      <NavLink to={NamesLocation}>Names</NavLink>
    </Menu.Item>

    <Menu.Item key={ExplorerLocation} icon={<CameraOutlined />}>
      <NavLink to={ExplorerLocation}>Explorer</NavLink>
    </Menu.Item>

    <Menu.Item key={SettingsLocation} icon={<SettingOutlined />}>
      <NavLink to={SettingsLocation}>Settings</NavLink>
    </Menu.Item>

    <Menu.Item key={SupportLocation} icon={<PhoneOutlined />}>
      <NavLink to={SupportLocation}>Support</NavLink>
    </Menu.Item>
  </Menu>
);
