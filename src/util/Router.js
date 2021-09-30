import React, { createContext, useState, useContext } from 'react';
import { VersionList } from '../components/VersionList';

const RouterContext = createContext({});

export const Router = ({ children }) => {
  console.log(children);
  const [Component, setComponent] = useState(VersionList);

  let props = {};

  const show = (aComponent, componentProps) => {
    props = componentProps;
    setComponent(aComponent);
  };

  return (
    <RouterContext.Provider value={{ show }}>
      <Component {...props} />
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
