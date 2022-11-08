import React from "react";
import { TRoutes, TRoute } from "@/routeConfig/routing";
import type { RouteObject } from "react-router-dom";
import { useRoutes } from 'react-router-dom';

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

  return (
    <div className="protected_main_wrapper">
      <div className="form_area">
        <div className="protected_form_wrapper">
          { useRoutes(browserRoutes) }
        </div>
      </div>
    </div>
  );
}

export default ProtectedLayout;