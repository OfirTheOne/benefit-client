// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { render, RenderResult } from '@testing-library/react';
// import React, { Children, ReactNode } from 'react';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './app';

// import { initialState as communicationInitialState } from './redux/features/communication/communication.slice';
// import { initialState as incidentsInitialState } from './redux/features/incidents/incidents.slice';
// import { initialState as loginInitialState } from './redux/features/login/login.slice';
// import { initialState as mainLayoutInitialState } from './redux/features/main-layout/main-layout.slice';
// import { initialState as locationInitialState } from './redux/features/map/location/location.slice';
// import { initialState as locationPinInitialState } from './redux/features/map/location-pin/location-pin.slice';
// import { initialState as markersInitialState } from './redux/features/markers/markers.slice';
// import { initialState as profileInitialState } from './redux/features/profile/profile.slice';
// import { initialState as respondersInitialState } from './redux/features/responders/responders.slice';
// import { initialState as teamsInitialState } from './redux/features/teams/teams.slice';
// import { initialState as workspaceInitialState } from './redux/features/workspace/workspace.slice';
// import { initialState as navigationInitialState } from './redux/navigation/navigation.slice';
// import { initialState as boundariesInitialState } from './redux/features/boundaries/boundaries.slice';
// import { initialState as authorizationInitialState } from './redux/features/authorization/authorization.slice';

// import { communicationTestKit } from './redux/features/communication/communication.testkit';
// import { incidentsTestKit } from './redux/features/incidents/incidents.testkit';
// import { loginTestKit } from './redux/features/login/login.testkit';
// import { mainLayoutTestKit } from './redux/features/main-layout/main-layout.testkit';
// import { locationTestKit } from './redux/features/map/location/location.testkit';
// import { locationPinTestKit } from './redux/features/map/location-pin/location-pin.testkit';
// import { markersTestKit } from './redux/features/markers/markers.testkit';
// import { profileTestKit } from './redux/features/profile/profile.testkit';
// import { respondersTestKit } from './redux/features/responders/responders.testkit';
// import { teamsTestKit } from './redux/features/teams/teams.testkit';
// import { workspaceTestKit } from './redux/features/workspace/workspace.testkit';
// import { navigationTestKit } from './redux/navigation/navigation.testkit';
// import { boundariesTestKit } from './redux/features/boundaries/boundaries.testkit';

// import { RootState } from './redux/root-state';
// import { configureStore, history } from './redux/store';
// import config from './config';
// import { loaderInitialState } from './redux/features/loader/loader.slice';
// import { mapInitInitialState } from './redux/features/map/map-init/map-init.slice';
// import { authorizationTestKit } from './redux/features/authorization/authorization.testkit';

// const getInitialState: () => RootState = () => {
//   const initialState = {
//     boundariesState: boundariesInitialState,
//     communicationState: communicationInitialState,
//     mainLayoutState: mainLayoutInitialState,
//     workspaceState: workspaceInitialState,
//     loginState: loginInitialState,
//     incidentsState: incidentsInitialState,
//     teamsState: teamsInitialState,
//     respondersState: respondersInitialState,
//     navigationState: navigationInitialState,
//     markersState: markersInitialState,
//     mapState: {
//       location: locationInitialState,
//       locationPin: locationPinInitialState,
//       mapInit: mapInitInitialState,
//     },
//     profileState: profileInitialState,
//     authorizationState: authorizationInitialState,
//     loaderState: loaderInitialState,
//   };
//   return initialState;
// };

// export type Constructor<T = unknown> = new (...args: any[]) => T;
// export type AppTestable = Constructor<AppTestKit>;

// export class AppTestKit {
//   private _wrapper?: RenderResult;
//   store = configureStore();
//   shouldRenderUI = true;
//   location?: string;
//   children: ReactNode | null;

//   state: RootState;

//   get wrapper() {
//     if (!this._wrapper) throw new Error('wrapper is not defiled');
//     return this._wrapper;
//   }

//   set wrapper(value: RenderResult) {
//     this._wrapper = value;
//   }

//   constructor() {
//     this.state = getInitialState();
//   }

//   getWrapper: () => RenderResult = () => {
//     if (!this.wrapper) throw new Error('wrapper is not defined');
//     return this.wrapper;
//   };

//   withoutRenderUI = () => {
//     this.shouldRenderUI = false;
//     return this;
//   };

//   withLocation = (location: string) => {
//     this.location = location;
//     return this;
//   };

//   withChildren = (children: ReactNode) => {
//     this.children = children;
//     return this;
//   };

//   renderUI = () => {
//     if (this.shouldRenderUI) {
//       if (this.location) {
//         history.push(location);
//       }
//       this.wrapper = render(
//         <React.StrictMode>
//           <Provider store={this.store}>
//             <Router basename={config.routerBasePrefix}>{this.children || <App />}</Router>
//           </Provider>
//         </React.StrictMode>,
//       );
//     }
//   };

//   build = () => {
//     this.store.dispatch({ type: 'RESET', payload: this.state });
//     this.renderUI();
//     return this;
//   };
// }

// export const testKitFactory = () => {
//   const TestKit = communicationTestKit(
//     authorizationTestKit(
//       communicationTestKit(
//         incidentsTestKit(
//           loginTestKit(
//             mainLayoutTestKit(
//               locationTestKit(
//                 locationPinTestKit(markersTestKit(profileTestKit(respondersTestKit(teamsTestKit(workspaceTestKit(navigationTestKit(boundariesTestKit(AppTestKit)))))))),
//               ),
//             ),
//           ),
//         ),
//       ),
//     ),
//   );
//   return new TestKit();
// };
