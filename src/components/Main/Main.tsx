/*global chrome*/
import Frame from 'react-frame-component';
import WindowControl from '../WindowControl';

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
      <WindowControl />
      <div id={'main-content'} className="w-full p-4 border-box"></div>
    </Frame>
  );
};

export default Main;
