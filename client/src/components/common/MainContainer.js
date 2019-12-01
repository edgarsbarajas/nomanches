import React from 'react';

const MainContainer = ({children, styles={}, classNames=''}) => {
  return (
    <div
      className={'white-container p-l flex fd-c ' + classNames}
      styles={styles}
    >
      {children}
    </div>
  );
}

export default MainContainer;
