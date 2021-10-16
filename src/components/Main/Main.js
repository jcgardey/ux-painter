/*global chrome*/
import React from 'react';
import Frame from 'react-frame-component';
import { Router } from '../../routing/Router';
import WindowControl from '../WindowControl';
import mainStyle from './Main.css';

const Main = () => {
  return (
    <Frame
      className={mainStyle.frame}
      head={
        <>
          <link
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL('/static/main.css')}
          ></link>
          <link
            type="text/css"
            rel="stylesheet"
            href={
              'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'
            }
          ></link>
        </>
      }
    >
      <WindowControl />
      <div id={'main-content'} className={mainStyle.container}>
        <Router />
      </div>
    </Frame>
  );
};

export default Main;
