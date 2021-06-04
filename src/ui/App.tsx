import { useCommand } from '@hooks/useCommand';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import './App.css';
import { MainMenu } from './components/MainMenu';
import { HelpPanel } from './components/SidePanels/HelpPanel';
import { PanelDirection, SidePanel } from './components/SidePanels/SidePanel';
import { StatusPanel } from './components/SidePanels/StatusPanel';
import { Routes } from './Routes';

const { Header, Footer, Content } = Layout;

export const App = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [helpExpanded, setHelpExpanded] = useState(true);
  const [status, loading] = useCommand('status');

  return (
    <Layout>
      <Header className="app-header">TrueBlocks Account Explorer</Header>
      <Layout>
        <SidePanel
          header="Main menu"
          dir={PanelDirection.Left}
          expanded={menuExpanded}
          onToggle={setMenuExpanded}
          collapsibleContent={false}
        >
          <MainMenu />
        </SidePanel>
        <Layout>
          <Layout>
            <Content
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                overflowY: 'auto',
              }}
            >
              {/* View */}

              {/* TODO: move it */}
              <Routes />
            </Content>
            <SidePanel
              header="Status"
              expanded={statusExpanded}
              onToggle={setStatusExpanded}
              dir={PanelDirection.Right}
            >
              <StatusPanel status={status} loading={loading} />
            </SidePanel>
            <SidePanel
              header="Help"
              expanded={helpExpanded}
              onToggle={setHelpExpanded}
              dir={PanelDirection.Right}
            >
              <HelpPanel />
            </SidePanel>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
