import { Layout } from 'antd';
import React from 'react';

import { Panel, PanelProps, PanelDirection } from './Panel';

const { Sider } = Layout;

export { PanelDirection };

export const SidePanel = (props: PanelProps) => {
  const {
    children,
    collapsibleContent,
    dir,
    expanded,
    header,
    onToggle,
  } = props;
  const collapsed = !expanded;

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
    >
      <Panel
        header={header}
        dir={dir}
        expanded={expanded}
        onToggle={onToggle}
        collapsibleContent={collapsibleContent}
      >
        {children}
      </Panel>
    </Sider>
  );
};
