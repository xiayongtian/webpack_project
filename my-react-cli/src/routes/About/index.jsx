/* eslint-disable */
import React, { Component, Fragment } from 'react';
// @withRouter
class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('about:', this.props)
    return (
      <div onClick={() => { this.props.history.push("/serverList") }}>关于</div>
    )
  }
}
export default About;
