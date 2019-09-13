import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Login from '../../Login';
import NavMenu from '../../nav/NavMenu';
import { setGlobalModalComponent } from '../../../actions/GlobalModalActions';
import './GlobalModal.css';

class GlobalModal extends Component {
  componentDidUpdate() {
    console.log('change deteched');
  }
  renderModalComponent() {
    switch(this.props.GlobalModalComponent) {
      case 'Login':
        return <Login />;
      case 'NavMenu':
        return <NavMenu />;
      default:
        return null;
    }
  }

  render() {
    const { GlobalModalComponent } = this.props;

    if(!this.props.GlobalModalComponent) return null;

    return (
      <Fragment>
        <div className='global-modal'>
          { this.renderModalComponent() }
        </div>
        <div
          className='global-modal-bg'
          onClick={(e) => this.props.setGlobalModalComponent(null)}
        >
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  GlobalModalComponent: state.globalModalComponent
});

export default connect(mapStateToProps, { setGlobalModalComponent })(GlobalModal);
