import * as React from "react";
import RootRouter from '@/modules/routing/rootRouter';
import Loader from '@/components/loader'
import { useRefreshVerify } from '@/modules/query/authentication'
import './App.css'

const App = () => {

  const { isLoading } = useRefreshVerify({
    locationPathname: null,
  });

  if (isLoading) {
    return (
      <div className="App">
        <Loader />
      </div>
    );
  }

  return (
    <div className="App">
      <RootRouter />
    </div>
  );
};

declare global {
  interface Window {
    [key: string]: any;
  }
}

export default App;

