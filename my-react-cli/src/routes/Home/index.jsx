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
    <Button
      type="primary"
      onClick={() => {
        history.push("/about/10")
      }}>点击</Button>
  </h1>;
}


