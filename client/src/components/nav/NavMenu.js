import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { logoutUser } from '../../actions/AuthActions';
import { setGlobalModalComponent } from '../../actions/GlobalModalActions';
import MainContainer from '../common/MainContainer';
import './NavMenu.css';

const NavMenu = (props) => {
  const {user} = props;

  return (
    <MainContainer classNames='fixed-width tall ai-c jc-c ta-c fw-b'>
      <div className=''>
        <Link to='/add' onClick={() => props.setGlobalModalComponent(null)}>add a word</Link>
          {
            isEmpty(props.user) ? (
              <div>
                <Link to='/register' onClick={() => props.setGlobalModalComponent(null)}>register</Link>
                <Link to='/login' onClick={() => props.setGlobalModalComponent(null)}>login</Link>
              </div>
            ) : (
              <div>
                <Link to={`/${user.username}`} onClick={() => props.setGlobalModalComponent(null)}>my words</Link>
                <Link
                  to='/'
                  onClick={() => {
                    props.logoutUser()
                    props.setGlobalModalComponent(null)
                  }}
                >
                  logout
                </Link>
              </div>
            )
          }
      </div>
    </MainContainer>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logoutUser, setGlobalModalComponent })(NavMenu);
