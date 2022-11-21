import React from "react";
import { TRoutes, TRoute } from "@/routeConfig/routing";
import type { RouteObject } from "react-router-dom";
import { useRoutes, NavLink } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
const { Item } = Menu;
import './protectedLayout.css'


const ProtectedLayout = ({ routes }: { routes: TRoutes }) => {  
  // Create Protected Router routes
  const browserRoutes: RouteObject[] = routes.map(
    (route: TRoute): RouteObject => {
      return {
        path: route.path,
        element: route.component({ routes: route.children }),
      };
    }
  );
  // Main navigation bar
  const items1: MenuProps['items'] = ['home', 'resume', 'projects'].map(key => ({
    key,
    label: `${key.charAt(0).toUpperCase() + key.slice(1)}`,
  }));
  // Todo the one that is active should be infered from location.
  return (
    <div className="protected_main_wrapper">
      <Layout>
        <Header className="protected-header" style={{ background: "#626364"}}>
          <div className="logo" />
          <Menu className="protected-menu" mode="horizontal" defaultSelectedKeys={['home']} >
            <Item key='home' className='protected-nav-item' >
              <NavLink to='/'>
                <span style={{ color: "#E9D758" }}>Home</span>
              </NavLink>
            </Item>
            <Item key='resume' className='protected-nav-item'>
              <NavLink to='/resume'>
                <span style={{ color: "#E9D758" }}>Resume</span>
              </NavLink>
            </Item>
            <Item key='projects' className='protected-nav-item'>
              <NavLink to='/projects'>
                <span style={{ color: "#E9D758" }}>Projects</span>
              </NavLink>
            </Item>
          </Menu>
        </Header>
        {useRoutes(browserRoutes)}
      </Layout>
    </div>
  );
}

export default ProtectedLayout;