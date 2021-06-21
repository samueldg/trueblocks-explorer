import { Layout } from 'antd';
import Cookies from 'js-cookie';
import React, { ReactNode, useState } from 'react';
import { Panel, PanelDirection } from './Panel';

const { Sider } = Layout;

export { PanelDirection };

export type SidePanelProps = {
  children: ReactNode;
  collapsibleContent?: boolean;
  customCollapseIcon?: ReactNode;
  customExpandIcon?: ReactNode;
  dir: PanelDirection;
  header: ReactNode;
  name: string;
};

export const SidePanel = (props: SidePanelProps) => {
  const { children, collapsibleContent, customCollapseIcon, customExpandIcon, dir, header, name } = props;
  const [expanded, setExpanded] = useState(Cookies.get(name) === 'true');

  const onToggle = (expanded: boolean) => {
    Cookies.set(name, expanded ? 'true' : 'false');
    setExpanded(expanded ? true : false);
  };

  return (
    <Sider style={{ overflowY: 'scroll' }} theme='light' collapsed={!expanded}>
      <Panel
        header={header}
        dir={dir}
        expanded={expanded}
        onToggle={onToggle}
        collapsibleContent={collapsibleContent}
        customCollapseIcon={customCollapseIcon}
        customExpandIcon={customExpandIcon}>
        {children}
      </Panel>
    </Sider>
  );
};
