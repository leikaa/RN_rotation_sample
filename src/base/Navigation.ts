import { NavigationContainerRef } from '@react-navigation/core';
import { StackActions } from '@react-navigation/native';
import * as React from 'react';
import { Stacks } from '../navigation/consts/stacks';

export interface NavigationParams {
  [key: string]: any;
}

class NavigationC {
  navigationRef = React.createRef<NavigationContainerRef<any>>();

  initialRoute: string = Stacks.HOME_STACK;

  setInitialRoute = (route: string) => {
    this.initialRoute = route;
  };

  getCurrentRouteName = () => {
    return this.navigationRef.current?.getCurrentRoute()?.name;
  };

  push = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () =>
        this.navigationRef.current?.dispatch(
          StackActions.push(routeName, params),
        ),
      0,
    );
  };

  navigate = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () => this.navigationRef.current?.navigate(routeName, params),
      0,
    );
  };

  replace = (routeName: string, params?: NavigationParams) => {
    setTimeout(
      () =>
        this.navigationRef.current?.reset({
          index: 0,
          routes: [{ name: routeName, params: params }],
        }),
      0,
    );
  };

  pop = () => {
    this.navigationRef.current?.goBack();
  };

  pop2 = () => {
    this.pop();
    this.pop();
  };
}

const Navigation = new NavigationC();
export default Navigation;
