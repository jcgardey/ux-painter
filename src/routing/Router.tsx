import React, {
  createContext,
  useState,
  useContext,
  ComponentProps,
} from 'react';
import routes, { Route, RouteName, RouteProps } from './routes';

interface RouterType {
  show: <T extends RouteName>(routeName: T, props?: RouteProps<T>) => void;
  currentRoute?: RouteName;
}

const RouterContext = createContext<RouterType>({
  show: () => {
    /* default empty function */
  },
});

type RouteWithProps<T extends RouteName = RouteName> = Route<T> & {
  props?: ComponentProps<Route<T>['Component']>;
};

export const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteWithProps>(
    routes[0] as RouteWithProps,
  );

  const show = <T extends RouteName>(
    routeName: T,
    props?: RouteProps<T>,
  ): void => {
    const targetRoute = routes.find(
      (route): route is Route<T> => route.name === routeName,
    );

    if (!targetRoute) {
      console.error(`Route not found: ${routeName}`);
      return;
    }

    setCurrentRoute({ ...targetRoute, props } as RouteWithProps);
  };

  const Component = currentRoute.Component;
  const props = (currentRoute.props || {}) as any;

  if (!Component) {
    return (
      <div className="p-4 text-red-500 font-semibold">No component found</div>
    );
  }

  return (
    <RouterContext.Provider value={{ show }}>
      <Component {...props} />
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
