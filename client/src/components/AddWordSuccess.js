import React from 'react';
import MainContainer from './common/MainContainer';

const AddWordSuccess = () => {
  return (
    <MainContainer classNames='ai-c ta-c fixed-width tall-padding'>
      <div className='fs-r fw-b mb-l'>Success!</div>
      <p className='fs-r mb-m'>The nomanches team will review your submission within 24 hours. You will recieve an email with our decision.</p>
      <p className='fs-r'>Thank you for sharing your slang with the world through nomanches!</p>
    </MainContainer>
  );
}

export default AddWordSuccess;
