import * as React from "react";
import type { TRoutes, TRoute } from '@/routeConfig/routing';

const Nomatch = ({ routes }: { routes: TRoutes }) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Nothing here !!
        </p>
      </header>
    </div>
  );
};

export default Nomatch;

