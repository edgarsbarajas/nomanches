import React, { Component } from 'react';
import classNames from 'classnames';

class Input extends Component {
  onLabelClick = () => {
    this.input.focus();
  }

  renderError() {
    const { error } = this.props;

    if(error) {
      return (
        <div className='input-error'>{error}</div>
      );
    }

    return null;
  }

  render() {
    const { type, name, value, label, error, onChange} = this.props;

    return (
      <div>
        <div className='input-container'>
          <label
            onClick={this.onLabelClick}
            className={classNames({
              'expanded': !value
            })}
          >
            {label}
          </label>
            <input
              className='post-input'
              type={type}
              name={name}
              value={value}
              onChange={event => onChange(event)}
              ref={input => (this.input = input)}
            />
        </div>
        { this.renderError() }
      </div>
    )
  }
}

export default Input;
