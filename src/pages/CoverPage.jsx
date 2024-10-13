import { useState, useEffect } from 'react';
import $ from 'jquery';
import { sample } from 'js/api';
import coverBg from 'images/coverBg.jpeg';
import ListWrap from 'components/ListWrap';

const CoverPage = ({ scrollY }) => {
  const [coverArr, setCoverArr] = useState([]);
  let prevent = false;

  useEffect(() => {
    if (scrollY > $('.cover-title').offset().top - (window.innerHeight - 200))
      $('.cover-title').addClass('animate');
    if (scrollY > $('.cover-wrap').offset().top - (window.innerHeight - 200))
      $('.cover-wrap').addClass('animate');
  }, [scrollY]);

  const test = async () => {
    if (prevent) return;
    prevent = true;
    setTimeout(() => {
      prevent = false;
    }, 200);
    const result = await sample();
    if (typeof result === 'object') {
      setCoverArr(result?.data?.items);
    }
  };

  const renderCoverList = () => {
    return coverArr.map(({ id, snippet }) => {
      return (
        <>
          <div className='item'>
            <a
              href={`https://youtube.com/watch?v=${id?.videoId}`}
              target='_blank'>
              <img
                src={snippet?.thumbnails?.high?.url}
                alt='thumbnail'
                className='cover-thumbnail'
              />
              <p>{snippet?.title}</p>
            </a>
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <div className='container coverPage'>
        <h2 className='title cover-title even' onClick={test}>
          COVER
        </h2>
        <img src={coverBg} alt='커버 배경이미지' className='pageImg' />
        <ListWrap renderListFn={renderCoverList} className='cover-wrap' />
      </div>
    </>
  );
};

export default CoverPage;
