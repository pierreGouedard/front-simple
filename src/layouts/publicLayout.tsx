import React from "react";
import { TRoutes, TRoute } from "@/routeConfig/routing";
import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';
import './publicLayout.css'

const PublicLayout = ({ routes }: { routes: TRoutes }) => {
  // Create Public Router routes
  const browserRoutes: RouteObject[] = routes.map(
    (route: TRoute): RouteObject => {
      return {
        path: route.path,
        element: route.component({ routes: route.children }),
      };
    }
  );
  return (
    <div className="split_screen_login">
      <div className="login_logo" style={{color: "#E9D758"}}><p>LOGO</p></div>
      <div className="login_form">{useRoutes(browserRoutes)}</div>     
    </div>
  );
}

export default PublicLayout;