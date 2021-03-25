import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './app.css';

import { Button, Layout, notification } from 'antd';
import { createErrorNotification } from './modules/error_notification';
import { MainMenu } from './components/MainMenu';

const {
  Header,
  Footer,
  Sider,
  Content,
} = Layout;

const showError = () => notification.error(
  createErrorNotification({ description: 'Just testing' }),
);

export const App = () => {
  const [statusHidden, setStatusHidden] = useState(false);

  return (
    <Layout>
      <Header>TrueBlocks Account Explorer</Header>
      <Layout>
        <Sider theme="light">
          <MainMenu />
        </Sider>
        <Layout>
          <Layout>
            <Content>
              Hello World
              <Button type="primary" onClick={showError}>Error</Button>
            </Content>
            <Sider theme="light">
              <Button onClick={() => setStatusHidden(true)}>X</Button>
              Status
            </Sider>
            <Sider theme="light">Help</Sider>
          </Layout>
          <Footer>
            Footer
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
