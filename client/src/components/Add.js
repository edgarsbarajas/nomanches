import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { addWord } from '../actions/WordActions';

class Add extends Component {
  state = {
    word: '',
    definition: '',
    example: ''
  };

  onInputChange = event => {
    console.log('input changed');
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const { addWord } = this.props;
    const { word, definition, example } = this.state;

    event.preventDefault();

    addWord({word, definition, example});
  }

  render() {
    const { word, definition, example } = this.state;
    const { errors } = this.props;

    return (
      <PostForm
        onSubmit={this.onSubmit}
        header='add a word'
        error={errors.add_word}
      >
        <Input
          type='text'
          name='word'
          label='word'
          value={word}
          error={errors.word}
          onChange={this.onInputChange}
        />
        <Input
          type='text'
          name='definition'
          label='definition'
          value={definition}
          error={errors.definition}
          onChange={this.onInputChange}
        />
        <Input
          type='text'
          name='example'
          label='example'
          value={example}
          error={errors.example}
          onChange={this.onInputChange}
        />
      </PostForm>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.words.addWordErrors
});

export default connect(mapStateToProps, { addWord })(Add);
