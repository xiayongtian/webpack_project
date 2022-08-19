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
        history.push("/serverList")
      }}><span className={styles.home}>点击123459342430</span></Button>
  </div >
  )
}


