/*global chrome*/
import React from 'react';
import Frame from 'react-frame-component';
import { VersionList } from './VersionList';
//import Router from 'route-lite';
import { Router } from '../util/Router';
import WindowControl from './WindowControl';
import mainStyle from './Main.module.css';

const Main = () => {
  return (
    <Frame
      className={mainStyle.frame}
      head={
        <>
          <link
            type="text/css"
            rel="stylesheet"
            href={
              'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
            }
          ></link>
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
        <Router>
          <VersionList />
        </Router>
      </div>
    </Frame>
  );
};

export default Main;
