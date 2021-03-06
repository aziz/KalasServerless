import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { translationsObject } from "./components/translations/translations";
import ga from 'ga-react-router';
import  WebFont from 'webfontloader';

import { loadTranslations, setLocale, syncTranslationWithStore} from 'react-redux-i18n';

import store from './store';
import routes from './routes';

const history = syncHistoryWithStore(hashHistory, store);

// Listen for changes to the current location. The
// listener is called once immediately.
const unlisten = history.listen(location => {
  const state = store.getState();
  if(state.users.currentUser){
      ga('set', 'userId', state.users.currentUser.mobileNumber);
  }
  ga('send', 'pageview', location.pathname);
});

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale((localStorage.getItem("locale")?localStorage.getItem("locale"):"sv")));

WebFont.load({
    google: {
      families: ['Droid Serif','Acme']
    }
  });


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('root')
);
