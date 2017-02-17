import React, { Component } from 'react';
import CellControl from './cellControl';

export default class gridControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: []
    };

    this.onChange = this.onChange.bind(this);
  };

  componentDidMount() {
    this.cell00.focus();
  }

  onChange(e) {
    // Move to next cell on right, or down a row and to the left-most cell.
    var x = e.x;
    var y = e.y;

    // Update board state.
    var state = this.state;
    state['board'][y] = state['board'][y] || [];
    state['board'][y][x] = e.value;
    
    this.setState(state, function() {
      // Notify parent event handler.
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });

    // Focus on next control.
    if (x < 3) {
      // Focus right.
      x++;
    }
    else {
      // Move down a row and wrap to left.
      x = 0;

      if (y < 3) {
        y++;
      }
      else {
        // Wrap back to top-left.
        y = 0;
      }
    }

    this['cell' + x + y].focus();
  };

  render() {
    return (
      <div className="grid-control">
        <table>
          <tbody>
            <tr>
              <td>
                <CellControl x="0" y="0" onChange={this.onChange} ref={(input) => { this.cell00 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="1" y="0" onChange={this.onChange} ref={(input) => { this.cell10 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="2" y="0" onChange={this.onChange} ref={(input) => { this.cell20 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="3" y="0" onChange={this.onChange} ref={(input) => { this.cell30 = input }}></CellControl>
              </td>
            </tr>
            <tr>
              <td>
                <CellControl x="0" y="1" onChange={this.onChange} ref={(input) => { this.cell01 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="1" y="1" onChange={this.onChange} ref={(input) => { this.cell11 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="2" y="1" onChange={this.onChange} ref={(input) => { this.cell21 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="3" y="1" onChange={this.onChange} ref={(input) => { this.cell31 = input }}></CellControl>
              </td>
            </tr>
            <tr>
              <td>
                <CellControl x="0" y="2" onChange={this.onChange} ref={(input) => { this.cell02 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="1" y="2" onChange={this.onChange} ref={(input) => { this.cell12 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="2" y="2" onChange={this.onChange} ref={(input) => { this.cell22 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="3" y="2" onChange={this.onChange} ref={(input) => { this.cell32 = input }}></CellControl>
              </td>
            </tr>
            <tr>
              <td>
                <CellControl x="0" y="3" onChange={this.onChange} ref={(input) => { this.cell03 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="1" y="3" onChange={this.onChange} ref={(input) => { this.cell13 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="2" y="3" onChange={this.onChange} ref={(input) => { this.cell23 = input }}></CellControl>
              </td>
              <td>
                <CellControl x="3" y="3" onChange={this.onChange} ref={(input) => { this.cell33 = input }}></CellControl>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }   
}
