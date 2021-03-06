import React, { Component } from 'react';
import seedrandom from 'seedrandom';
import { storiesOf } from '@kadira/storybook';
import Hex, { gridPoints } from '../src/index.jsx';

const rng = seedrandom(process.env.NODE_ENV);
const story = storiesOf('-----examples-----', module);

story.add('README\'s example', () => {
  const type = 'pointy-topped';
  const size = 10;
  const oX = 100;
  const oY = 100;
  const width = 25;
  const height = 25;

  const Hexes = gridPoints(type, oX, oY, size, width, height).map(({ props, gridX, gridY }) => (
    <Hex key={`${gridX}-${gridY}`} {...props} fill="white" stroke="black" />
  ));

  return (
    <svg width="1000" height="1000">
      {Hexes}
    </svg>
  );
});

story.add('PointyTopped-Hex grid system', () => {
  const size = 30;
  const Hexes = gridPoints('pointy-topped', 100, 100, size, 10, 10).map(({ props, gridX, gridY }) => (
    <g key={`${gridX}-${gridY}`}>
      <Hex
        {...props}
        fill="white"
        stroke="black"
        onClick={() => alert(`x=${x} y=${y}`)}
      />
      <text x={props.x - size / 2} y={props.y + size / 4}>{`${gridX},${gridY}`}</text>
    </g>
    ));

  return (
    <svg width="900" height="600">
      {Hexes}
    </svg>
  );
});

story.add('FlatTopped-Hex grid system', () => {
  const size = 30;
  const Hexes = gridPoints('flat-topped', 100, 100, size, 10, 10).map(({ props, gridX, gridY }) => (
    <g key={`${gridX}-${gridY}`}>
      <Hex
        {...props}
        fill={`rgb(${Math.floor(rng() * 255)},${Math.floor(rng() * 255)},${Math.floor(rng() * 255)})`}
        stroke="white"
      />
      <text x={props.x - size / 2} y={props.y + size / 4}>{`${gridX},${gridY}`}</text>
    </g>
    ));

  return (
    <svg width="1500" height="400">
      {Hexes}
    </svg>
  );
});

story.add('draw', () => {
  class DrawHex extends Component {
    constructor() {
      super();
      this.state = { fill: rng() < 0.5 };
    }

    render() {
      const { type, x, y, size } = this.props;
      return (
        <Hex
          type={type}
          x={x}
          y={y}
          size={size}
          fill={this.state.fill ? 'black' : 'white'}
          onClick={() => this.setState({ fill: !this.state.fill })}
          onMouseEnter={() => this.setState({ fill: !this.state.fill })}
        />
      );
    }
  }
  const type = 'pointy-topped';
  const size = 10;
  const oX = 100;
  const oY = 100;
  const width = 25;
  const height = 25;

  const Hexes = gridPoints(type, oX, oY, size, width, height).map(({ props, gridX, gridY }) => (
    <DrawHex key={`${gridX}-${gridY}`} {...props} />
  ));

  return (
    <div>
      <p>move mouse on hexes</p>

      <svg width="1000" height="1000">
        {Hexes}
      </svg>
    </div>
  );
});

story.add('animation with transform', () => {
  class CircularHex extends Component {
    constructor() {
      super();
      this.state = {
        deg: 0,
      };

      this.interval = null;
    }

    componentDidMount() {
      this.interval = setInterval(
        () => this.setState({ deg: (this.state.deg + 1) % 360 }),
        50,
      );
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (
        <g>
          {this.renderHex(0, 100, 'black')}
          {this.renderHex(5, 95, 'white')}
          {this.renderHex(10, 90, 'black')}
          {this.renderHex(15, 85, 'white')}
          {this.renderHex(20, 80, 'black')}
          {this.renderHex(25, 75, 'white')}
          {this.renderHex(30, 70, 'black')}
          {this.renderHex(35, 65, 'white')}
          {this.renderHex(40, 60, 'black')}
          {this.renderHex(45, 55, 'white')}
          {this.renderHex(50, 50, 'black')}
          {this.renderHex(55, 45, 'white')}
          {this.renderHex(60, 40, 'black')}
          {this.renderHex(65, 35, 'white')}
          {this.renderHex(70, 30, 'black')}
          {this.renderHex(75, 25, 'white')}
          {this.renderHex(80, 20, 'black')}
          {this.renderHex(85, 15, 'white')}
          {this.renderHex(90, 10, 'black')}
          {this.renderHex(95, 5, 'white')}
        </g>
      );
    }

    renderHex(baseDeg, size, color) {
      return (
        <Hex
          type="pointy-topped"
          x={250}
          y={250}
          size={size}
          fill={color}
          stroke="none"
          transform={`rotate(${baseDeg + this.state.deg}, 250, 250)`}
        />
      );
    }
  }

  return (
    <svg width="500" height="500">
      <CircularHex />
    </svg>
  );
});

story.add('loading icon', () => {
  class Loader extends Component {
    constructor() {
      super();
      this.state = {
        deg: 0,
      };

      this.interval = null;
    }

    componentDidMount() {
      this.interval = setInterval(() => this.setState({
        deg: (this.state.deg + 1) % 360,
      }), 15);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
      this.interval = null;
    }

    render() {
      const size = this.props.size;
      const BlackHex = <Hex type="pointy-topped" x={size / 2} y={size / 2} size={size / 5 * 2} transform={`rotate(${this.state.deg}, ${size / 2}, ${size / 2})`} fill="black" />;
      const WhiteHex = <Hex type="pointy-topped" x={size / 2} y={size / 2} size={size / 5 * 2} transform={`rotate(${this.state.deg / 2}, ${size / 2}, ${size / 2})`} fill="white" />;
      return (
        <div>
          <svg width={`${size}`} height={`${size}`}>
            {BlackHex}
            {WhiteHex}
          </svg>
        </div>
      );
    }
  }

  return (
    <div>
      Size 10: <Loader size={10} />
      Size 50: <Loader size={50} />
      Size 100: <Loader size={100} />
      Size 500: <Loader size={500} />
    </div>
  );
});

story.add('fill display', () => {
  class Filler extends Component {
    constructor() {
      super();
      this.state = {
        coodinates: [],
      };

      this.interval = null;
    }

    componentDidMount() {
      this.interval = setInterval(() => this.setState({
        coodinates: this.state.coodinates.concat([[rng() * this.props.displaySize, rng() * this.props.displaySize]]),
      }), 1);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
      this.interval = null;
    }

    render() {
      const Hexes = this.state.coodinates.map(([x, y]) => (
        <Hex type="pointy-topped" key={`${x}-${y}`} x={x} y={y} size={50} fill="none" stroke="black" strokeOpacity="0.2" />
      ));

      return (
        <svg width={this.props.displaySize} height={this.props.displaySize}>
          {Hexes}
        </svg>
      );
    }
  }

  return (
    <Filler displaySize={500} />
  );
});
