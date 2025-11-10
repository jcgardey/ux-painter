import React, { createContext, useState, useContext } from 'react';
import routes, { Route } from './routes';
import { RouteName } from './types';

const RouterContext = createContext({});

type RouteWithProps = Route & { props?: Record<string, unknown> };

export const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteWithProps>(routes[0]);

  const show = (routeName: RouteName, props?: Record<string, unknown>) => {
    const targetRoute = routes.find(
      (route) => route.name === routeName,
    ) as RouteWithProps;
    setCurrentRoute({ ...targetRoute, props });
  };

  const Component = currentRoute.Component;

  return (
    <RouterContext.Provider value={{ show }}>
      <Component {...currentRoute.props} />
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
