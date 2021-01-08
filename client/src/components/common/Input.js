import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

class Input extends Component {
  onLabelClick = () => {
    this.input.focus();
  }

  renderError() {
    const { error } = this.props;

    if(!error) return null;
    return <div className='input-error'>{error.message}</div>;
  }

  renderInputType = () => {
    const { type, name, value, onChange, placeholder, showCharacterCount=false, autoFocus=false } = this.props;

    if(type === 'textarea') {
      return (
        <Fragment>
          {showCharacterCount && <span className='char-count'>{value.length}/120</span>}
          <textarea
            className='post-input'
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={event => onChange(event)}
            ref={input => (this.input = input)}
            autoFocus={autoFocus}
          />
        </Fragment>
      )
    } else {
      return (
        <input
          className='post-input'
          type={type}
          name={name}
          value={value}
          onChange={event => onChange(event)}
          ref={input => (this.input = input)}
          autoFocus={autoFocus}
        />
      )
    }
  }

  render() {
    const { type, name, value, label, onChange} = this.props;

    return (
      <div>
        <div className='input-container'>
          <label
            onClick={this.onLabelClick}
            className={classNames({
              'expanded': !value && type !== 'textarea'
            })}
          >
            { label }
          </label>
          { this.renderInputType() }
        </div>
        { this.renderError() }
      </div>
    )
  }
}

export default Input;
