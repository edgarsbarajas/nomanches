import React from 'react';
import Loader from 'react-loader-spinner'

const LoadingScreen = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100vw',
      height: '79vh',
      background: '#fafafa',
      zIndex: 1000
    }}>
      <Loader
         type='Oval'
         color='#DB162F'
         height={80}
         width={80}
         timeout={0}
      />
    </div>
  );
}

export default LoadingScreen;
