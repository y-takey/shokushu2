import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import './app.less';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./containers/App').default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
