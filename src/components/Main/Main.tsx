/*global chrome*/
import React from 'react';
import Frame from 'react-frame-component';

const Main = () => {
  return (
    
    <Frame
      className={'w-full h-full'}
      head={
        <>
          <link
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL('assets/main.css')}
          ></link>
        </>
      }
    >
      <div id={'main-content'} className="w-full p-4 border-box">
        <p className="text-3xl font-medium">Test</p>
      </div>
    </Frame>
  );
};

export default Main;
