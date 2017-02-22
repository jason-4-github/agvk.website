import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import AdminContainer from './containers/admin/AdminContainer';
import WMSStatusContainer from './containers/admin/sidemenu/WMSStatusContainer';
import HandlingItemContainer from './containers/admin/sidemenu/HandlingItemContainer';
import InboundContainer from './containers/admin/sidemenu/InboundContainer';
import OutboundContainer from './containers/admin/sidemenu/OutboundContainer';
import ByLocationContainer from './containers/admin/sidemenu/ByLocationContainer';
import ByItemContainer from './containers/admin/sidemenu/ByItemContainer';
import ByDateContainer from './containers/admin/sidemenu/ByDateContainer';
import AllItemsContainer from './containers/admin/sidemenu/AllItemsContainer';
import configureStore from './store/configureStore';

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


// TODO(S.C.) => need to add "onEnter" function for checking auth in Route "/admin"
const RouterDom = () => {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/admin" component={AdminContainer}>
        <IndexRoute component={WMSStatusContainer} />
        <Route path="/admin/dashboard/wms-status" component={WMSStatusContainer} />
        <Route path="/admin/summary/handling-item" component={HandlingItemContainer} />
        <Route path="/admin/summary/inbound" component={InboundContainer} />
        <Route path="/admin/summary/outbound" component={OutboundContainer} />
        <Route path="/admin/inventory/by-location" component={ByLocationContainer} />
        <Route path="/admin/inventory/by-item" component={ByItemContainer} />
        <Route path="/admin/inventory/by-date" component={ByDateContainer} />
        <Route path="/admin/inventory/all-items" component={AllItemsContainer} />
      </Route>
    </Router>
  );
};

render(
  <MuiThemeProvider>
    <Provider store={store}>
      {RouterDom()}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'));


export const localStorage = {
  isAuth: false,
};

export function checkAuth(nextState, replace) {
  if (!localStorage.isAuth) {
    replace({
      pathname: '/',
    });
  }
}
