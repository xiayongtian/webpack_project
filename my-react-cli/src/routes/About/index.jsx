/* eslint-disable */
import React, { Component, Fragment } from 'react';
import styles from "./index.module.less";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('about:', this.props)
    return (
      <div onClick={() => { this.props.history.push("/serverList") }}>关于
        <div className={styles.aboutColor}>hahah</div>
      </div>
    )
  }
}
export default About;
