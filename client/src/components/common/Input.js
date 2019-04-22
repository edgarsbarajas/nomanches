import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { type, name, value, onChange } = this.props;

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={(event) => onChange(event)}
      />
    )
  }
}

export default Input;
