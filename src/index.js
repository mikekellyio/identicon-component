import React, { Component } from "react";
import PropTypes from "prop-types";

export default class IdenticonComponent extends Component {
  static propTypes = {
    hash: PropTypes.string,
    background: PropTypes.string,
    foreground: PropTypes.string,
    size: PropTypes.number
  };

  // adapted from: https://gist.github.com/aemkei/1325937
  hsl2rgb = (h, s, b) => {
    h *= 6;
    s = [
      (b += s *= b < 0.5 ? b : 1 - b),
      b - (h % 1) * s * 2,
      (b -= s *= 2),
      b,
      b + (h % 1) * s,
      b + s
    ];

    return [
      s[~~h % 6] * 255, // red
      s[(h | 16) % 6] * 255, // green
      s[(h | 8) % 6] * 255 // blue
    ];
  };

  opts = () => {
    let opts = Object.assign(
      {
        hash: "c12d27a352146a2b18e34ea550eac371",
        background: [240, 240, 240, 255],
        marginFactor: 0.08,
        size: 64,
        saturation: 0.7,
        brightness: 0.5
      },
      this.props
    );
    // foreground defaults to last 7 chars as hue at 70% saturation, 50% brightness
    let hue = parseInt(opts.hash.substr(-7), 16) / 0xfffffff;
    opts.foreground =
      this.opts.foreground ||
      this.hsl2rgb(hue, opts.saturation, opts.brightness).join();
    return opts;
  };

  rectangle = (x, y, width, height, key) => {
    return <rect x={x} y={y} width={width} height={height} key={key} />;
  };

  rectangles = () => {
    let { hash, size, marginFactor, background, foreground } = this.opts();

    let baseMargin = Math.floor(size * marginFactor),
      cell = Math.floor((size - baseMargin * 2) / 5),
      margin = Math.floor((size - cell * 5) / 2);

    let rectangles = [];
    var i, color;
    for (i = 0; i < 15; i++) {
      color = parseInt(hash.charAt(i), 16) % 2 ? background : foreground;
      if (color === background) continue;
      if (i < 5) {
        rectangles.push(
          this.rectangle(2 * cell + margin, i * cell + margin, cell, cell, i)
        );
      } else if (i < 10) {
        rectangles.push(
          this.rectangle(
            1 * cell + margin,
            (i - 5) * cell + margin,
            cell,
            cell,
            i
          )
        );
        rectangles.push(
          this.rectangle(
            3 * cell + margin,
            (i - 5) * cell + margin,
            cell,
            cell,
            i + "b"
          )
        );
      } else if (i < 15) {
        rectangles.push(
          this.rectangle(
            0 * cell + margin,
            (i - 10) * cell + margin,
            cell,
            cell,
            i
          )
        );
        rectangles.push(
          this.rectangle(
            4 * cell + margin,
            (i - 10) * cell + margin,
            cell,
            cell,
            i + "b"
          )
        );
      }
    }

    return rectangles;
  };

  render() {
    let { size, background, foreground } = this.opts();

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size} ${size}`}
        style={{ backgroundColor: `rgba(${background.join()})` }}
      >
        <g
          style={{
            fill: `rgb(${foreground})`,
            stroke: `rgb(${foreground})`,
            strokeWidth: size * 0.005
          }}
        >
          {this.rectangles()}
        </g>
      </svg>
    );
  }
}
