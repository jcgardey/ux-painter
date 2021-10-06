import React, { createContext, useState, useContext } from 'react';
import routes from './routes';
import { VERSION_LIST } from './types';

const RouterContext = createContext({});

export const Router = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState(VERSION_LIST);
  const [currentProps, setCurrentProps] = useState({});

  const show = (routeName, routeProps) => {
    setCurrentProps(routeProps);
    setCurrentRoute(routeName);
  };

  const Component = routes.filter((route) => route.name === currentRoute)[0]
    .Component;

  return (
    <RouterContext.Provider value={{ show }}>
      <Component {...currentProps} />
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
