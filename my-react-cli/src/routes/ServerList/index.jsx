import React from "react";
import "./index.less";
import { Button } from 'antd';

export default function Home({
  match: {
    params: {
      id,
    },
  },
  history,
}) {
  return <h1 className="home-title">
    服务列表
    <Button
      type="primary"
      onClick={() => {
        history.push("/ability")
      }}>跳转about</Button>
  </h1>;
}


