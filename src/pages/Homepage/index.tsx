import * as React from "react";
import {
  Outlet,
  Link,
  useRoutes,
  useLocation,
  useResolvedPath,
  useMatch,
  resolvePath,
} from 'react-router-dom';
import type { TRoutes, TRoute } from '@/routeConfig/routing';


const Home = ({ routes }: { routes: TRoutes }) => {
  const { pathname } = useLocation();
  return (
    <div>
      <h2>Home</h2>
      <p>Route: {pathname}</p>
    </div>
  );
};

export default Home;

