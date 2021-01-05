import React from 'react';

class CommentSection extends React.Component {
  state = {
    headline: 'comment section'
  };

  render() {
    return(
      <div className="mt-l">
        {this.state.headline}
      </div>
    );
  }
  
}

export default CommentSection;
