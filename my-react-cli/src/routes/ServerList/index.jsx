import React from "react";
import styles from "./index.less";
import { Button } from 'antd';

export default function Home({
  match: {
    params: {
      id,
    },
  },
  history,
}) {
  return <h1 className={styles.homeServer}>
    服务列表123
    <Button
      type="primary"
      onClick={() => {
        history.push("/ability")
      }}>跳转about</Button>
  </h1>;
}


