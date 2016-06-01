
import React from 'react';
import {render} from 'react-dom';
import Gradient from '../src/gradient.jsx';

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Gradient speed={10} style={{textAlign: 'center', padding: '10px', color: '#FFFFFF'}}>
        <h1>Demo - Gradient</h1>
        <p>Gradient is a simple motion gradient</p>
      </Gradient>
    )
  }
}

render(<Demo/>, document.querySelector('.app'));
