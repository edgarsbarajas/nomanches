import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { logoutUser } from '../../actions/AuthActions';
import { setGlobalModalComponent } from '../../actions/GlobalModalActions';
import './NavMenu.css';

const NavMenu = (props) => {
  return (
    <div className='post-form-container white-container'>
      <div className='menu'>
        <Link to='/add' onClick={() => props.setGlobalModalComponent(null)}>add a word</Link>
          {
            isEmpty(props.user) ? (
              <div>
                <Link to='/register' onClick={() => props.setGlobalModalComponent(null)}>register</Link>
                <Link to='/login' onClick={() => props.setGlobalModalComponent(null)}>login</Link>
              </div>
            ) : (
              <Link to='/' onClick={() => props.setGlobalModalComponent(null)}>logout</Link>
            )
          }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser, setGlobalModalComponent })(NavMenu);
