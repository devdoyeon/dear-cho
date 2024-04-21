import { useEffect, useState } from 'react';
import main from 'images/mainPhoto.jpg';

const MainPage = () => {

  return (
    <div className='container'>
      <img src={main} alt='메인이미지' />
    </div>
  );
};

export default MainPage;
