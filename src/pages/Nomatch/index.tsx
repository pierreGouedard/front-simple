import * as React from "react";
import type { TRoutes, TRoute } from '@/routeConfig/routing';
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";
import './Nomatch.css'



const Nomatch = ({ routes }: { routes: TRoutes }) => {
  const navigate = useNavigate();

  const goToHome = () => {
      navigate("/");
  }

  return (
    <div className="NotFound">
    <Result
      status="404"
      title=<h2 style={{ color: "#E9D758" }}>404</h2>
      subTitle=<p style={{ color: "#E9D758" }}>Sorry, the page you visited does not exist.</p>
      extra={<Button style={{color: "#626364", background: "#E9D758", border: "#E9D758" }} onClick={goToHome} >Back Home</Button>}
  />
  </div>
  );
};

export default Nomatch;

