
import React from 'react';

class Gradient extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      background: ''
    };
  }

  generateColor() {
		const gradientSpeed = 0.002; //transition speed
		const colors = {
		  0: [62,35,255], 1: [60,255,60], 2: [255,35,98], 3: [45,175,230], 4: [255,0,255], 4: [255,128,0]
		}

		let step = 0;
		let colorIndices = [0,1,2,3]; // color indexes

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
			'first': `"rgb(${rgb.first.r},${rgb.first.g},${rgb.first.b})"`,
			'second': `"rgb(${rgb.second.r},${rgb.second.g},${rgb.second.b})"`
		}

		this.setState({
			background: `-webkit-gradient(linear, left top, right top, from(${rgbColors.first}), to(${rgbColors.second})); -moz-linear-gradient(left, ${rgbColors.first} 0%, ${rgbColors.second} 100%)`
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

	render() {
		const {...props} = this.props;

		return (
			<section {...props} style={this.state.background}>
				{this.props.children}
			</section>
		)
	}
}

Gradient.defaultProps = {
	//
};

export default Gradient;