import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Main from '_components/Main';

class AlgoVizApp extends Component {
  constructor(props) {
    super(props);
    this.store = {};
  }

  render() {
    return (
      <div className={'algoviz-app'}>
        <Main/>
      </div>
    );
  }
}

ReactDOM.render(<AlgoVizApp/>, document.getElementById('root'));
