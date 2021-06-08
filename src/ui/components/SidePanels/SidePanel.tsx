import { Layout } from 'antd';
import React from 'react';
import { Panel, PanelDirection, PanelProps } from './Panel';

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
  const { children, collapsibleContent, dir, header, name } = props;
  const [expanded, setExpanded] = useState(Cookies.get(name) === 'true');

  const onToggle = (expanded: boolean) => {
    Cookies.set(name, expanded ? 'true' : 'false');
    setExpanded(expanded ? true : false);
  };

  return (
    <Sider style={{ overflowY: 'scroll' }} theme='light' collapsed={!expanded}>
      <Panel header={header} dir={dir} expanded={expanded} onToggle={onToggle} collapsibleContent={collapsibleContent}>
        {children}
      </Panel>
    </Sider>
  );
};
