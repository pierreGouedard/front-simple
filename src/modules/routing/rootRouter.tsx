import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import {
  useRoutes,
  useLocation,
  matchPath,
  Navigate,
} from 'react-router-dom';
import PublicLayout from '@/layouts/publicLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import type { TRoutes, TRoute } from '@/routeConfig/routing';
import { publicRoutes, protectedRoutes } from '@/routeConfig/routeConfig';
import store from "@/store";


const RootRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '*',
      element: Switch({ publicRoutes, protectedRoutes }),
    },
  ];
  return useRoutes(routes);
};

function Switch({
  publicRoutes,
  protectedRoutes,
}: {
  publicRoutes: TRoutes;
  protectedRoutes: TRoutes;
}): React.ReactElement {
  const { pathname: currpath } = useLocation();
  /* 
  If public route, return public Layout. Otherwise, if and only if the user is authentificated
  return Protected Layout, else navigate to login page.
  */
  if (
    publicRoutes
      .map((route: TRoute): boolean => {
        return !!matchPath(currpath, route.path);
      })
      .some((x: boolean) => x)
  ) {
    return <PublicLayout routes={publicRoutes} />;
  }

  const isAuthenticated = store.getState().user.isAuthenticated;
  console.log("user is authenticated: " + isAuthenticated);

  if (isAuthenticated) {
    // return protected layout
    return <ProtectedLayout routes={protectedRoutes} />;
  }
  // redicrect to login if not auth
  return <Navigate to={'/login'} />;
}

export default RootRouter;

