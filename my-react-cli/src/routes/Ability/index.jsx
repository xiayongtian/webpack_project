import React, { Component, Fragment } from 'react';
class Ability extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('about:', this.props)
    return (
      <div>能力hahas</div>
    )
  }
}
export default Ability;
