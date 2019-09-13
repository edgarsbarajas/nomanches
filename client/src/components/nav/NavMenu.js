import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { logoutUser } from '../../actions/AuthActions';
import './NavMenu.css';

const NavMenu = (props) => {
  return (
    <div className='post-form-container white-container'>
      <div className='menu'>
        <Link to='/add'>add a word</Link>
          {
            isEmpty(props.user) ? (
              <div>
                <Link to='/register'>register</Link>
                <Link to='/login'>login</Link>
              </div>
            ) : (
              <Link to='/'>logout</Link>
            )
          }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser })(NavMenu);
