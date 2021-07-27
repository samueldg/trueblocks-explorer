import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

export declare type MenuItem = {
  to: string;
  icon: JSX.Element;
  text: string;
};
export declare type MenuItems = MenuItem[];

export const MainMenu = ({ items }: { items: MenuItems }) => {
  return (
    <Menu mode='inline'>
      {items.map((item: any) => {
        return (
          <Menu.Item key={item.to} icon={item.icon}>
            <NavLink to={item.to}>{item.text}</NavLink>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
