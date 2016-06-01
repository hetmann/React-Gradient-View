
import React from 'react';
import browser from 'detect-browser';

const colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]
);
let step = 0;
let colorIndices = [0, 1, 2, 3];

class Gradient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rgbColors: {
        first: '',
        second: ''
      },
      gradientSpeed: 0.002 // transition speed
    };
  }

  generateColor() {
    const gradientSpeed = this.state.gradientSpeed;
    const c0_0 = colors[colorIndices[0]];
    const c0_1 = colors[colorIndices[1]];
    const c1_0 = colors[colorIndices[2]];
    const c1_1 = colors[colorIndices[3]];
    const istep = 1 - step;

    const rgb = {
      'first': {
        'r': Math.round(istep * c0_0[0] + step * c0_1[0]),
        'g': Math.round(istep * c0_0[1] + step * c0_1[1]),
        'b': Math.round(istep * c0_0[2] + step * c0_1[2])
      },
      'second': {
        'r': Math.round(istep * c1_0[0] + step * c1_1[0]),
        'g': Math.round(istep * c1_0[1] + step * c1_1[1]),
        'b': Math.round(istep * c1_0[2] + step * c1_1[2])
      }
    };

    const rgbColors = {
      'first': `rgb(${rgb.first.r},${rgb.first.g},${rgb.first.b})`,
      'second': `rgb(${rgb.second.r},${rgb.second.g},${rgb.second.b})`
    };

    this.setState({
      rgbColors: rgbColors
    });

    step += gradientSpeed;
    if ( step >= 1 ) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    }
  }

  componentDidMount() {
    setInterval(this.generateColor.bind(this), this.props.speed);
  }

  getGradient() {
    const {rgbColors} = this.state;
    const bgGradient = {background: ''};

    switch(browser.name) {
      case 'firefox':
          bgGradient.background = `-moz-linear-gradient(left, ${rgbColors.first} 0%, ${rgbColors.second} 100%)`;
          break;
      default:
          bgGradient.background = `-webkit-gradient(linear, 0% 0%, 100% 0%, from(${rgbColors.first}), to(${rgbColors.second}))`;
    }

    return bgGradient;
  }

  render() {
    const {style, speed, ...props} = this.props;

    return (
      <section style={Object.assign(this.getGradient(), style)} {...props}>
        {this.props.children}
      </section>
    )
  }
}

Gradient.defaultProps = {
  speed: 10, // 10 miliseconds
};

export default Gradient;
