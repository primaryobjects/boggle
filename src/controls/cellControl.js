import React, { Component } from 'react';

export default class cellControl extends Component {
  constructor(props) {
    super(props);

    // Initialize state.
    this.state = {
      value: this.props.value || '',
      x: this.props.x,
      y: this.props.y
    };

    this.onKeyPress = this.onKeyPress.bind(this);
  };

  onKeyPress(e) {
    this.setState({ value: e.key.toUpperCase() }, function() {
      // Notify parent event handler.
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  focus() {
    this.cell.focus();
  }

  render() {
    return (
      <div className="cell-control">
        <input type="text" id={ 'cell-' + this.props.x + '-' + this.props.y } maxLength="1" value={ this.state.value } onKeyPress={this.onKeyPress} ref={(input) => { this.cell = input; }} />
      </div>
    );
  }   
}
