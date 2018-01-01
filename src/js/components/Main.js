import React, { Component } from 'react';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const test = <span>{'Hello!'}</span>;

    return (
      <div className={'av-main-wrapper'}>
        {test}
      </div>
    );
  }
}
