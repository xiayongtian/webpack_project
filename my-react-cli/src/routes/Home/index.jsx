import React from "react";
import styles from "./style.less";
import { Button } from 'antd';

export default function Home({
  match: {
    params: {
      id,
    },
  },
  history,
}) {
  return (<div><h1 className={styles.home}> home </h1 >
    <Button
      type="primary"
      onClick={() => {
        history.push("/about/9")
      }}><span className={styles.home}>点击123</span></Button>
  </div >
  )
}


