import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MainContainer from './common/MainContainer';
import PostForm from './common/PostForm';
import Input from './common/Input';
import { setGlobalModalComponent } from '../actions/GlobalModalActions';

class Add extends Component {
  state = {
    word: 'owowowowwowowo',
    definition: 'owowowowowowoowowow',
    example: 'owowowoowwowowowo',
    errors: {}
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();
    const { addWord, setGlobalModalComponent } = this.props;
    const { word, definition, example } = this.state;

    axios
      .post('/words', {
        value: word,
        definition,
        example
      })
      .then(response => {
        // display global modal with success/instructions
        console.log(response.data);
        setGlobalModalComponent('AddWordSuccess');
      })
      .catch(error => { 
        console.log(error.response.data);
        return this.setState({errors: error.response.data.errors})
      })
  }

  render() {
    const { word, definition, example, errors } = this.state;

    return (
      <MainContainer classNames='form-container fixed-width ai-c tall'>
        <PostForm
          onSubmit={this.onSubmit}
          header='add a word'
          error={errors.addWord}
        >
          <Input
            type='text'
            name='word'
            label='word'
            value={word}
            error={errors.value}
            onChange={this.onInputChange}
          />
          <Input
            type='textarea'
            name='definition'
            label='definition'
            placeholder='this is a placeholder for an example of a word'
            value={definition}
            error={errors.definition}
            onChange={this.onInputChange}
          />
          <Input
            type='textarea'
            name='example'
            label='example'
            placeholder='this is a placeholder for an example of a word'
            value={example}
            error={errors.example}
            onChange={this.onInputChange}
          />
        </PostForm>
      </MainContainer>
    )
  }
}

export default connect(null, { setGlobalModalComponent })(Add);
