import * as React from "react";
import { useLocation } from 'react-router-dom';
import type { TRoutes } from '@/routeConfig/routing';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;


const Home = ({ routes }: { routes: TRoutes }) => {
  const { pathname } = useLocation();
  return (
    <Layout>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>This</Breadcrumb.Item>
          <Breadcrumb.Item>is</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: "100px",
            minHeight: 280,
          }}
        >
          Home Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;

