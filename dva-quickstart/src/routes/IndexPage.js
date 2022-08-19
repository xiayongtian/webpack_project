import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage({
  match: {
    params: {
      id,
    },
  },
  history,
}) {
  return (
    <div className={styles.normal}>
      <span onClick={() => { history.push('/about/9') }}>90</span>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
